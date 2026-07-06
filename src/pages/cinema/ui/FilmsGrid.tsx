'use client';
import Carousel from '@/shared/ui/carousel/Carousel';
import FilmCard, { FilmCardProps } from '@/entities/films/ui/FilmCard';
import { useFiltersStore } from '@/pages/cinema/model/useFiltersStore';
import { FilteredFilmsGrid } from '@/pages/cinema/ui/FilteredFilmsGrid';

export type FilmsGridProps = {
  initialFilmCards: {
    filmCards: FilmCardProps[];
    seriesCards: FilmCardProps[];
    animeCards: FilmCardProps[];
    cartoonCards: FilmCardProps[];
  };
};

export function FilmsGrid({ initialFilmCards }: FilmsGridProps) {
  const selectedGenreIds = useFiltersStore((s) => s.selectedGenreIds);
  const isFiltered = selectedGenreIds.length > 0;

  return (
    <>
      {!isFiltered && (
        <div>
          <Carousel label={'Фильмы'}>
            {initialFilmCards.filmCards.map((prop) => (
              <FilmCard key={prop.id} {...prop} />
            ))}
          </Carousel>
          <Carousel label={'Сериалы'}>
            {initialFilmCards.seriesCards.map((prop) => (
              <FilmCard key={prop.id} {...prop} />
            ))}
          </Carousel>
          <Carousel label={'Аниме'}>
            {initialFilmCards.animeCards.map((prop) => (
              <FilmCard key={prop.id} {...prop} />
            ))}
          </Carousel>
          <Carousel label={'Мультфильмы'}>
            {initialFilmCards.cartoonCards.map((prop) => (
              <FilmCard key={prop.id} {...prop} />
            ))}
          </Carousel>
        </div>
      )}
      {isFiltered && (
        <>
          <FilteredFilmsGrid genreIds={selectedGenreIds}></FilteredFilmsGrid>
        </>
      )}
    </>
  );
}

export default FilmsGrid;
