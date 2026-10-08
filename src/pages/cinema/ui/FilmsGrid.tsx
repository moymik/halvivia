import Carousel from '@/shared/ui/carousel/Carousel';
import FilmCard, { FilmCardProps } from '@/entities/films/ui/FilmCard';

import { INITIAL_FILM_SECTIONS } from '@/pages/cinema/model/constants';
import { ReactNode } from 'react';

export type FilmsGridProps = {
  PlannedFilms: ReactNode;
  initialFilmCards: {
    filmCards: FilmCardProps[];
    seriesCards: FilmCardProps[];
    animeCards: FilmCardProps[];
    cartoonCards: FilmCardProps[];
  };
};

export function FilmsGrid({ initialFilmCards, PlannedFilms }: FilmsGridProps) {
  return (
    <div>
      {PlannedFilms}
      {INITIAL_FILM_SECTIONS.map((section) => (
        <Carousel key={section.type} label={section.label} href={section.href}>
          {initialFilmCards[section.key].map((film) => (
            <FilmCard key={film.id} variant={'grid'} {...film} />
          ))}
        </Carousel>
      ))}
    </div>
  );
}

export default FilmsGrid;
