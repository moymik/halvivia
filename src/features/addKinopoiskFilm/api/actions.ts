'use server';

import { addFilmByKinopoiskId, searchFilmsByKeyword } from '@/features/addKinopoiskFilm/api/api';
import { withAuth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import { revalidatePath } from 'next/cache';
import { FilmSearchByKeywordResponseSchema } from '@/features/addKinopoiskFilm/model/schemas';
import { FilmSearchByKeywordItem } from '@/features/addKinopoiskFilm/model/types';

export async function addKinopoiskFilmAction(id: number) {
  const controller = new AbortController();
  const session = await withAuth();

  if (session.status === 'unauthenticated') {
    redirect(ROUTES.LOGIN);
  }

  if (session.payload.role !== 'MEMBER') {
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

type GetFilmsByKeywordActionResult =
  | { success: true; data: FilmSearchByKeywordItem[] }
  | { success: false; error: string };

export async function getFilmsByKeywordAction(
  keyword: string,
): Promise<GetFilmsByKeywordActionResult> {
  try {
    if (!keyword || keyword.trim().length < 2) {
      return {
        success: false,
        error: 'At least two symbols required',
      };
    }

    const data = await searchFilmsByKeyword(keyword);

    const parsed = FilmSearchByKeywordResponseSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: 'Invalid API response format',
      };
    }

    return {
      success: true,
      data: parsed.data.films,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Unknown error',
    };
  }
}
