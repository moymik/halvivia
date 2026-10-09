import FilmCard from '@/entities/films/ui/FilmCard';
import Carousel from '@/shared/ui/carousel/Carousel';

import { getInitialCardsAction } from '@/pages/cinema/api/actions';
import Toolbar from '@/pages/cinema/ui/Toolbar';
import FilmsGrid from '@/pages/cinema/ui/FilmsGrid';
import { Suspense } from 'react';
import PlannedFilmsCarousel from '@/features/wishlist/ui/PlannedFilmsCarousel';
import { parseFilmFiltersFromSearchParams } from '@/pages/lists/model';
import { filmsQuery } from '@/entities/films/api/filmsQuery';
import { getFilmGenres } from '@/entities/films/api/api';
import FilterForm from '@/pages/lists/FilterForm';
import { PaginationClient } from '@/pages/lists/PaginationClient';
import { CatalogLayout } from '@/widgets/CatalogFilters';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function CinemaPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = parseFilmFiltersFromSearchParams(params);

  // The "Все" subsection has no type in the URL and keeps the cinema overview.
  if (filters.type?.length) {
    const [filmsResult, genresResult] = await Promise.all([filmsQuery(filters), getFilmGenres()]);

    if (!filmsResult.success) return <>Не удалось загрузить фильмы</>;
    if (!genresResult.success) return <>Не удалось загрузить жанры</>;

    return (
      <CatalogLayout
        title={getCinemaSectionTitle(filters.type)}
        filters={<FilterForm filters={filters} genres={genresResult.data} />}
      >
        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-5">
          {filmsResult.data.films.map((film) => (
            <FilmCard
              key={film.id}
              id={film.id}
              name={film.nameRu}
              posterUrl={film.posterUrl}
              ratingAvg={film.ratingAvg}
              variant="grid"
              coverUrl={film.coverUrl}
            />
          ))}
        </div>
        <PaginationClient
          page={filters.page}
          totalPages={Math.ceil(filmsResult.data.totalCount / filters.limit)}
        />
      </CatalogLayout>
    );
  }

  const initialCards = await getInitialCardsAction();
  return (
    <>
      <section className={'w-full'}>
        <div className={'page-content-width flex flex-col pt-7.5 pb-10'}>
          <Carousel
            className={'text-text-primary'}
            href={'/cinema?type=FILM%2CSERIES%2CANIME%2CCARTOON%2COTHERS'}
            label={'Новинки'}
          >
            {initialCards.recentCards.map((prop) => (
              <FilmCard key={prop.id} variant={'grid'} {...prop} />
            ))}
          </Carousel>
          <FilmsGrid
            initialFilmCards={initialCards}
            PlannedFilms={
              <Suspense key="planned">
                <PlannedFilmsCarousel></PlannedFilmsCarousel>
              </Suspense>
            }
          ></FilmsGrid>
        </div>
      </section>
    </>
  );
}

function getCinemaSectionTitle(type: string[]) {
  const titles: Record<string, string> = {
    FILM: 'Фильмы',
    SERIES: 'Сериалы',
    ANIME: 'Аниме',
    CARTOON: 'Мультфильмы',
  };

  return type.length === 1 ? (titles[type[0]] ?? 'Кино') : 'Кино';
}

export default CinemaPage;
