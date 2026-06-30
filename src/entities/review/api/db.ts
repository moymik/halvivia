import 'server-only';
import { sql } from '@/shared/lib/db';
import { DbReview, DbReviewWithRating } from '@/entities/review/model/types';

export async function upsertReview(params: {
  userId: string;
  subjectType: string;
  subjectId: string;

  title: string | null;
  text: string | null;
}): Promise<DbReview> {
  const rows = (await sql`
    INSERT INTO reviews (
      user_id,
      subject_type,
      subject_id,
      title,
      review_text
    )
    VALUES (
      ${params.userId},
      ${params.subjectType},
      ${params.subjectId},
      ${params.title},
      ${params.text}
    )
    ON CONFLICT (user_id, subject_type, subject_id)
    DO UPDATE SET
      title = EXCLUDED.title,
      review_text = EXCLUDED.review_text,
      created_at = NOW()
    RETURNING *;
  `) as DbReview[];

  return rows[0];
}

export async function deleteReview(params: {
  userId: string;
  subjectType: string;
  subjectId: string;
}) {
  return sql`
    DELETE FROM reviews
    WHERE user_id = ${params.userId}
      AND subject_type = ${params.subjectType}
      AND subject_id = ${params.subjectId};
  `;
}

export async function getReviewsBySubject(params: {
  subjectType: string;
  subjectId: string;
  limit?: number;
}): Promise<DbReviewWithRating[]> {
  const limit = params.limit ?? 50;

  return (await sql`
    SELECT r.id         AS review_id,
           r.user_id,

           r.subject_type,
           r.subject_id,

           r.title,
           r.review_text,
           r.created_at AS review_created_at,

           rt.rating    AS rating_value

    FROM reviews r
           LEFT JOIN ratings rt
                     ON rt.user_id = r.user_id
                       AND rt.subject_type = r.subject_type
                       AND rt.subject_id = r.subject_id

    WHERE r.subject_type = ${params.subjectType}
      AND r.subject_id = ${params.subjectId}

    ORDER BY r.created_at DESC
    LIMIT ${limit};
  `) as DbReviewWithRating[];
}

export async function getReviewsByUser(params: {
  userId: string;
  limit?: number;
}): Promise<DbReviewWithRating[]> {
  const limit = params.limit ?? 50;

  return (await sql`
    SELECT
      r.id AS review_id,
      r.user_id,

      r.subject_type,
      r.subject_id,

      r.title,
      r.review_text,
      r.created_at AS review_created_at,

      rt.rating AS rating_value

    FROM reviews r
    LEFT JOIN ratings rt
      ON rt.user_id = r.user_id
     AND rt.subject_type = r.subject_type
     AND rt.subject_id = r.subject_id

    WHERE r.user_id = ${params.userId}

    ORDER BY r.created_at DESC
    LIMIT ${limit};
  `) as DbReviewWithRating[];
}
