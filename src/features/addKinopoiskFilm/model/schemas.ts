import z from 'zod';
import { GenreSchema } from '@/entities/films/model/Schemas';

export const KinopoiskFilmTypeSchema = z.enum([
  'FILM',
  'TV_SERIES',
  'MINI_SERIES',
  'VIDEO',
  'TV_SHOW',
]);

export const KinopoiskCountrySchema = z.object({
  country: z.string(),
});
export const KinopoiskProductionStatusSchema = z.enum([
  'FILMING',
  'PRE_PRODUCTION',
  'POST_PRODUCTION',
  'COMPLETED',
  'UNKNOWN',
  'ANNOUNCED',
]);

export const KinopoiskFilmSchema = z.object({
  kinopoiskId: z.number(),
  kinopoiskHDId: z.string().nullable(),
  imdbId: z.string().nullable(),

  nameRu: z.string(),
  nameEn: z.string().nullable(),
  nameOriginal: z.string().nullable(),

  posterUrl: z.string(),
  posterUrlPreview: z.string(),
  coverUrl: z.string().nullable(),
  logoUrl: z.string().nullable(),

  reviewsCount: z.number(),

  ratingGoodReview: z.number().nullable(),
  ratingGoodReviewVoteCount: z.number().nullable(),

  ratingKinopoisk: z.number().nullable(),
  ratingKinopoiskVoteCount: z.number().nullable(),

  ratingImdb: z.number().nullable(),
  ratingImdbVoteCount: z.number().nullable(),

  ratingFilmCritics: z.number().nullable(),
  ratingFilmCriticsVoteCount: z.number().nullable(),

  ratingAwait: z.number().nullable(),
  ratingAwaitCount: z.number().nullable(),

  ratingRfCritics: z.number().nullable(),
  ratingRfCriticsVoteCount: z.number().nullable(),

  webUrl: z.string(),

  year: z.number().nullable(),
  filmLength: z.number().nullable(),

  slogan: z.string().nullable(),
  description: z.string().nullable(),
  shortDescription: z.string().nullable(),
  editorAnnotation: z.string().nullable(),

  isTicketsAvailable: z.boolean(),

  productionStatus: KinopoiskProductionStatusSchema.nullable(),
  type: KinopoiskFilmTypeSchema,

  ratingMpaa: z.string().nullable(),
  ratingAgeLimits: z.string().nullable(),

  hasImax: z.boolean().nullable(),
  has3D: z.boolean().nullable(),

  lastSync: z.string(),

  countries: z.array(KinopoiskCountrySchema),
  genres: z.array(GenreSchema),

  startYear: z.number().nullable(),
  endYear: z.number().nullable(),

  serial: z.boolean().nullable(),
  shortFilm: z.boolean().nullable(),
  completed: z.boolean().nullable(),
});

/// апи v2.2

export const FilmSearchByKeywordSchema = z.object({
  filmId: z.number(),
  imdbId: z.string().nullable().optional(),

  nameRu: z.string().nullable(),
  nameEn: z.string().nullable().optional(),
  nameOriginal: z.string().nullable().optional(),

  countries: z.array(KinopoiskCountrySchema),
  genres: z.array(GenreSchema),

  rating: z.string().nullable().optional(),
  ratingImdb: z.number().nullable().optional(),
  year: z.string().nullable().optional(),

  type: KinopoiskFilmTypeSchema,

  posterUrl: z.string().url(),
  posterUrlPreview: z.string().url(),
});

export const FilmSearchByKeywordResponseSchema = z.object({
  keyword: z.string(),
  pagesCount: z.number(),
  films: z.array(FilmSearchByKeywordSchema),
  searchFilmsCountResult: z.number().nullable(),
});
