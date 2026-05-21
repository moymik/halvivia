import type { NavigationLink } from './types';

export const navigationLinks = {
  cinema: {
    label: 'Смотрильня',
    href: '/cinema',
  },

  library: {
    label: 'Читальня',
    href: '/library',
  },

  terms: {
    label: 'Пользовательское соглашение',
    href: '/terms',
  },

  privacy: {
    label: 'Политика конфиденциальности',
    href: '/privacy',
  },

  discord: {
    label: 'Discord',
    href: 'https://discord.com',
  },

  telegram: {
    label: 'Telegram',
    href: 'https://t.me',
  },

  email: {
    label: 'Halva-povidlo@gmail.com',
    href: 'mailto:Halva-povidlo@gmail.com',
  },
} as const satisfies Record<string, NavigationLink>;

export function isExternalLink(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:');
}
