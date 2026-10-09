'use client';

import type { GameListFilters } from '@/entities/games/model/schemas';
import { GAME_SORT_OPTIONS } from '@/entities/games/model/constants';
import { useListQuery } from '@/shared/lib/url/hooks';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/shared/ui/Input';

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
  const { updateParam, reset } = useListQuery<GameFilterKey>();

  const debouncedUpdate = useDebouncedCallback((key: GameFilterKey, value: string) => {
    updateParam(key, value);
  }, 1000);

  return (
    <aside className="bg-bg-surface text-text-primary border-border-default flex h-full flex-col gap-6 border-x px-6 py-10">
      <h2 className="text-xl font-bold">Фильтры</h2>

      {/* Поиск */}
      <div>
        <Input
          variant="dark"
          searchIcon="textEmpty"
          defaultValue={filters.search ?? ''}
          placeholder="Название игры"
          onChange={(event) => debouncedUpdate('search', event.target.value)}
        />
      </div>

      {/* Сортировка */}
      <div>
        <label htmlFor="game-sort">Сортировка</label>

        <select
          id="game-sort"
          className="bg-bg-base text-text-primary border-default w-full rounded-xl border p-2"
          value={filters.sort}
          onChange={(event) => updateParam('sort', event.target.value)}
        >
          {GAME_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Разработчик */}
      <div>
        <label htmlFor="game-developer">Разработчик</label>

        <Input
          id="game-developer"
          variant="dark"
          defaultValue={filters.developer ?? ''}
          placeholder="Например, Valve"
          onChange={(event) => debouncedUpdate('developer', event.target.value)}
        />
      </div>

      {/* Издатель */}
      <div>
        <label htmlFor="game-publisher">Издатель</label>

        <Input
          id="game-publisher"
          variant="dark"
          defaultValue={filters.publisher ?? ''}
          placeholder="Например, Devolver Digital"
          onChange={(event) => debouncedUpdate('publisher', event.target.value)}
        />
      </div>

      {/* Рейтинг пользователей */}
      <div>
        <label htmlFor="game-rating">Рейтинг пользователей от</label>

        <Input
          id="game-rating"
          variant="dark"
          type="number"
          min={0}
          max={10}
          step={0.1}
          defaultValue={filters.ratingFrom ?? ''}
          onChange={(event) => debouncedUpdate('ratingFrom', event.target.value)}
        />
      </div>

      {/* Оценка Steam */}
      <div>
        <label htmlFor="game-steam-score">Оценка Steam от</label>

        <Input
          id="game-steam-score"
          variant="dark"
          type="number"
          min={0}
          max={100}
          defaultValue={filters.steamScoreFrom ?? ''}
          onChange={(event) => debouncedUpdate('steamScoreFrom', event.target.value)}
        />
      </div>

      {/* Сброс */}
      <button type="button" className="rounded border p-2" onClick={reset}>
        Сбросить
      </button>
    </aside>
  );
}

export default GamesFilterForm;
