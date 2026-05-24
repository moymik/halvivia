import type { NavigationLink, ExternalHref } from './types';

export function isExternalHref(href: NavigationLink['href']): href is ExternalHref {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export function isExternalLink(link: NavigationLink) {
  return isExternalHref(link.href);
}
