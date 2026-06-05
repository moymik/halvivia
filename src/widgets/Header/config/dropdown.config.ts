import { type NavigationLink, NAVIGATION_LINKS } from 'src/shared/config';
import { IconName } from '@/shared/ui/icon/Icon';

type DropdownLink = {
  link: NavigationLink;
  iconName: IconName;
};

export const dropdownLinks = [
  { link: NAVIGATION_LINKS.PROFILE, iconName: 'LogoIcon' },
  // {link:NAVIGATION_LINKS.REVIEWS, iconName: 'VIEWS' },
  // NAVIGATION_LINKS.DOWNLOADS,
] as const satisfies readonly DropdownLink[];
