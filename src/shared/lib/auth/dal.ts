import 'server-only';

import { cache } from 'react';

import { cookies } from 'next/headers';

import {
  verifyAccessToken,
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
  refreshSecret,
} from './jwt';

import { setSessionCookies } from '@/shared/lib/auth/cookies';
import { insertRefreshToken, rotateRefreshToken } from './refresh_token.db';

import { SessionPayload } from '@/shared/model';
import { jwtVerify } from 'jose';

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

  if (!refreshToken || !accessToken) {
    return { status: 'unauthenticated' };
  }

  try {
    const session = await verifyAccessToken(accessToken);
    if (session) {
      return { status: 'authenticated', payload: session };
    }

    //тут проверяем refreshToken без бд просто на соответсвие
    const refreshSession = await jwtVerify(refreshToken, refreshSecret, { algorithms: ['HS256'] });
    return {
      status: 'refreshable',
      payload: refreshSession.payload as SessionPayload,
    };
  } catch (e) {
    console.error(e);
    return { status: 'unauthenticated' };
  }
});

// для обновления внутри serverActions и route handlers(uncached)
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

export async function withAuth(): Promise<
  Exclude<SessionResult, { status: 'refreshable'; payload: SessionPayload }>
> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!accessToken || !refreshToken) {
    return { status: 'unauthenticated' };
  }
  // 1. Access token check (fast path)

  try {
    const session = await verifyAccessToken(accessToken);

    if (session) {
      return { status: 'authenticated', payload: session };
    }

    const refreshed = await refreshSession(refreshToken);

    if (!refreshed) {
      return { status: 'unauthenticated' };
    }

    // 4. Set cookies (side effect)

    await setSessionCookies(refreshed);

    return { status: 'authenticated', payload: refreshed.session };
  } catch (e) {
    console.error(e);
    return { status: 'unauthenticated' };
  }
}
