import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { cacheTags } from '@/shared/lib/cache';

import { DbFilm, DbFilmWithGenres, DbGenre, Film } from '@/entities/films/model/types';
import { isPgError, pool, sql } from '@/shared/lib/db';

const UNIQUE_VIOLATION_CODE = '23505';

export async function findFilmIdByKinopoiskId(kinopoiskId: number): Promise<string | null> {
  const rows = (await sql.query(
    `
    SELECT id
    FROM films
    WHERE kinopoisk_id = $1
    LIMIT 1
    `,
    [kinopoiskId],
  )) as { id: string }[];

  return rows[0]?.id ?? null;
}

export async function addFilm(film: Film): Promise<Film> {
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
        completed,
        cover_url
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
        $24, $25
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
        film.coverUrl,
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

    return { ...film, id: filmId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function addFilmOrGetExisting(
  film: Film,
): Promise<{ created: true; film: Film } | { created: false; id: string }> {
  try {
    const createdFilm = await addFilm(film);
    return { created: true, film: createdFilm };
  } catch (error) {
    if (!isPgError(error) || error.code !== UNIQUE_VIOLATION_CODE) {
      throw error;
    }

    const existingId = await findFilmIdByKinopoiskId(film.kinopoiskId);

    if (!existingId) {
      throw error;
    }

    return { created: false, id: existingId };
  }
}

export async function getDBFilmWithGenresById(id: string): Promise<DbFilmWithGenres | null> {
  const rows = await sql`
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
    WHERE f.id =  ${id}
    GROUP BY f.id
    `;
  const film = rows[0] ?? null;

  return film as DbFilmWithGenres;
}

export async function getInitialCinemaFilms() {
  const [recentlyAdded, films, series, anime, cartoons] = await Promise.all([
    getRecentFilms(10),
    getFilmsByType('FILM', 10),
    getFilmsByType('SERIES', 10),
    getFilmsByType('ANIME', 10),
    getFilmsByType('CARTOON', 10),
  ]);

  return {
    recentlyAdded,
    films,
    series,
    anime,
    cartoons,
  };
}

export async function getRecentFilms(limit = 10) {
  const rows = (await sql.query(
    `
    SELECT *
    FROM films
    ORDER BY created_at DESC
    LIMIT $1
  `,
    [limit],
  )) as DbFilm[];

  return rows;
}

export async function getFilmsByType(type: string, limit = 10) {
  const rows = (await sql.query(
    `
    SELECT *
    FROM films
    WHERE type = $1
    ORDER BY created_at DESC
    LIMIT $2
  `,
    [type, limit],
  )) as DbFilm[];

  return rows;
}

export async function getDbFilmGenres(): Promise<DbGenre[]> {
  'use cache';
  cacheLife('days');
  // Новые жанры появляются вместе с новым фильмом.
  cacheTag(cacheTags.catalog('film'));

  const rows = await sql`
    SELECT *
    FROM genres
  `;

  return rows as DbGenre[];
}
