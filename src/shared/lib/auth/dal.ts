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

import { SessionPayload } from '@/shared/model';

export type SessionResult =
  | { status: 'authenticated'; payload: SessionPayload }
  | { status: 'refreshable'; payload: SessionPayload }
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

export async function issueSession(payload: SessionPayload) {
  const accessToken = await createAccessToken(payload);
  const refreshToken = await issueRefreshToken(payload);
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
      return { status: 'authenticated', payload: session };
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
    payload: refreshSession,
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
    userId: session.userId,
    role: session.role,
  });
  return {
    session: session,
    accessToken,
    refreshToken: newRefreshToken,
  };
}

export async function withAuth(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  // 1. Access token check (fast path)
  if (accessToken) {
    try {
      const session = await verifyAccessToken(accessToken);

      if (session) {
        return session;
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

  return refreshed.session;
}
