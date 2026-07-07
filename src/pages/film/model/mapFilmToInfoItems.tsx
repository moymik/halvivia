import { Film } from '@/entities/films/model/types';
import { InfoItem } from '@/pages/film/ui/Info';
import { Genre } from '@/entities/films/model/types';
import KinopoiskLogo from '@/shared/assets/kinopoisk-logo.svg';
export function formatGenres(genres: Genre[]) {
  return genres.map((g) => g.genre).join(', ');
}

export function mapFilmToInfoItems(film: Film): InfoItem[] {
  return [
    {
      label: 'Страна',
      value: film.countries?.join(', ') ?? '',
    },

    film.genres?.length
      ? {
          label: 'Жанр',
          value: formatGenres(film.genres),
        }
      : null,

    film.filmLength !== null
      ? {
          label: 'Продолжительность',
          value: `${film.filmLength} мин`,
        }
      : null,

    {
      label: 'Ссылки',
      value: film.ratingKinopoisk ?? '',
      href: film.webUrl,
      render: () => (
        <a
          href={film.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <KinopoiskLogo className={'inline'} />
          {film.ratingKinopoisk ?? ''}
        </a>
      ),
    },

    film.slogan
      ? {
          label: 'Слоган',
          value: film.slogan,
        }
      : null,
  ].filter(Boolean) as InfoItem[];
}
