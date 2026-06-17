import {
  KinopoiskFilmSchema,
  KinopoiskCountrySchema,
  FilmSearchByKeywordSchema,
  FilmSearchByKeywordResponseSchema,
} from '@/features/addKinopoiskFilm/model/schemas';
import { z } from 'zod';

export type KinopoiskFilm = z.infer<typeof KinopoiskFilmSchema>;
export type KinopoiskCountry = z.infer<typeof KinopoiskCountrySchema>;

export type FilmSearchByKeywordItem = z.infer<typeof FilmSearchByKeywordSchema>;

export type FilmSearchByKeywordResponse = z.infer<typeof FilmSearchByKeywordResponseSchema>;
