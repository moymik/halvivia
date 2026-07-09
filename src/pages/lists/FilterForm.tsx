'use client';

import { DbGenre, FilmFilterKey, FilmFilters } from '@/entities/films/model/types';

import { FILM_TYPE_OPTIONS } from '@/entities/films/model/constants';
import { useListQuery } from '@/shared/lib/url/hooks';

type Props = {
  filters: FilmFilters;
  genres: DbGenre[];
};

export default function FilterForm({ filters, genres }: Props) {
  const { updateParam, toggleArrayParam, reset } = useListQuery<FilmFilterKey>();
  return (
    <aside className="flex flex-col gap-6 rounded-lg border p-5">
      <h2 className="text-xl font-bold">Фильтры</h2>

      {/* Поиск */}
      <div>
        <label>Поиск</label>

        <input
          className="w-full border p-2"
          defaultValue={filters.search ?? ''}
          placeholder="Название фильма"
          onChange={(e) => updateParam('search', e.target.value)}
        />
      </div>

      {/* Сортировка */}
      <div>
        <label>Сортировка</label>

        <select
          className="w-full border p-2"
          value={filters.sort}
          onChange={(e) => updateParam('sort', e.target.value)}
        >
          <option value="newest">Новые</option>
          <option value="oldest">Старые</option>
          <option value="year_desc">Год ↓</option>
          <option value="year_asc">Год ↑</option>
        </select>
      </div>

      {/* Количество */}
      <div>
        <label>На странице</label>

        <select
          className="border p-2"
          value={filters.limit}
          onChange={(e) => updateParam('limit', e.target.value)}
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>

      {/* Тип */}
      <div>
        <label>Тип</label>

        <div className="flex flex-col gap-2">
          {FILM_TYPE_OPTIONS.map((type) => (
            <label key={type.value}>
              <input
                type="checkbox"
                checked={filters.type?.includes(type.value) ?? false}
                onChange={() => toggleArrayParam('type', type.value)}
              />{' '}
              {type.label}
            </label>
          ))}
        </div>
      </div>

      {/* Годы */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="От"
          className="w-1/2 border p-2"
          defaultValue={filters.yearFrom ?? ''}
          onBlur={(e) => updateParam('yearFrom', e.target.value)}
        />

        <input
          type="number"
          placeholder="До"
          className="w-1/2 border p-2"
          defaultValue={filters.yearTo ?? ''}
          onBlur={(e) => updateParam('yearTo', e.target.value)}
        />
      </div>

      {/* Сериал */}
      <div>
        <label>Сериал</label>

        <select
          className="w-full border p-2"
          value={filters.serial === undefined ? '' : String(filters.serial)}
          onChange={(e) => updateParam('serial', e.target.value)}
        >
          <option value="">Все</option>
          <option value="true">Только сериалы</option>
          <option value="false">Только фильмы</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block">Жанры</label>

        <div className="max-h-64 overflow-y-auto rounded border p-2">
          {genres.map((genre) => (
            <label key={genre.id} className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                checked={filters.genreIds?.includes(genre.id) ?? false}
                onChange={() => toggleArrayParam('genreIds', String(genre.id))}
              />

              {genre.name}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="rounded border p-2"
        onClick={() => {
          reset();
        }}
      >
        Сбросить
      </button>
    </aside>
  );
}
