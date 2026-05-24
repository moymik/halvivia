import { NavigationLink } from '@/shared/config/navigation';
import { navigationLinks } from '@/shared/config/navigation';
import { IconLinkProps } from '@/shared/ui/icon-link';

type FooterSectionId = 'sections' | 'important' | 'contacts';

export type FooterSection = {
  id: FooterSectionId;
  title: string;
  links: NavigationLink[];
};

export const socialLinks: IconLinkProps[] = [
  {
    link: navigationLinks.discord,
    icon: 'DiscordIcon',
  },

  {
    link: navigationLinks.telegram,
    icon: 'TelegramIcon',
  },
];

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
    links: [...socialLinks.map((SocialLink) => SocialLink.link)],
  },
] satisfies readonly FooterSection[];

export function isContactSection(section: Pick<FooterSection, 'id'>) {
  return section.id === 'contacts';
}
