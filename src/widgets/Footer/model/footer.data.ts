export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  hideOnTablet?: boolean;
};

export type FooterSection = {
  name: string;
  links: FooterLink[];
};

export const footerSections: FooterSection[] = [
  {
    name: 'Разделы',
    links: [
      { label: 'Смотрильня', href: '/cinema' },
      { label: 'Читальня', href: '/library' },
    ],
  },
  {
    name: 'Важное',
    links: [
      { label: 'Пользовательское соглашение', href: '/terms' },
      { label: 'Политика конфиденциальности', href: '/privacy' },
    ],
  },

  {
    name: 'Контакты',
    links: [
      {
        label: 'Discord',
        href: 'https://discord.com',
        external: true,
      },
      {
        label: 'Telegram',
        href: 'https://t.me',
        external: true,
      },
      {
        label: 'Halva-povidlo@gmail.com',
        href: 'mailto:Halva-povidlo@gmail.com',
        external: true,
        hideOnTablet: true,
      },
    ],
  },
];
