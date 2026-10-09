import type { ReadonlyURLSearchParams } from 'next/navigation';

import { type MenuSection, menuSections } from '@/widgets/Header/model/burgerMenu.config';

export function isCurrentMenuSection(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isCurrentMenuItem(
  href: string,
  matchSearch: boolean | undefined,
  pathname: string,
  searchParams: ReadonlyURLSearchParams | null,
) {
  const [itemPathname, itemQuery = ''] = href.split('?');
  if (pathname !== itemPathname) {
    return false;
  }
  const expectedParams = new URLSearchParams(itemQuery);
  if (expectedParams.size === 0) {
    return !matchSearch || !searchParams || searchParams.size === 0;
  }
  if (!searchParams) {
    return false;
  }
  return [...expectedParams.entries()].every(([key, value]) => searchParams.get(key) === value);
}

export function findCurrentMenuLocation(
  pathname: string,
  searchParams: ReadonlyURLSearchParams | null,
): { section: MenuSection; item: MenuSection['items'][number] | null } | null {
  const section = menuSections.find((s) => isCurrentMenuSection(s.href, pathname));
  if (!section) {
    return null;
  }
  const item =
    section.items.find((i) => isCurrentMenuItem(i.href, i.matchSearch, pathname, searchParams)) ??
    null;
  return { section, item };
}
