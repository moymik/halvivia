import HeroSection from '@/pages/film/HeroSection';
import { Film } from '@/entities/films/model/types';
import { getFilmByIdAction } from '@/entities/films/api/actions';

export type FilmPageProps = {
  params: Promise<{
    id: string;
  }>;
};
/*
export function generateStaticParams() {
  return [{ id: 'db09b127-557d-476f-a05e-45ac9dca1b75' }];
}
*/

const film = {
  id: 'db09b127-557d-476f-a05e-45ac9dca1b75',
  kinopoiskId: 283290,
  kinopoiskHDId: null,
  imdbId: 'tt0409591',
  nameRu: 'Наруто',
  nameEn: null,
  nameOriginal: 'Naruto',
  posterUrl: '/posters/283290_J5I1oiACe',
  posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/283290.jpg',
  ratingImdb: '8.4',
  ratingKinopoisk: '7.8',
  webUrl: 'https://www.kinopoisk.ru/film/283290/',
  year: 2002,
  filmLength: null,
  slogan: 'The power of the Nine-Tailed Fox... unleashed!',
  description:
    'Однажды демон напал на деревню, в которой родился мальчик Наруто. Чтобы остановить демона, глава поселения запечатал его внутри Наруто, но сам при этом погиб. Прошли годы. Наруто вырос, став неусидчивым и пока неопытным ниндзя. Он всё ещё живёт в родной деревне, где его не принимают и стараются избегать.',
  type: 'TV_SERIES',
  ratingAgeLimits: 'age12',
  lastSync: '2026-05-28T09:45:27.740Z',
  countries: ['Япония'],
  genres: [
    {
      genre: 'боевик',
    },
    {
      genre: 'фэнтези',
    },
    {
      genre: 'комедия',
    },
    {
      genre: 'мультфильм',
    },
    {
      genre: 'аниме',
    },
  ],
  startYear: 2002,
  endYear: 2007,
  serial: true,
  shortFilm: false,
  completed: true,
};

export async function FilmPage({ params }: FilmPageProps) {
  const { id } = await params;
  const film = await getFilmByIdAction(id);

  //console.log(resolvedParams);
  return (
    <div className={'flex h-fit'}>
      <HeroSection film={film as Film} />
    </div>
  );
}

/*
{
  "id": "db09b127-557d-476f-a05e-45ac9dca1b75",
  "kinopoiskId": 283290,
  "kinopoiskHDId": null,
  "imdbId": "tt0409591",
  "nameRu": "Наруто",
  "nameEn": null,
  "nameOriginal": "Naruto",
  "posterUrl": "/posters/283290_J5I1oiACe",
  "posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/283290.jpg",
  "ratingImdb": "8.4",
  "ratingKinopoisk": "7.8",
  "webUrl": "https://www.kinopoisk.ru/film/283290/",
  "year": 2002,
  "filmLength": null,
  "slogan": "The power of the Nine-Tailed Fox... unleashed!",
  "description": "Однажды демон напал на деревню, в которой родился мальчик Наруто. Чтобы остановить демона, глава поселения запечатал его внутри Наруто, но сам при этом погиб. Прошли годы. Наруто вырос, став неусидчивым и пока неопытным ниндзя. Он всё ещё живёт в родной деревне, где его не принимают и стараются избегать.",
  "type": "TV_SERIES",
  "ratingAgeLimits": "age12",
  "lastSync": "2026-05-28T09:45:27.740Z",
  "countries": [
  "Япония"
],
  "genres": [
  {
    "genre": "боевик"
  },
  {
    "genre": "фэнтези"
  },
  {
    "genre": "комедия"
  },
  {
    "genre": "мультфильм"
  },
  {
    "genre": "аниме"
  }
],
  "startYear": 2002,
  "endYear": 2007,
  "serial": true,
  "shortFilm": false,
  "completed": true
}
*/
