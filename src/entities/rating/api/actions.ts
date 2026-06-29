'use server';

import {
  getRatingByUserIdAndSubject,
  getRatingsBySubject,
  upsertRating,
} from '@/entities/rating/api/db';
import { mapDbRatingToRating } from '@/entities/rating/model/mappers';
import { Rating } from '@/entities/rating/model/types';
import { withAuth } from '@/shared/lib/auth';
import { ActionResult, Subject } from '@/shared/model';

export async function setRatingAction(params: {
  subject: Subject;
  value: number;
}): Promise<ActionResult<Rating>> {
  const session = await withAuth();
  if (session.status === 'unauthenticated') return { success: false, error: 'UNAUTHENTICATED' };

  const userId = session.payload.userId;

  try {
    const dbRating = await upsertRating({
      userId,
      subjectType: params.subject.type,
      subjectId: params.subject.id,
      newRating: params.value,
    });

    const rating = mapDbRatingToRating(dbRating);

    return {
      success: true,
      data: rating,
    };
  } catch (e) {
    console.error('setRating failed:', e);

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}

export async function getRatingsBySubjectAction(params: {
  subjectType: string;
  subjectId: string;
}): Promise<ActionResult<Rating[]>> {
  try {
    const dbRatings = await getRatingsBySubject({
      subjectType: params.subjectType,
      subjectId: params.subjectId,
    });

    const ratings = dbRatings.map(mapDbRatingToRating);

    return {
      success: true,
      data: ratings,
    };
  } catch (e) {
    console.error('getRatingsBySubject failed:', e);

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}

export async function getRatingByUserIdAndSubjectAction(params: {
  userId: string;
  subject: Subject;
}): Promise<ActionResult<Rating | null>> {
  try {
    const dbRating = await getRatingByUserIdAndSubject({
      userId: params.userId,
      subject: params.subject,
    });

    let rating = null;

    if (dbRating) {
      rating = mapDbRatingToRating(dbRating);
    }
    return {
      success: true,
      data: rating,
    };
  } catch (e) {
    console.error('getRatingsBySubject failed:', e);

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}
