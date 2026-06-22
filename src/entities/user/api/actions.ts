'use server';
import { withAuth } from '@/shared/lib/auth';
import { findUserById, setAvatar } from '@/entities/user/api/db';
import { revalidatePath } from 'next/cache';

export async function setUserAvatarUrl(url: string) {
  const session = await withAuth();
  if (session.status === 'unauthenticated') {
    throw new Error('Unauthorized');
  }

  //пытаемся удалить чтобы не засорять хранилище
  const user = await findUserById(session.payload.userId);

  await setAvatar(session.payload.userId, url);
  await revalidatePath('/'); // Header image updates too
  return url;
}
