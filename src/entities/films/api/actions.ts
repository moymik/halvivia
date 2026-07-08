'use server';

import { DbGenre, Film, FilmFilters } from '@/entities/films/model/types';
import { getDBFilmWithGenresById, getFilmGenres } from '@/entities/films/api/db';
import { mapDbFilmWithGenresToFilm } from '@/entities/films/model/mappers';
import { ActionResult } from '@/shared/model';
import { filmsQuery } from '@/entities/films/api/filmsQuery';
import { FilmFiltersSchema } from '@/entities/films/model/Schemas';

export async function getFilmByIdAction(id: string): Promise<Film | null> {
  'use cache';
  const res = await getDBFilmWithGenresById(id);

  if (!res) return null;
  return mapDbFilmWithGenresToFilm(res);
}

export async function getFilmGenresAction(): Promise<ActionResult<DbGenre[]>> {
  try {
    const rows = await getFilmGenres();

    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}

export async function filmsQueryAction(filters: FilmFilters): Promise<ActionResult<Film[]>> {
  const parsedFilters = FilmFiltersSchema.parse(filters);

  try {
    const rows = await filmsQuery(parsedFilters);

    return {
      success: true,
      data: rows.map(mapDbFilmWithGenresToFilm),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}
