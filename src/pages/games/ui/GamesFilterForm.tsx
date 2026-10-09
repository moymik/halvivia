'use client';

import { useId } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type { GameListFilters } from '@/entities/games/model/schemas';
import { GAME_SORT_OPTIONS } from '@/entities/games/model/constants';
import { useListQuery } from '@/shared/lib/url/hooks';
import { FilterField, FilterInput, FilterPanel, FilterSelect } from '@/widgets/CatalogFilters';

type Props = {
  filters: GameListFilters;
};

type GameFilterKey =
  | 'search'
  | 'sort'
  | 'developer'
  | 'publisher'
  | 'ratingFrom'
  | 'steamScoreFrom';

export function GamesFilterForm({ filters }: Props) {
  const id = useId();
  const { updateParam, reset } = useListQuery<GameFilterKey>();

  const debouncedUpdate = useDebouncedCallback((key: GameFilterKey, value: string) => {
    updateParam(key, value);
  }, 1000);

  return (
    <FilterPanel
      onReset={() => {
        debouncedUpdate.cancel();
        reset();
      }}
    >
      <FilterInput
        withSearchIcon
        type="search"
        aria-label="Поиск по названию игры"
        defaultValue={filters.search ?? ''}
        placeholder="Поиск"
        onChange={(event) => debouncedUpdate('search', event.target.value)}
      />

      <FilterField label="Сортировка" htmlFor={`${id}-sort`}>
        <FilterSelect
          id={`${id}-sort`}
          options={GAME_SORT_OPTIONS}
          value={filters.sort}
          onChange={(event) => updateParam('sort', event.target.value)}
        />
      </FilterField>

      <FilterField label="Разработчик" htmlFor={`${id}-developer`}>
        <FilterInput
          id={`${id}-developer`}
          defaultValue={filters.developer ?? ''}
          placeholder="Например, Valve"
          onChange={(event) => debouncedUpdate('developer', event.target.value)}
        />
      </FilterField>

      <FilterField label="Издатель" htmlFor={`${id}-publisher`}>
        <FilterInput
          id={`${id}-publisher`}
          defaultValue={filters.publisher ?? ''}
          placeholder="Например, Devolver Digital"
          onChange={(event) => debouncedUpdate('publisher', event.target.value)}
        />
      </FilterField>

      <FilterField label="Рейтинг пользователей от" htmlFor={`${id}-rating`}>
        <FilterInput
          id={`${id}-rating`}
          type="number"
          min={0}
          max={10}
          step={0.1}
          defaultValue={filters.ratingFrom ?? ''}
          onChange={(event) => debouncedUpdate('ratingFrom', event.target.value)}
        />
      </FilterField>

      <FilterField label="Оценка Steam от" htmlFor={`${id}-steam-score`}>
        <FilterInput
          id={`${id}-steam-score`}
          type="number"
          min={0}
          max={100}
          defaultValue={filters.steamScoreFrom ?? ''}
          onChange={(event) => debouncedUpdate('steamScoreFrom', event.target.value)}
        />
      </FilterField>
    </FilterPanel>
  );
}

export default GamesFilterForm;
