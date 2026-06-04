import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from '../../model/auth/types';
import { findRefreshToken } from '@/shared/lib/auth/refresh_token.db';

export const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
export const refreshSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);

export async function createAccessToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30m')
    .sign(accessSecret);
}

export async function createRefreshToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(refreshSecret);
}

export async function verifyAccessToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, accessSecret, {
      algorithms: ['HS256'],
    });

    return payload as SessionPayload;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, refreshSecret, { algorithms: ['HS256'] });
    const dbToken = await findRefreshToken(token);
    if (!dbToken) return null;

    if (new Date(dbToken.expires_at) < new Date()) {
      return null;
    }

    return payload as SessionPayload;
  } catch (e) {
    console.error(e);
    return null;
  }
}
