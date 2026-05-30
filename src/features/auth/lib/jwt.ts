import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from '../model/types';

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
    .setExpirationTime('30d')
    .sign(refreshSecret);
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, accessSecret, {
      // { userId: '1', iat: 1780086557, exp: 1780090157 }
      algorithms: ['HS256'],
    });

    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, refreshSecret, {
      algorithms: ['HS256'],
    });

    return payload as SessionPayload;
  } catch {
    return null;
  }
}
