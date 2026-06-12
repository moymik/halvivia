import z from 'zod';
import { FilmTypeSchema, GenreSchema } from '@/entities/films/model/Schemas';

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
  type: FilmTypeSchema,

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

/// апи v2.1
export const KinopoiskSearchFilmSchema = z.object({
  filmId: z.number(),
  nameRu: z.string().nullable(),
  nameEn: z.string().nullable().optional(),
  type: FilmTypeSchema.optional(),
  year: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  filmLength: z.string().nullable().optional(),
  countries: z.array(KinopoiskCountrySchema).optional(),
  genres: z.array(GenreSchema).optional(),
  rating: z.string().nullable().optional(),
  ratingVoteCount: z.number().nullable().optional(),
  posterUrl: z.string().url().optional(),
  posterUrlPreview: z.string().url().optional(),
});
