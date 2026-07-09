import { DbGenre, Film } from '@/entities/films/model/types';
import { getDBFilmWithGenresById, getDbFilmGenres } from '@/entities/films/api/db';
import { mapDbFilmWithGenresToFilm } from '@/entities/films/model/mappers';
import { ActionResult } from '@/shared/model';
import { cacheLife } from 'next/cache';

export async function getFilmById(id: string): Promise<Film | null> {
  'use cache';
  const res = await getDBFilmWithGenresById(id);

  if (!res) return null;
  return mapDbFilmWithGenresToFilm(res);
}

export async function getFilmGenres(): Promise<ActionResult<DbGenre[]>> {
  'use cache';
  cacheLife('days');

  try {
    const rows = await getDbFilmGenres();

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
