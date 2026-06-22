'use server';
import { withAuth } from '@/shared/lib/auth';
import { getUploadAuthParams } from '@imagekit/next/server';

export async function getUploadAuth() {
  // здесь можно добавить проверку пользователя (cookies/session)
  const session = await withAuth();

  if (session.status === 'unauthenticated') throw new Error('unauthorized');

  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  });

  return {
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    userId: session.payload.userId,
  };
}
