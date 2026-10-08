'use server';
import { getInitialCinemaFilms } from '@/entities/films/api/db';
import { mapFilms } from '@/entities/films/model/mappers';
import { cacheLife } from 'next/cache';

export async function getInitialCardsAction() {
  'use cache';
  cacheLife('hours');
  const initialFilmsObj = await getInitialCinemaFilms();

  return {
    recentCards: mapFilms(initialFilmsObj.recentlyAdded),
    filmCards: mapFilms(initialFilmsObj.films),
    seriesCards: mapFilms(initialFilmsObj.series),
    animeCards: mapFilms(initialFilmsObj.anime),
    cartoonCards: mapFilms(initialFilmsObj.cartoons),
  };
}
