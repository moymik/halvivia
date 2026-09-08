'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { RatingHistoryChart } from './RatingHistoryChart';

import {
  mapBooksToRatingChartItems,
  mapFilmsToRatingChartItems,
} from '@/widgets/UserRatingsLists/model/mappers';

import {
  BookWithUserRating,
  FilmWithUserRating,
  RatingHistoryPage,
} from '@/widgets/UserRatingsLists/model/types';

import { Pagination } from '@/shared/ui/pagination/pagination';

type Tab = 'books' | 'films';

type RatingHistoryProps = {
  books: RatingHistoryPage<BookWithUserRating>;
  films: RatingHistoryPage<FilmWithUserRating>;

  booksPage: number;
  filmsPage: number;

  pageSize?: number;
};

export function RatingHistory({
  books,
  films,
  booksPage,
  filmsPage,
  pageSize = 20,
}: RatingHistoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<Tab>('books');

  const isBooks = tab === 'books';

  const data = isBooks ? books : films;

  const page = isBooks ? booksPage : filmsPage;

  const chartItems = isBooks
    ? mapBooksToRatingChartItems(books.items)
    : mapFilmsToRatingChartItems(films.items);

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');

    params.set(isBooks ? 'booksPage' : 'filmsPage', String(nextPage));

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTabChange = (nextTab: Tab) => {
    setTab(nextTab);
  };

  const from = data.totalCount === 0 ? 0 : (page - 1) * pageSize + 1;

  const to = Math.min(page * pageSize, data.totalCount);

  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Мои оценки</h2>

          <p className="mt-1 text-sm text-slate-500">История оценок</p>
        </div>

        {/* Books / Films */}
        <div className="inline-flex w-fit rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => handleTabChange('books')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              isBooks ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            } `}
          >
            Книги
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('films')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              !isBooks ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            } `}
          >
            Фильмы
          </button>
        </div>
      </div>

      {/* Chart */}
      {chartItems.length > 0 ? (
        <RatingHistoryChart items={chartItems} />
      ) : (
        <div className="flex h-[360px] items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
          Пока нет оценок
        </div>
      )}

      {/* Footer */}
      {data.totalCount > 0 && (
        <div className="mt-6 flex flex-col items-center gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-between">
          <div className="text-sm text-slate-500">
            {from}–{to} из {data.totalCount}
          </div>

          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={handlePageChange}
            variant="onLight"
          />
        </div>
      )}
    </section>
  );
}
