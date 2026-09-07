'use server';
import { withAuth } from '@/shared/lib/auth';
import { findUserById, setAvatar, updateUserName } from '@/entities/user/api/db';
import { revalidatePath } from 'next/cache';
import { isPgError } from '@/shared/lib/db';
import { UserNameSchema } from '@/entities/user/model/types';
import { ROUTES } from '@/shared/config';

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

export type UpdateUserNameState = {
  success: boolean;
  error?: string;
};

export async function updateUserNameAction(
  _previousState: UpdateUserNameState,
  formData: FormData,
): Promise<UpdateUserNameState> {
  const session = await withAuth();

  if (session.status === 'unauthenticated') {
    return { success: false, error: 'Необходимо авторизоваться.' };
  }

  const parsedName = UserNameSchema.safeParse(formData.get('name'));

  if (!parsedName.success) {
    return { success: false, error: parsedName.error.issues[0]?.message ?? 'Некорректное имя.' };
  }

  try {
    const user = await updateUserName(session.payload.userId, parsedName.data);

    if (!user) {
      return { success: false, error: 'Пользователь не найден.' };
    }

    revalidatePath('/');
    revalidatePath(ROUTES.PROFILE + user.id);
    revalidatePath(ROUTES.SETTINGS + user.id);

    return { success: true };
  } catch (error) {
    if (isPgError(error) && error.code === '23505') {
      return { success: false, error: 'Это имя уже занято.' };
    }

    console.error('Failed to update user name', { userId: session.payload.userId, error });
    return { success: false, error: 'Не удалось сохранить имя. Попробуйте ещё раз.' };
  }
}
