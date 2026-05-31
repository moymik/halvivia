import 'server-only';

import { cache } from 'react';

import { cookies } from 'next/headers';

import {
  verifyAccessToken,
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} from './jwt';
import { deleteRefreshToken, insertRefreshToken } from './refresh_token.db';
import { SessionPayload } from './types';
import { setSessionCookies } from '@/shared/lib/auth/cookies';

export type SessionResult =
  | { status: 'authenticated'; userId: string }
  | { status: 'refreshed'; userId: string }
  | { status: 'unauthenticated' };

export async function issueRefreshToken(payload: SessionPayload) {
  const token = await createRefreshToken(payload);

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await insertRefreshToken({
    token,
    userId: payload.userId,
    expiresAt,
  });

  return token;
}

async function rotateSession(userId: string, oldToken: string) {
  // 1. удаляем старый refresh

  await deleteRefreshToken(oldToken);

  // 2. создаём новые токены
  const accessToken = await createAccessToken({ userId });
  const refreshToken = await issueRefreshToken({ userId });

  return { accessToken, refreshToken };
}

export const verifySession = cache(async (): Promise<SessionResult> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  // 1. Проверка access
  if (accessToken) {
    const session = await verifyAccessToken(accessToken);
    if (session) {
      return { status: 'authenticated', userId: session.userId };
    }
  }

  // 2. Если access истёк → пробуем refresh
  if (!refreshToken) {
    return { status: 'unauthenticated' };
  }

  const refreshSession = await verifyRefreshToken(refreshToken);

  if (!refreshSession) {
    return { status: 'unauthenticated' };
  }

  // 3. Ротация токенов
  try {
    const newSession = await rotateSession(refreshSession.userId, refreshToken);
    await setSessionCookies({
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken,
    });
  } catch {
    return { status: 'unauthenticated' };
  }

  return {
    status: 'refreshed',
    userId: refreshSession.userId,
  };
});
