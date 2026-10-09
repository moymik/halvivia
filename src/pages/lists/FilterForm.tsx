'use client';

import { useId } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { DbGenre, FilmFilterKey, FilmFilters } from '@/entities/films/model/types';
import { useListQuery } from '@/shared/lib/url/hooks';
import {
  FilterCheckboxList,
  FilterField,
  FilterInput,
  FilterPanel,
  FilterSelect,
} from '@/widgets/CatalogFilters';

type Props = {
  filters: FilmFilters;
  genres: DbGenre[];
};

const FILM_SORT_OPTIONS = [
  { value: 'newest', label: 'Новые' },
  { value: 'oldest', label: 'Старые' },
  { value: 'rating_desc', label: 'Рейтинг ↓' },
  { value: 'rating_asc', label: 'Рейтинг ↑' },
  { value: 'year_desc', label: 'Год ↓' },
  { value: 'year_asc', label: 'Год ↑' },
] as const;

// Тип задается пунктом бокового меню (?type=FILM), поэтому сброс фильтров его сохраняет.
const RESET_KEPT_KEYS = ['type'] as const satisfies readonly FilmFilterKey[];

export default function FilterForm({ filters, genres }: Props) {
  const id = useId();
  const { updateParam, toggleArrayParam, reset } = useListQuery<FilmFilterKey>();
  const debouncedUpdateParam = useDebouncedCallback((key: FilmFilterKey, value: string) => {
    updateParam(key, value);
  }, 1000);

  const genreOptions = genres.map((genre) => ({ value: genre.id, label: genre.name }));

  return (
    <FilterPanel
      onReset={() => {
        debouncedUpdateParam.cancel();
        reset(RESET_KEPT_KEYS);
      }}
    >
      <FilterInput
        withSearchIcon
        type="search"
        aria-label="Поиск по названию"
        defaultValue={filters.search ?? ''}
        placeholder="Поиск"
        onChange={(e) => debouncedUpdateParam('search', e.target.value)}
      />

      <FilterField label="Сортировка" htmlFor={`${id}-sort`}>
        <FilterSelect
          id={`${id}-sort`}
          options={FILM_SORT_OPTIONS}
          value={filters.sort}
          onChange={(e) => updateParam('sort', e.target.value)}
        />
      </FilterField>

      <FilterField label="Жанры">
        <FilterCheckboxList
          label="Жанры"
          options={genreOptions}
          isChecked={(genreId) => filters.genreIds?.includes(genreId) ?? false}
          onToggle={(genreId) => toggleArrayParam('genreIds', String(genreId))}
        />
      </FilterField>
    </FilterPanel>
  );
}
