'use server';

import { addFilmByKinopoiskId } from '@/features/addKinopoiskFilm/api/api';
import { KinopoiskSearchFIlm } from '@/features/addKinopoiskFilm/model/types';
import { KinopoiskSearchFilmSchema } from '@/features/addKinopoiskFilm/model/schemas';
import { withAuth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import { revalidatePath } from 'next/cache';

export async function addKinopoiskFilmAction(id: number) {
  const controller = new AbortController();
  const session = await withAuth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  if (session.role !== 'MEMBER') {
    return { success: false, error: 'Unauthorized' };
  }

  setTimeout(() => controller.abort(), 15000);
  try {
    const filmId = await addFilmByKinopoiskId(id);
    revalidatePath(ROUTES.CINEMA);
    return {
      success: true,
      filmId: filmId,
    } as const;
  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: 'FAILED_TO_CREATE_FILM',
    } as const;
  }
}

export async function findKinopoiskFilmsByNameAction(keyword: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    await searchKinopoiskFilmsByKeyword(keyword);
    return {
      success: true,
    } as const;
  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: 'FAILED_TO_FIND_FILMS',
    } as const;
  }
}

export async function searchKinopoiskFilmsByKeyword(
  keyword: string,
): Promise<KinopoiskSearchFIlm[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const queryString = new URLSearchParams({ keyword: keyword }).toString();
    const res = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?${queryString}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.KINOPOISK_API_PRIVATE_KEY!,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data.films.length === 0) {
      return [];
    }

    /// проверяем первый фильм на всякий случай
    const check = KinopoiskSearchFilmSchema.array().safeParse(data.films);

    if (!check.success) {
      console.error('Invalid searchFilms film array type:', check.error.issues);
      throw new Error('Kinopoisk API returned invalid data');
    }

    return data.films;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
