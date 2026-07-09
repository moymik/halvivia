import { FilmType } from '@/entities/films/model/types';

export const INITIAL_FILM_SECTIONS: {
  type: FilmType;
  label: string;
  href: string;
  key: 'filmCards' | 'seriesCards' | 'animeCards' | 'cartoonCards';
}[] = [
  {
    type: 'FILM',
    label: 'Фильмы',
    href: '/cinema/lists?type=FILM',
    key: 'filmCards',
  },
  {
    type: 'SERIES',
    label: 'Сериалы',
    href: '/cinema/lists?type=SERIES',
    key: 'seriesCards',
  },
  {
    type: 'ANIME',
    label: 'Аниме',
    href: '/cinema/lists?type=ANIME',
    key: 'animeCards',
  },
  {
    type: 'CARTOON',
    label: 'Мультфильмы',
    href: '/cinema/lists?type=CARTOON',
    key: 'cartoonCards',
  },
];
