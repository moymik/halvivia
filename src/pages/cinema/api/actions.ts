'use server';
import { getFilteredFilms, getInitialCinemaFilms } from '@/entities/films/api/db';
import { mapDbFilmToFilmWothoutGenres, mapFilms } from '@/entities/films/model/mappers';
import { FilmWithoutGenres } from '@/entities/films/model/types';
import { ActionResult } from '@/shared/model';
import { cacheLife } from 'next/cache';

export async function getInitialCardsAction() {
  const initialFilmsObj = await getInitialCinemaFilms();

  return {
    recentCards: mapFilms(initialFilmsObj.recentlyAdded),
    filmCards: mapFilms(initialFilmsObj.films),
    seriesCards: mapFilms(initialFilmsObj.series),
    animeCards: mapFilms(initialFilmsObj.anime),
    cartoonCards: mapFilms(initialFilmsObj.cartoons),
  };
}

export async function getFilteredFilmsAction(
  genreIds: number[],
  limit = 25,
  page = 1,
): Promise<
  ActionResult<{
    films: FilmWithoutGenres[];
    totalPages: number;
    totalCount: number;
  }>
> {
  'use cache';
  cacheLife('minutes');

  try {
    const result = await getFilteredFilms(genreIds, limit, page);

    return {
      success: true,
      data: {
        ...result,
        films: result.films.map(mapDbFilmToFilmWothoutGenres),
      },
    };
  } catch (error) {
    console.error('Failed to get filtered films:', error);

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}
