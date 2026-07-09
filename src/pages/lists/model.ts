import { FilmFiltersSchema } from '@/entities/films/model/Schemas';

type SearchParams = Record<string, string | string[] | undefined>;

export function parseFilmFiltersFromSearchParams(params: SearchParams) {
  return FilmFiltersSchema.parse({
    search: typeof params.search === 'string' ? params.search : undefined,

    page: typeof params.page === 'string' ? Number(params.page) : undefined,

    limit: typeof params.limit === 'string' ? Number(params.limit) : 48,

    sort: typeof params.sort === 'string' ? params.sort : undefined,

    serial: typeof params.serial === 'string' ? params.serial === 'true' : undefined,

    type: typeof params.type === 'string' ? params.type.split(',') : undefined,

    yearFrom: typeof params.yearFrom === 'string' ? Number(params.yearFrom) : undefined,

    yearTo: typeof params.yearTo === 'string' ? Number(params.yearTo) : undefined,

    genreIds:
      typeof params.genreIds === 'string' ? params.genreIds.split(',').map(Number) : undefined,
  });
}
