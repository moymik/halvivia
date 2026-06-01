import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { issueSession } from '@/shared/lib/auth/dal';
import { verifyRefreshToken } from '@/shared/lib/auth/jwt';
import { clearSessionCookies } from '@/shared/lib/auth/cookies';
import { deleteRefreshToken } from '@/shared/lib/auth/refresh_token.db';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    await clearSessionCookies();
    return NextResponse.json({ status: 'unauthenticated' }, { status: 401 });
  }

  const refreshSession = await verifyRefreshToken(refreshToken);

  if (!refreshSession) {
    await deleteRefreshToken(refreshToken);
    await clearSessionCookies();
    return NextResponse.json({ status: 'unauthenticated' }, { status: 401 });
  }

  try {
    await issueSession(refreshSession.userId, refreshToken);
    return NextResponse.json({ status: 'refreshed' });
  } catch (error) {
    console.error(error);
    await clearSessionCookies();
    return NextResponse.json({ status: 'unauthenticated' }, { status: 500 });
  }
}
