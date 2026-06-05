import { type NavigationLink, NAVIGATION_LINKS } from 'src/shared/config';
import { IconName } from '@/shared/ui/icon/Icon';

type DropdownLink = {
  link: NavigationLink;
  iconName: IconName;
};

export const dropdownLinks = [
  { link: NAVIGATION_LINKS.PROFILE, iconName: 'ProfileIcon' },
  { link: NAVIGATION_LINKS.REVIEWS, iconName: 'StarIcon' },
  { link: NAVIGATION_LINKS.DOWNLOADS, iconName: 'DownloadIcon' },
] as const satisfies readonly DropdownLink[];
