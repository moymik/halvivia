import { Film } from '@/entities/films/model/types';
import { KinopoiskFilm } from '@/features/addKinopoiskFilm/model/types';

export function mapKinopoiskFilmToFilm(film: KinopoiskFilm): Film {
  return {
    id: String(film.kinopoiskId), // если нет отдельного id — используем kinopoiskId
    kinopoiskId: film.kinopoiskId,
    kinopoiskHDId: film.kinopoiskHDId,
    imdbId: film.imdbId,

    nameRu: film.nameRu,
    nameEn: film.nameEn,
    nameOriginal: film.nameOriginal,

    posterUrl: film.posterUrl,
    posterUrlPreview: film.posterUrlPreview,

    ratingImdb: film.ratingImdb,
    ratingKinopoisk: film.ratingKinopoisk,

    webUrl: film.webUrl,

    year: film.year,
    filmLength: film.filmLength,

    slogan: film.slogan,
    description: film.description,

    type: film.type,

    ratingAgeLimits: film.ratingAgeLimits,

    lastSync: film.lastSync,

    //countries: film.countries,
    countries: film.countries.map((country) => country.country),
    genres: film.genres,

    startYear: film.startYear,
    endYear: film.endYear,

    serial: film.serial,
    shortFilm: film.shortFilm,
    completed: film.completed,
  };
}
