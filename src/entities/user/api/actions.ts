'use server';
import { withAuth } from '@/shared/lib/auth';
import { setAvatar } from '@/entities/user/api/db';

export async function setUserAvatarUrl(url: string) {
  const session = await withAuth();

  if (!session || session.role === 'GUEST') {
    throw new Error('Unauthorized');
  }
  await setAvatar(session.userId, url);
  return url;
}
