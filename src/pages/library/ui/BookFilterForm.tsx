'use client';

import type { BookListFilters, BookSort } from '@/pages/library/model/searchParams';
import { BOOK_SORT_OPTIONS } from '@/pages/library/model/searchParams';
import { BOOK_SECTIONS } from '@/entities/books/model/sections';
import { useListQuery } from '@/shared/lib/url/hooks';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/shared/ui/Input';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

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
  | 'category'
  | 'section';

export function BookFilterForm({ filters, categories }: Props) {
  const { updateParam, toggleArrayParam, reset } = useListQuery<BookFilterKey>();

  const debouncedUpdate = useDebouncedCallback((key: BookFilterKey, value: string) => {
    updateParam(key, value);
  }, 1000);

  const allSectionsSelected = filters.section?.length === BOOK_SECTIONS.length;

  function handleToggleAllSections() {
    if (allSectionsSelected) {
      updateParam('section', '');
      return;
    }

    updateParam('section', BOOK_SECTIONS.map((section) => section.id).join(','));
  }

  return (
    <aside className="bg-bg-surface text-text-primary border-border-default flex h-full flex-col gap-6 border-x px-6 py-10">
      <h2 className="text-xl font-bold">Фильтры</h2>

      {/* Поиск */}
      <div>
        <Input
          variant="dark"
          searchIcon="textEmpty"
          defaultValue={filters.search ?? ''}
          placeholder="Название книги"
          onChange={(event) => debouncedUpdate('search', event.target.value)}
        />
      </div>

      {/* Сортировка */}
      <div>
        <label htmlFor="book-sort">Сортировка</label>

        <select
          id="book-sort"
          className="bg-bg-base text-text-primary border-default w-full rounded-xl border p-2"
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

      {/* Разделы книг */}
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block font-medium">Разделы книг</label>

          <button
            type="button"
            className="text-text-muted hover:text-text-primary text-xs underline"
            onClick={handleToggleAllSections}
          >
            {allSectionsSelected ? 'Снять все' : 'Выбрать все'}
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto rounded border p-2">
          {BOOK_SECTIONS.map((section) => (
            <label key={section.id} className="flex cursor-pointer items-center gap-2 py-1">
              <Checkbox
                checked={filters.section?.includes(section.id) ?? false}
                onCheckedChange={() => toggleArrayParam('section', section.id)}
              />

              <span>{section.label}</span>
            </label>
          ))}
        </div>

        <p className="text-text-muted mt-2 text-xs">Можно выбрать один или несколько разделов.</p>
      </div>

      {/* Автор */}
      <div>
        <label htmlFor="book-author">Автор</label>

        <Input
          id="book-author"
          variant="dark"
          defaultValue={filters.author ?? ''}
          placeholder="Например, Терри Пратчетт"
          onChange={(event) => debouncedUpdate('author', event.target.value)}
        />
      </div>

      {/* Издатель */}
      <div>
        <label htmlFor="book-publisher">Издатель</label>

        <Input
          id="book-publisher"
          variant="dark"
          defaultValue={filters.publisher ?? ''}
          placeholder="Название издателя"
          onChange={(event) => debouncedUpdate('publisher', event.target.value)}
        />
      </div>

      {/* Язык */}
      <div>
        <label htmlFor="book-language">Язык</label>

        <Input
          id="book-language"
          variant="dark"
          defaultValue={filters.language ?? ''}
          placeholder="Например, ru"
          onChange={(event) => debouncedUpdate('language', event.target.value)}
        />
      </div>

      {/* Рейтинг */}
      <div>
        <label htmlFor="book-rating">Рейтинг пользователей от</label>

        <Input
          id="book-rating"
          variant="dark"
          type="number"
          min={0}
          max={10}
          step={0.1}
          defaultValue={filters.ratingFrom ?? ''}
          onChange={(event) => debouncedUpdate('ratingFrom', event.target.value)}
        />
      </div>

      {/* Категории */}
      <div>
        <label className="mb-2 block">Категории</label>

        <div className="max-h-64 overflow-y-auto rounded border p-2">
          {categories.map((category) => (
            <label key={category} className="flex cursor-pointer items-center gap-2 py-1">
              <Checkbox
                checked={filters.category?.includes(category) ?? false}
                onCheckedChange={() => toggleArrayParam('category', category)}
              />

              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Сброс */}
      <button type="button" className="rounded border p-2" onClick={reset}>
        Сбросить
      </button>
    </aside>
  );
}

export default BookFilterForm;
