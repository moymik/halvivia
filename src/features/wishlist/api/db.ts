import 'server-only';

import { sql } from '@/shared/lib/db';

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

export async function getUserFilmWishlist(userId: string) {
  return sql`
    SELECT
      f.*,
      w.created_at AS wishlist_created_at
    FROM user_film_wishlist AS w
           INNER JOIN films AS f
                      ON f.id = w.film_id
    WHERE w.user_id = ${userId}
    ORDER BY w.created_at DESC
  `;
}
