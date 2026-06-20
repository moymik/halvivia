'use server';
import { verifySession } from '@/shared/lib/auth';
import { findUserById } from '@/entities/user';

export async function getCurrentUser() {
  const session = await verifySession();

  if (session.status === 'unauthenticated') {
    return null;
  }

  return findUserById(session.payload.userId);
}
