'use server';

import { ActionResult } from '@/shared/model';
import { addFilmToWishlist, removeFilmFromWishlist } from '@/features/wishlist/api/db';
import { z } from 'zod';
import { withAuth } from '@/shared/lib/auth';

const filmIdSchema = z.string().uuid();

export async function addFilmToWishlistAction(filmId: string): Promise<ActionResult<string>> {
  const session = await withAuth();

  if (session.status === 'unauthenticated') {
    return {
      success: false,
      error: 'UNAUTHORIZED',
    };
  }

  const parsedFilmId = filmIdSchema.safeParse(filmId);

  if (!parsedFilmId.success) {
    return {
      success: false,
      error: 'VALIDATION_ERROR',
    };
  }

  try {
    await addFilmToWishlist(session.payload.userId, parsedFilmId.data);

    return {
      success: true,
      data: parsedFilmId.data,
    };
  } catch (error) {
    console.error('Failed to add film to wishlist', {
      userId: session.payload.userId,
      filmId: parsedFilmId.data,
      error,
    });

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}

export async function removeFilmFromWishlistAction(filmId: string): Promise<ActionResult<string>> {
  const session = await withAuth();

  if (session.status === 'unauthenticated') {
    return { success: false, error: 'UNAUTHORIZED' };
  }

  const parsedFilmId = filmIdSchema.safeParse(filmId);

  if (!parsedFilmId.success) {
    return { success: false, error: 'VALIDATION_ERROR' };
  }

  try {
    await removeFilmFromWishlist(session.payload.userId, parsedFilmId.data);
    return {
      success: true,
      data: parsedFilmId.data,
    };
  } catch (error) {
    console.error('Failed to remove film from wishlist', {
      userId: session.payload.userId,
      filmId: parsedFilmId.data,
      error,
    });

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}
