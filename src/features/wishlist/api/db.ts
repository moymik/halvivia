import 'server-only';

import { sql } from '@/shared/lib/db';
import { DbFilm } from '@/entities/films/model/types';

export async function addFilmToWishlist(userId: string, filmId: string): Promise<void> {
  await sql`
    INSERT INTO user_film_wishlist (user_id, film_id)
    VALUES (${userId}, ${filmId})
    ON CONFLICT (user_id, film_id) DO NOTHING
  `;
}

export async function removeFilmFromWishlist(userId: string, filmId: string): Promise<void> {
  await sql`
    DELETE FROM user_film_wishlist
    WHERE user_id = ${userId}
      AND film_id = ${filmId}
  `;
}

export async function isFilmInWishlist(userId: string, filmId: string): Promise<boolean> {
  const result = await sql`
    SELECT 1
    FROM user_film_wishlist
    WHERE user_id = ${userId}
      AND film_id = ${filmId}
    LIMIT 1
  `;

  return result.length > 0;
}

type GetUserFilmWishlistResult = {
  films: DbFilm[];
  totalCount: number;
  totalPages: number;
};

export async function getUserFilmWishlist(
  userId: string,
  limit = 25,
  page = 1,
): Promise<GetUserFilmWishlistResult> {
  const offset = (page - 1) * limit;
  const [films, countResult] = await Promise.all([
    sql`
        SELECT f.*
        FROM user_film_wishlist AS w
                 INNER JOIN films AS f
                            ON f.id = w.film_id
        WHERE w.user_id = ${userId}
        ORDER BY w.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
    `,
    sql`
      SELECT COUNT(*) as count
      FROM user_film_wishlist
      WHERE user_id = ${userId}
    `,
  ]);

  const totalCount = Number(countResult[0].count);

  return {
    films: films as DbFilm[],
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
  };
}
