import { ROUTES } from './routes';
import type { NavigationLink } from './types';

export const NAVIGATION_LINKS = {
  home: {
    id: 'home',
    label: 'Home',
    href: ROUTES.HOME,
  },
  cinema: {
    id: 'cinema',
    label: 'Смотрильня',
    href: ROUTES.CINEMA,
  },

  library: {
    id: 'library',
    label: 'Читальня',
    href: ROUTES.LIBRARY,
  },

  terms: {
    id: 'terms',
    label: 'Пользовательское соглашение',
    href: ROUTES.TERMS,
  },

  privacy: {
    id: 'privacy',
    label: 'Политика конфиденциальности',
    href: ROUTES.PRIVACY,
  },

  email: {
    id: 'email',
    label: 'halva-povidlo@gmail.com',
    href: 'mailto:halva-povidlo@gmail.com',
  },

  discord: {
    id: 'discord',
    label: 'Discord',
    href: 'https://discord.com',
  },

  telegram: {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me',
  },
} as const satisfies Record<string, NavigationLink>;
