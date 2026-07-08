import { z } from 'zod';
import { FILM_SORT_MAP, FILM_TYPES } from '@/entities/films/model/constants';

export const FilmTypeSchema = z.enum(FILM_TYPES);

export const GenreSchema = z.object({
  genre: z.string(),
});

export const FilmFiltersSchema = z
  .object({
    search: z.string().trim().min(1).optional(),

    type: z.array(FilmTypeSchema).optional(),

    yearFrom: z.number().int().min(1800).optional(),

    yearTo: z
      .number()
      .int()
      .max(new Date().getFullYear() + 5)
      .optional(),

    countries: z.array(z.string()).optional(),

    serial: z.boolean().optional(),

    shortFilm: z.boolean().optional(),

    completed: z.boolean().optional(),

    ratingAgeLimits: z.array(z.string()).optional(),

    ratingKinopoiskFrom: z.number().min(0).max(10).optional(),

    ratingImdbFrom: z.number().min(0).max(10).optional(),

    sort: z.enum(['newest', 'oldest', 'year_desc', 'year_asc']).default('newest'),

    page: z.number().int().positive().default(1),

    limit: z.number().int().min(1).max(100).default(24),

    genreIds: z.array(z.number()).optional(),
  })
  .refine(
    (data) =>
      data.yearFrom === undefined || data.yearTo === undefined || data.yearFrom <= data.yearTo,
    {
      message: 'yearFrom cannot be greater than yearTo',
      path: ['yearFrom'],
    },
  );

export const FilmSortSchema = z.enum(
  Object.keys(FILM_SORT_MAP) as [keyof typeof FILM_SORT_MAP, ...(keyof typeof FILM_SORT_MAP)[]],
);
