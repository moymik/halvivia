import { NavigationLink } from '@/shared/navigation';
import { navigationLinks } from '@/shared/navigation';

export type FooterNavigationLink = NavigationLink & {
  hidden?: {
    mobile?: boolean;
    tablet?: boolean;
    desktop?: boolean;
  };
};

export type FooterSectionId = 'sections' | 'important' | 'contacts';

export type FooterSection = {
  id: FooterSectionId;
  title: string;
  links: FooterNavigationLink[];
};

export const footerSections = [
  {
    id: 'sections',
    title: 'Разделы',
    links: [navigationLinks.cinema, navigationLinks.library],
  },
  {
    id: 'important',
    title: 'Важное',
    links: [navigationLinks.terms, navigationLinks.privacy],
  },

  {
    id: 'contacts',
    title: 'Контакты',
    links: [
      navigationLinks.discord,
      navigationLinks.telegram,
      { ...navigationLinks.email, hidden: { tablet: true } },
    ],
  },
] satisfies readonly FooterSection[];

export const footerSocialLinksWithImage = [
  {
    ...navigationLinks.discord,
    image: './discord_logo.svg',
    alt: 'discord link',
    imageWidth: 20,
    imageHeight: 17,
  },
  {
    ...navigationLinks.telegram,
    image: './telegram_logo.svg',
    alt: 'telegram link',
    imageWidth: 19,
    imageHeight: 17,
  },
];

export function isContactSection(section: Pick<FooterSection, 'id'>) {
  return section.id === 'contacts';
}
