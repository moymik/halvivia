'use server';
import { cookies } from 'next/headers';

import { deleteRefreshToken, clearSessionCookies } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refresh_token')?.value;
  try {
    if (refreshToken) {
      await deleteRefreshToken(refreshToken);
    }
  } finally {
    await clearSessionCookies();
  }
  redirect('/auth/login');
}
