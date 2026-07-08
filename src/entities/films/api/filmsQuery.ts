('server-only');

import { sql } from '@/shared/lib/db';
import { DbFilmWithGenres, FilmFilters } from '@/entities/films/model/types';
import { FILM_SORT_MAP } from '@/entities/films/model/constants';

type QueryBuilder = {
  where: string[];
  values: unknown[];
};

export function buildFilmWhere(filters: FilmFilters): QueryBuilder {
  const values: unknown[] = [];
  const where: string[] = [];

  if (filters.search) {
    values.push(`%${filters.search}%`);

    where.push(`
      (
        name_ru ILIKE $${values.length}
        OR name_en ILIKE $${values.length}
        OR name_original ILIKE $${values.length}
      )
    `);
  }

  if (filters.type?.length) {
    values.push(filters.type);

    where.push(`
      type = ANY($${values.length})
    `);
  }

  if (filters.yearFrom !== undefined) {
    values.push(filters.yearFrom);

    where.push(`
      year >= $${values.length}
    `);
  }

  if (filters.yearTo !== undefined) {
    values.push(filters.yearTo);

    where.push(`
      year <= $${values.length}
    `);
  }

  if (filters.serial !== undefined) {
    values.push(filters.serial);

    where.push(`
      serial = $${values.length}
    `);
  }

  if (filters.genreIds?.length) {
    values.push(filters.genreIds);

    where.push(`
      EXISTS (
        SELECT 1
        FROM film_genres fg2
        WHERE fg2.film_id = f.id
        AND fg2.genre_id = ANY($${values.length})
      )
    `);
  }

  return {
    where,
    values,
  };
}

export function getPagination(filters: FilmFilters) {
  const limit = filters.limit ?? 24;
  const page = filters.page ?? 1;

  return {
    limit,
    offset: (page - 1) * limit,
  };
}

export const FILMS_SELECT_QUERY = `
SELECT
  f.*,
  COALESCE(genres.genres, '[]') AS genres

FROM films f

LEFT JOIN LATERAL (

  SELECT json_agg(
    json_build_object(
      'id', g.id,
      'name', g.name
    )
    ORDER BY g.name
  ) AS genres

  FROM film_genres fg

  JOIN genres g
    ON g.id = fg.genre_id

  WHERE fg.film_id = f.id

) genres ON TRUE
`;

export async function filmsQuery(filters: FilmFilters): Promise<DbFilmWithGenres[]> {
  const { where, values } = buildFilmWhere(filters);

  const { limit, offset } = getPagination(filters);

  const orderBy = FILM_SORT_MAP[filters.sort ?? 'newest'];

  values.push(limit);
  const limitIndex = values.length;

  values.push(offset);
  const offsetIndex = values.length;

  const query = `
    ${FILMS_SELECT_QUERY}

    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}

    ORDER BY ${orderBy}

    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
  `;

  return (await sql.query(query, values)) as DbFilmWithGenres[];
}
