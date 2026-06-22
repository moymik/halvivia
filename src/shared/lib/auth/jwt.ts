import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from '../../model/auth/types';
import { findRefreshToken } from '@/shared/lib/auth/refresh_token.db';
import { JWTExpired } from 'jose/errors';

export const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
export const refreshSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);

export async function createAccessToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(accessSecret);
}

export async function createRefreshToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(refreshSecret);
}

// Возвращаем null если токен истек
// SessionPayload если валидный
// ошибку в других случаях
export async function verifyAccessToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, accessSecret, {
      algorithms: ['HS256'],
    });

    return payload as SessionPayload;
  } catch (e) {
    if (e instanceof JWTExpired) {
      console.log('Access token expired, refresh is possible');
      return null;
    }

    throw e;
  }
}

export async function verifyRefreshToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, refreshSecret, {
      algorithms: ['HS256'],
    });

    const dbToken = await findRefreshToken(token);

    if (!dbToken) {
      return null;
    }

    return payload as SessionPayload;
  } catch (e) {
    if (e instanceof JWTExpired) {
      console.log('Refresh token expired');
      return null;
    }

    throw e;
  }
}
