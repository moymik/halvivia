import { Film, FilmType } from '@/entities/films/model/types';
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

    type: getMappedType(film),

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

function getMappedType(film: KinopoiskFilm): FilmType {
  if (film.genres.some((item) => item.genre === 'аниме')) {
    return 'ANIME';
  }
  if (film.genres.some((item) => item.genre === 'мультфильм')) {
    return 'CARTOONS';
  }
  if (film.type === 'TV_SERIES' || film.type === 'MINI_SERIES') {
    return 'SERIES';
  }
  if (film.type === 'FILM') return 'FILM';
  return 'OTHERS';
}
