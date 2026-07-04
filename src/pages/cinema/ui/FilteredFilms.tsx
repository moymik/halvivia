'use client';

import { useQuery } from '@tanstack/react-query';
import { FilmCard } from '@/entities/films/ui/FilmCard';
import { getFilteredFilmsAction } from '@/pages/cinema/api/actions';

export const fetchFilteredFilms = async (genreIds: number[], limit: number, page: number) => {
  const result = await getFilteredFilmsAction(genreIds, limit, page);

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
};

type FilmsGridProps = {
  genreIds: number[];
  page: number;
  limit?: number;
};

export function FilteredFilmsGrid({ genreIds, limit = 25, page }: FilmsGridProps) {
  const {
    data: films,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['filtered-films', genreIds, limit, page],
    queryFn: () => fetchFilteredFilms(genreIds, limit, page),
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Не удалось загрузить фильмы.</div>;
  }

  return (
    <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
      {films?.map((film) => (
        <FilmCard
          key={film.id}
          id={film.id}
          name={film.nameRu}
          posterUrl={film.posterUrl}
          ratingAvg={film.ratingAvg}
          variant={'grid'}
        />
      ))}
    </div>
  );
}
