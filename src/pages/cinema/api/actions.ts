'use server';
import { getInitialCinemaFilms } from '@/entities/films/api/db';
import { mapFilms } from '@/entities/films/model/mappers';

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
