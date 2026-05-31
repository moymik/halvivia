import { cookies } from 'next/headers';

export async function setSessionCookies(params: { accessToken: string; refreshToken: string }) {
  const cookieStore = await cookies();

  cookieStore.set('access_token', params.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
  });

  cookieStore.set('refresh_token', params.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
  });
}

export async function clearSessionCookies() {
  const cookieStore = await cookies();

  cookieStore.set('access_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  cookieStore.set('refresh_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}
