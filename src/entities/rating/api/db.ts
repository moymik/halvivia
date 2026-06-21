import 'server-only';

import { sql } from '@/shared/lib/db';
import { DbRating } from '@/entities/rating/model/types';

export async function upsertRating(params: {
  userId: string;
  subjectType: string;
  subjectId: string;
  rating: number | null;
}): Promise<DbRating> {
  const result = (await sql`
    INSERT INTO ratings (
      user_id,
      subject_type,
      subject_id,
      rating
    )
    VALUES (
      ${params.userId},
      ${params.subjectType},
      ${params.subjectId},
      ${params.rating}
    )
    ON CONFLICT (user_id, subject_type, subject_id)
    DO UPDATE SET
      rating = EXCLUDED.rating,
      created_at = NOW()
    RETURNING *;
  `) as DbRating[];

  return result[0];
}

export async function getRatingByUserAndSubject(params: {
  userId: string;
  subjectType: string;
  subjectId: string;
}): Promise<DbRating | null> {
  const result = (await sql`
    SELECT *
    FROM ratings
    WHERE user_id = ${params.userId}
      AND subject_type = ${params.subjectType}
      AND subject_id = ${params.subjectId}
    LIMIT 1;
  `) as DbRating[];

  return result[0] ?? null;
}

export async function getRatingsByUser(params: {
  userId: string;
  subjectType?: string;
}): Promise<DbRating[]> {
  const result = (await sql`
    SELECT *
    FROM ratings
    WHERE user_id = ${params.userId}
      AND (
        ${params.subjectType} IS NULL
        OR subject_type = ${params.subjectType}
      )
    ORDER BY created_at DESC;
  `) as DbRating[];

  return result;
}
