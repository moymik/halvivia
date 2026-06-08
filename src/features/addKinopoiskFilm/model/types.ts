import {
  KinopoiskFilmSchema,
  KinopoiskCountrySchema,
} from '@/features/addKinopoiskFilm/model/schemas';
import { z } from 'zod';

export type KinopoiskFilm = z.infer<typeof KinopoiskFilmSchema>;
export type KinopoiskCountry = z.infer<typeof KinopoiskCountrySchema>;
