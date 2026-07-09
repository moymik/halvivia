'use client';

import Carousel from '@/shared/ui/carousel/Carousel';
import FilmCard, { FilmCardProps } from '@/entities/films/ui/FilmCard';

import { useFiltersStore } from '@/pages/cinema/model/useFiltersStore';
import { FilteredFilmsGrid } from '@/pages/cinema/ui/FilteredFilmsGrid';
import { INITIAL_FILM_SECTIONS } from '@/pages/cinema/model/constants';

export type FilmsGridProps = {
  initialFilmCards: {
    filmCards: FilmCardProps[];
    seriesCards: FilmCardProps[];
    animeCards: FilmCardProps[];
    cartoonCards: FilmCardProps[];
  };
};

export function FilmsGrid({ initialFilmCards }: FilmsGridProps) {
  const selectedGenreIds = useFiltersStore((state) => state.selectedGenreIds);

  const isFiltered = selectedGenreIds.length > 0;

  if (isFiltered) {
    return <FilteredFilmsGrid genreIds={selectedGenreIds} />;
  }

  return (
    <div>
      {INITIAL_FILM_SECTIONS.map((section) => (
        <Carousel key={section.type} label={section.label} href={section.href}>
          {initialFilmCards[section.key].map((film) => (
            <FilmCard key={film.id} {...film} />
          ))}
        </Carousel>
      ))}
    </div>
  );
}

export default FilmsGrid;
