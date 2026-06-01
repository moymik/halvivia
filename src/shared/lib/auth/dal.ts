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
  | { status: 'refreshable'; userId: string }
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

export async function issueSession(userId: string, oldToken?: string) {
  if (oldToken !== undefined) {
    await deleteRefreshToken(oldToken);
  }

  const accessToken = await createAccessToken({ userId });
  const refreshToken = await issueRefreshToken({ userId });

  await setSessionCookies({
    accessToken,
    refreshToken,
  });

  return { accessToken, refreshToken };
}

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
