'use server';

import { DbFilmWithGenres, Film } from '@/entities/films/model/types';
import { pool } from '@/shared/lib/db';

export async function addFilm(film: Film): Promise<string> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const filmResult = await client.query(
      `
      INSERT INTO films (
        kinopoisk_id,
        kinopoisk_hd_id,
        imdb_id,
        name_ru,
        name_en,
        name_original,
        poster_url,
        poster_url_preview,
        rating_imdb,
        rating_kinopoisk,
        web_url,
        year,
        film_length,
        slogan,
        description,
        type,
        rating_age_limits,
        last_sync,
        countries,
        start_year,
        end_year,
        serial,
        short_film,
        completed
      )
      VALUES (
        $1, $2, $3,
        $4, $5, $6,
        $7, $8,
        $9, $10,
        $11, $12,
        $13,
        $14, $15,
        $16, $17,
        $18,
        $19,
        $20,
        $21,
        $22, $23,
        $24
      )
      RETURNING id
      `,
      [
        film.kinopoiskId,
        film.kinopoiskHDId,
        film.imdbId,
        film.nameRu,
        film.nameEn,
        film.nameOriginal,
        film.posterUrl,
        film.posterUrlPreview,
        film.ratingImdb,
        film.ratingKinopoisk,
        film.webUrl,
        film.year,
        film.filmLength,
        film.slogan,
        film.description,
        film.type,
        film.ratingAgeLimits,
        new Date(film.lastSync),
        film.countries,
        film.startYear,
        film.endYear,
        film.serial,
        film.shortFilm,
        film.completed,
      ],
    );

    const filmId = filmResult.rows[0].id as string;

    for (const genre of film.genres) {
      const genreName = genre.genre.trim();

      const genreResult = await client.query(
        `
        INSERT INTO genres (name)
        VALUES ($1)
        ON CONFLICT (name)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id
        `,
        [genreName],
      );

      const genreId = genreResult.rows[0].id as number;

      await client.query(
        `
        INSERT INTO film_genres (film_id, genre_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [filmId, genreId],
      );
    }

    await client.query('COMMIT');

    return filmId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getDBFilmWithGenresById(id: string): Promise<DbFilmWithGenres | null> {
  const result = await pool.query<DbFilmWithGenres>(
    `
    SELECT
      f.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', g.id,
            'name', g.name
          )
        ) FILTER (WHERE g.id IS NOT NULL),
        '[]'
      ) AS genres
    FROM films f
    LEFT JOIN film_genres fg
      ON fg.film_id = f.id
    LEFT JOIN genres g
      ON g.id = fg.genre_id
    WHERE f.id = $1
    GROUP BY f.id
    `,
    [id],
  );
  console.log('dbwithgenres:', result.rows[0]);
  return result.rows[0] ?? null;
}
