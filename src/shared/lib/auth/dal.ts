import 'server-only';

import { cache } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  verifyAccessToken,
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} from './jwt';
import { ROUTES } from '@/shared/config/navigation';
import { setSessionCookies } from '@/shared/lib/auth/cookies';
import { insertRefreshToken, rotateRefreshToken } from './refresh_token.db';

import { SessionPayload } from './types';

export type SessionResult =
  | { status: 'authenticated'; userId: string }
  | { status: 'refreshable'; userId: string }
  | { status: 'unauthenticated' };

// Для входа и регистрации
export async function issueRefreshToken(payload: SessionPayload) {
  const token = await createRefreshToken(payload);

  const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
  await insertRefreshToken({
    token,
    userId: payload.userId,
    expiresAt,
  });
  return token;
}

export async function issueSession(userId: string) {
  const accessToken = await createAccessToken({ userId });
  const refreshToken = await issueRefreshToken({ userId });

  await setSessionCookies({
    accessToken,
    refreshToken,
  });

  return { accessToken, refreshToken };
}

//Для server components(cached)
export const verifySession = cache(async (): Promise<SessionResult> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (accessToken) {
    const session = await verifyAccessToken(accessToken);
    if (session) {
      return { status: 'authenticated', userId: session.userId };
    }
  }

  if (!refreshToken) {
    return { status: 'unauthenticated' };
  }

  const refreshSession = await verifyRefreshToken(refreshToken);
  if (!refreshSession) {
    return { status: 'unauthenticated' };
  }

  return {
    status: 'refreshable',
    userId: refreshSession.userId,
  };
});

// для обновления serverActions и route handlers(uncached)
export async function refreshSession(oldRefreshToken: string) {
  const session = await verifyRefreshToken(oldRefreshToken);
  if (!session) {
    return null;
  }

  const newRefreshToken = await createRefreshToken(session);

  const user = await rotateRefreshToken({
    oldToken: oldRefreshToken,
    newToken: newRefreshToken,
  });
  if (!user) {
    return null; // invalid / expired / already used
  }
  const accessToken = await createAccessToken({
    userId: user.user_id,
  });
  return {
    userId: user.user_id,
    accessToken,
    refreshToken: newRefreshToken,
  };
}
export async function withAuth(): Promise<{ userId: string }> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  // 1. Access token check (fast path)
  if (accessToken) {
    try {
      const session = await verifyAccessToken(accessToken);

      if (session) {
        return { userId: session.userId };
      }
    } catch {
      redirect(ROUTES.LOGIN);
    }
  }

  // 2. No refresh token → unauthenticated
  if (!refreshToken) {
    redirect(ROUTES.LOGIN);
  }

  // 3. Refresh flow (source of truth)
  let refreshed;

  try {
    refreshed = await refreshSession(refreshToken);
  } catch {
    redirect(ROUTES.LOGIN);
  }

  if (!refreshed) {
    redirect(ROUTES.LOGIN);
  }

  // 4. Set cookies (side effect)

  await setSessionCookies(refreshed);

  return { userId: refreshed.userId };
}
