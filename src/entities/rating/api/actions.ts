'use server';

import { getRatingByUserIdAndSubject, getRatingsBySubject } from '@/entities/rating/api/db';
import { mapDbRatingToRating, mapDbToRatingWithUser } from '@/entities/rating/model/mappers';
import { Rating, RatingWithUser } from '@/entities/rating/model/types';
import { ActionResult, Subject } from '@/shared/model';
import { cacheTag } from 'next/cache';

export async function getRatingsBySubjectAction(params: {
  subject: Subject;
}): Promise<ActionResult<RatingWithUser[]>> {
  'use cache';
  cacheTag(`ratings:${params.subject.type}:${params.subject.id}`);

  try {
    const dbRatings = await getRatingsBySubject({
      subject: params.subject,
    });

    const ratings = dbRatings.map(mapDbToRatingWithUser);

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
