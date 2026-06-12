'use server';
import { getInitialCinemaFilms } from '@/entities/films/api/db';
import { mapDbFilmToFilmCardProps } from '@/entities/films/model/mappers';

export async function getInitialCardsAction() {
  const initialFilmsObj = await getInitialCinemaFilms();
  return {
    recentCards: initialFilmsObj.recentlyAdded.map((film) => mapDbFilmToFilmCardProps(film)),
    filmCards: initialFilmsObj.films.map((film) => mapDbFilmToFilmCardProps(film)),
    seriesCards: initialFilmsObj.series.map((film) => mapDbFilmToFilmCardProps(film)),
    animeCards: initialFilmsObj.anime.map((film) => mapDbFilmToFilmCardProps(film)),
    cartoonCards: initialFilmsObj.cartoons.map((film) => mapDbFilmToFilmCardProps(film)),
  };
}
