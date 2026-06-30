import { z } from 'zod';

export const FilmTypeSchema = z.enum(['FILM', 'SERIES', 'ANIME', 'CARTOON', 'OTHERS']);

export const GenreSchema = z.object({
  genre: z.string(),
});
