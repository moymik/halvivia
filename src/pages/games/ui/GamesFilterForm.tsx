'use client';

import type { GameListFilters } from '@/entities/games/model/schemas';
import { GAME_SORT_OPTIONS } from '@/entities/games/model/constants';
import { useListQuery } from '@/shared/lib/url/hooks';
import { useDebouncedCallback } from 'use-debounce';

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

const inputClassName =
  'bg-bg-surface text-text-primary placeholder:text-text-muted w-full rounded border border-white/15 p-2';

export function GamesFilterForm({ filters }: Props) {
  const { updateParam, reset } = useListQuery<GameFilterKey>();
  const debouncedUpdate = useDebouncedCallback((key: GameFilterKey, value: string) => {
    updateParam(key, value);
  }, 500);

  return (
    <aside className="flex flex-col gap-6 rounded-lg border border-white/15 p-5">
      <h2 className="text-xl font-bold">Фильтры</h2>

      <div>
        <label htmlFor="game-search">Поиск</label>
        <input
          id="game-search"
          className={inputClassName}
          defaultValue={filters.search ?? ''}
          placeholder="Название игры"
          onChange={(event) => debouncedUpdate('search', event.target.value.trim())}
        />
      </div>

      <div>
        <label htmlFor="game-sort">Сортировка</label>
        <select
          id="game-sort"
          className={inputClassName}
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

      <div>
        <label htmlFor="game-developer">Разработчик</label>
        <input
          id="game-developer"
          className={inputClassName}
          defaultValue={filters.developer ?? ''}
          placeholder="Например, Valve"
          onChange={(event) => debouncedUpdate('developer', event.target.value.trim())}
        />
      </div>

      <div>
        <label htmlFor="game-publisher">Издатель</label>
        <input
          id="game-publisher"
          className={inputClassName}
          defaultValue={filters.publisher ?? ''}
          placeholder="Например, Devolver Digital"
          onChange={(event) => debouncedUpdate('publisher', event.target.value.trim())}
        />
      </div>

      <div>
        <label htmlFor="game-rating">Рейтинг пользователей от</label>
        <input
          id="game-rating"
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
        <label htmlFor="game-steam-score">Оценка Steam от</label>
        <input
          id="game-steam-score"
          className={inputClassName}
          type="number"
          min="0"
          max="100"
          defaultValue={filters.steamScoreFrom ?? ''}
          onChange={(event) => debouncedUpdate('steamScoreFrom', event.target.value)}
        />
      </div>

      <button type="button" className="rounded border border-white/30 p-2" onClick={reset}>
        Сбросить
      </button>
    </aside>
  );
}

export default GamesFilterForm;
