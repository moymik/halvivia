'use server';
import { withAuth } from '@/shared/lib/auth';
import { findUserById, setAvatar } from '@/entities/user/api/db';
import { revalidatePath } from 'next/cache';

export async function setUserAvatarUrl(url: string) {
  const session = await withAuth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  //пытаемся удалить чтобы не засорять хранилище
  const user = await findUserById(session.userId);

  await setAvatar(session.userId, url);
  await revalidatePath('/'); // Header image updates too
  return url;
}
