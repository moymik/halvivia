import { z } from 'zod';

export const FilmTypeSchema = z.enum(['FILM', 'TV_SERIES', 'MINI_SERIES', 'VIDEO', 'TV_SHOW']);

export const GenreSchema = z.object({
  genre: z.string(),
});
