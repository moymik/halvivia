'use client';
import Carousel from '@/shared/ui/carousel/Carousel';
import FilmCard, { FilmCardProps } from '@/entities/films/ui/FilmCard';
import { useFiltersStore } from '@/pages/cinema/model/useFiltersStore';
import { FilteredFilmsGrid } from '@/pages/cinema/ui/FilteredFilms';
import { useState } from 'react';

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

  const [page, setPage] = useState(1);
  const isFiltered = selectedGenreIds.length > 0;
  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

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
          <FilteredFilmsGrid genreIds={selectedGenreIds} page={page}></FilteredFilmsGrid>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="px-3 py-1 disabled:opacity-50"
            >
              Назад
            </button>

            <span>Страница {page}</span>

            <button onClick={nextPage} className="px-3 py-1">
              Далее
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default FilmsGrid;
