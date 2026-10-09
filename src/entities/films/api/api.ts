import { DbGenre, Film } from '@/entities/films/model/types';
import { getDBFilmWithGenresById, getDbFilmGenres } from '@/entities/films/api/db';
import { mapDbFilmWithGenresToFilm } from '@/entities/films/model/mappers';
import { ActionResult } from '@/shared/model';
import { cacheLife, cacheTag } from 'next/cache';
import { cacheTags } from '@/shared/lib/cache';

export async function getFilmById(id: string): Promise<Film | null> {
  'use cache';
  cacheLife('hours');
  cacheTag(cacheTags.subject({ type: 'film', id }));
  const res = await getDBFilmWithGenresById(id);

  if (!res) return null;
  return mapDbFilmWithGenresToFilm(res);
}

// Без 'use cache': кэшируется getDbFilmGenres, а ответ с ошибкой БД кэшировать нельзя.
export async function getFilmGenres(): Promise<ActionResult<DbGenre[]>> {
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
