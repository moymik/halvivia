import 'server-only';
import { sql } from '@/shared/lib/db';
import { BookWithUserRating, FilmWithUserRating } from '@/widgets/UserRatingsLists/model';
import { DbBook, mapDbBook } from '@/entities/books/model/mappers';
import { RatingValue } from '@/entities/rating/model/types';
import { DbFilm } from '@/entities/films/model/types';
import { mapDbFilmToFilmWithoutGenres } from '@/entities/films/model/mappers';

export async function getUserBooksWithRating(
  userId: string,
  limit = 20,
): Promise<BookWithUserRating[]> {
  const rows = (await sql`
    SELECT b.*, r.rating AS user_rating
    FROM books b
           INNER JOIN ratings r
                      ON r.subject_id = b.id
                        AND r.subject_type = 'book'
                        AND r.user_id = ${userId}
    ORDER BY r.created_at DESC
    LIMIT ${limit}
  `) as (DbBook & { user_rating: RatingValue })[];

  return rows.map((row) => {
    const { user_rating, ...bookFields } = row;
    return {
      ...mapDbBook(bookFields),
      userRating: user_rating,
    };
  });
}

export async function getUserFilmsWithRating(
  userId: string,
  limit = 20,
): Promise<FilmWithUserRating[]> {
  const rows = (await sql`
    SELECT f.*, r.rating AS user_rating
    FROM films f
           INNER JOIN ratings r
                      ON r.subject_id = f.id
                        AND r.subject_type = 'film'
                        AND r.user_id = ${userId}
    ORDER BY r.created_at DESC
    LIMIT ${limit}
  `) as (DbFilm & { user_rating: RatingValue })[];

  return rows.map((row) => {
    const { user_rating, ...filmFields } = row;
    return {
      ...mapDbFilmToFilmWithoutGenres(filmFields),
      userRating: user_rating,
    };
  });
}
