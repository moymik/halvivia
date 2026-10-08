import { ROUTES } from '@/shared/config';

import BookIcon from '@/shared/assets/books.svg';
import GameIcon from '@/shared/assets/games.svg';
import FilmIcon from '@/shared/assets/films.svg';

type MenuItem = {
  title: string;
  href: string;
  matchSearch?: boolean;
};

export type MenuSection = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  href: string;
  items: MenuItem[];
};

export const menuSections: MenuSection[] = [
  {
    icon: FilmIcon,
    title: 'Кино',
    href: ROUTES.CINEMA,
    items: [
      {
        title: 'Все',
        href: ROUTES.CINEMA,
        matchSearch: true,
      },
      {
        title: 'Фильмы',
        href: ROUTES.CINEMA + '?type=FILM',
      },
      {
        title: 'Сериалы',
        href: ROUTES.CINEMA + '?type=SERIES',
      },
      {
        title: 'Аниме',
        href: ROUTES.CINEMA + '?type=ANIME',
      },
      {
        title: 'Мультфильмы',
        href: ROUTES.CINEMA + '?type=CARTOON',
      },
    ],
  },
  {
    icon: BookIcon,
    title: 'Книги',
    href: ROUTES.LIBRARY,
    items: [
      {
        title: 'Все книги',
        href: ROUTES.LIBRARY,
        matchSearch: true,
      },
      {
        title: 'Художественная литература',
        href: ROUTES.LIBRARY + '?section=fiction',
      },
      {
        title: 'Комиксы и манга',
        href: ROUTES.LIBRARY + '?section=comics',
      },
      {
        title: 'Нон-фикшн',
        href: ROUTES.LIBRARY + '?section=nonfiction',
      },
      {
        title: 'IT и дизайн',
        href: ROUTES.LIBRARY + '?section=it-design',
      },
      {
        title: 'Классика',
        href: ROUTES.LIBRARY + '?section=classic',
      },
    ],
  },
  {
    icon: GameIcon,
    title: 'Игры',
    href: ROUTES.GAMES,
    items: [
      {
        title: 'Все игры',
        href: ROUTES.GAMES,
      },
    ],
  },
];
