'use server';

import { Film } from '@/entities/films/model/types';
import { getDBFilmWithGenresById } from '@/entities/films/api/db';
import { mapDbFilmWithGenresToFilm } from '@/entities/films/model/mappers';

export async function getFilmByIdAction(id: string): Promise<Film | null> {
  const res = await getDBFilmWithGenresById(id);
  if (!res) return null;
  return mapDbFilmWithGenresToFilm(res);
}
