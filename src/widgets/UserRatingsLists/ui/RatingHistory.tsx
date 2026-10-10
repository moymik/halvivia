'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { RatingTable } from './RatingTable';

import {
  BookWithUserRating,
  FilmWithUserRating,
  GameWithUserRating,
  mapBooksToTableRows,
  mapFilmsToTableRows,
  mapGamesToTableRows,
  RatingSortBy,
  RatingTableRow,
  SortOrder,
} from '@/widgets/UserRatingsLists/model/types';
import { Pagination } from '@/shared/ui/pagination/pagination';

type Tab = 'books' | 'films' | 'games';

type RatingHistoryProps = {
  books: BookWithUserRating[];
  films: FilmWithUserRating[];
  games: GameWithUserRating[];

  booksPage: number;
  filmsPage: number;
  gamesPage: number;

  booksTotalCount: number;
  filmsTotalCount: number;
  gamesTotalCount: number;

  pageSize: number;
  sortBy: RatingSortBy;
  sortOrder: SortOrder;
};

const tabs: {
  id: Tab;
  label: string;
  pageKey: string;
}[] = [
  { id: 'films', label: 'Фильмы', pageKey: 'filmsPage' },
  { id: 'books', label: 'Книги', pageKey: 'booksPage' },
  { id: 'games', label: 'Игры', pageKey: 'gamesPage' },
];

export function RatingHistory({
  books,
  films,
  games,
  booksPage,
  filmsPage,
  gamesPage,
  booksTotalCount,
  filmsTotalCount,
  gamesTotalCount,
  pageSize,
  sortBy,
  sortOrder,
}: RatingHistoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<Tab>('films');

  const currentTab = tabs.find((item) => item.id === tab)!;

  const tabData = {
    books: {
      items: books,
      page: booksPage,
      totalCount: booksTotalCount,
    },
    films: {
      items: films,
      page: filmsPage,
      totalCount: filmsTotalCount,
    },
    games: {
      items: games,
      page: gamesPage,
      totalCount: gamesTotalCount,
    },
  }[tab];

  const tableItems: RatingTableRow[] =
    tab === 'books'
      ? mapBooksToTableRows(books)
      : tab === 'films'
        ? mapFilmsToTableRows(films)
        : mapGamesToTableRows(games);

  const totalPages = Math.ceil(tabData.totalCount / pageSize);

  const updateQueryParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');

    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleSortByChange = (value: RatingSortBy) => {
    updateQueryParams({
      sortBy: value,
      [currentTab.pageKey]: '1',
    });
  };

  const handleSortOrderChange = () => {
    updateQueryParams({
      sortOrder: sortOrder === 'desc' ? 'asc' : 'desc',
      [currentTab.pageKey]: '1',
    });
  };

  const handlePageChange = (page: number) => {
    updateQueryParams({
      [currentTab.pageKey]: String(page),
    });
  };

  const handleTabChange = (nextTab: Tab) => {
    setTab(nextTab);

    const nextTabConfig = tabs.find((item) => item.id === nextTab)!;

    // При переключении вкладки показываем первую страницу.
    updateQueryParams({
      [nextTabConfig.pageKey]: '1',
    });
  };

  return (
    <section className="w-full space-y-5 py-10">
      {/* Вкладки */}
      <div
        className="flex flex-wrap gap-2 border-b border-slate-200 pb-3"
        role="tablist"
        aria-label="Тип оценок"
      >
        {tabs.map((item) => {
          const isActive = tab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(item.id)}
              className={[
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none',
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
              ].join(' ')}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Сортировка */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Всего оценок: {tabData.totalCount}</p>

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="rating-sort-by" className="text-sm text-slate-600">
            Сортировать:
          </label>

          <select
            id="rating-sort-by"
            value={sortBy}
            onChange={(event) => handleSortByChange(event.target.value as RatingSortBy)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          >
            <option value="date">По дате</option>
            <option value="rating">По оценке</option>
          </select>

          <button
            type="button"
            onClick={handleSortOrderChange}
            aria-label={
              sortOrder === 'desc'
                ? 'Переключить на сортировку по возрастанию'
                : 'Переключить на сортировку по убыванию'
            }
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
          >
            <span aria-hidden="true">{sortOrder === 'desc' ? '↓' : '↑'}</span>
            {sortOrder === 'desc' ? 'По убыванию' : 'По возрастанию'}
          </button>
        </div>
      </div>

      {/* Таблица */}
      <div role="tabpanel">
        <RatingTable items={tableItems} />
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-2">
          <Pagination
            variant={'onLight'}
            page={tabData.page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
