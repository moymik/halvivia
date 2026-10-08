'use client';

import type { BookListFilters } from '@/pages/library/model/searchParams';
import { BOOK_SORT_OPTIONS } from '@/pages/library/model/searchParams';
import { useListQuery } from '@/shared/lib/url/hooks';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  filters: BookListFilters;
  categories: string[];
};

type BookFilterKey =
  | 'search'
  | 'sort'
  | 'author'
  | 'publisher'
  | 'language'
  | 'ratingFrom'
  | 'category';

const inputClassName =
  'bg-bg-surface text-text-primary placeholder:text-text-muted w-full rounded border border-white/15 p-2';

export function BookFilterForm({ filters, categories }: Props) {
  const { updateParam, toggleArrayParam, reset } = useListQuery<BookFilterKey>();
  const debouncedUpdate = useDebouncedCallback((key: BookFilterKey, value: string) => {
    updateParam(key, value);
  }, 500);

  return (
    <aside className="flex flex-col gap-6 rounded-lg border border-white/15 p-5">
      <h2 className="text-xl font-bold">Фильтры</h2>

      <div>
        <label htmlFor="book-search">Поиск</label>
        <input
          id="book-search"
          className={inputClassName}
          defaultValue={filters.search ?? ''}
          placeholder="Название книги"
          onChange={(event) => debouncedUpdate('search', event.target.value.trim())}
        />
      </div>

      <div>
        <label htmlFor="book-sort">Сортировка</label>
        <select
          id="book-sort"
          className={inputClassName}
          value={filters.sort}
          onChange={(event) => updateParam('sort', event.target.value)}
        >
          {BOOK_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="book-author">Автор</label>
        <input
          id="book-author"
          className={inputClassName}
          defaultValue={filters.author ?? ''}
          placeholder="Например, Терри Пратчетт"
          onChange={(event) => debouncedUpdate('author', event.target.value.trim())}
        />
      </div>

      <div>
        <label htmlFor="book-publisher">Издатель</label>
        <input
          id="book-publisher"
          className={inputClassName}
          defaultValue={filters.publisher ?? ''}
          placeholder="Название издателя"
          onChange={(event) => debouncedUpdate('publisher', event.target.value.trim())}
        />
      </div>

      <div>
        <label htmlFor="book-language">Язык</label>
        <input
          id="book-language"
          className={inputClassName}
          defaultValue={filters.language ?? ''}
          placeholder="Например, ru"
          onChange={(event) => debouncedUpdate('language', event.target.value.trim())}
        />
      </div>

      <div>
        <label htmlFor="book-rating">Рейтинг пользователей от</label>
        <input
          id="book-rating"
          className={inputClassName}
          type="number"
          min="0"
          max="10"
          step="0.1"
          defaultValue={filters.ratingFrom ?? ''}
          onChange={(event) => debouncedUpdate('ratingFrom', event.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block">Категории</label>
        <div className="max-h-64 overflow-y-auto rounded border border-white/15 p-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                checked={filters.category?.includes(category) ?? false}
                onChange={() => toggleArrayParam('category', category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <button type="button" className="rounded border border-white/30 p-2" onClick={reset}>
        Сбросить
      </button>
    </aside>
  );
}

export default BookFilterForm;
