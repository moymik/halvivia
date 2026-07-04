'use server';

import { DbGenre, Film } from '@/entities/films/model/types';
import { getDBFilmWithGenresById, getFilmGenres } from '@/entities/films/api/db';
import { mapDbFilmWithGenresToFilm } from '@/entities/films/model/mappers';
import { ActionResult } from '@/shared/model';

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
