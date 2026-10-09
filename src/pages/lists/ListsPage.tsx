import { filmsQuery } from '@/entities/films/api/filmsQuery';
import { PaginationClient } from '@/pages/lists/PaginationClient';
import FilterForm from '@/pages/lists/FilterForm';
import { parseFilmFiltersFromSearchParams } from '@/pages/lists/model';
import { getFilmGenres } from '@/entities/films/api/api';
import FilmCard from '@/entities/films/ui/FilmCard';
import { CatalogLayout } from '@/widgets/CatalogFilters';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function ListsPage({ searchParams }: Props) {
  const params = await searchParams;

  const filters = parseFilmFiltersFromSearchParams(params);

  const result = await filmsQuery(filters);

  if (!result.success) {
    return <>Не удалось загрузить фильмы</>;
  }

  const genresResult = await getFilmGenres();

  if (!genresResult.success) {
    return <>не удалось загрузить жанры</>;
  }

  return (
    <CatalogLayout
      title="Новинки"
      filters={<FilterForm filters={filters} genres={genresResult.data} />}
    >
      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-5">
        {result.data.films.map((film) => (
          <FilmCard
            key={film.id}
            id={film.id}
            name={film.nameRu}
            posterUrl={film.posterUrl}
            ratingAvg={film.ratingAvg}
            variant={'grid'}
            coverUrl={film.coverUrl}
          />
        ))}
      </div>

      <PaginationClient
        page={filters.page}
        totalPages={Math.ceil(result.data.totalCount / filters.limit)}
      />
    </CatalogLayout>
  );
}

export default ListsPage;
