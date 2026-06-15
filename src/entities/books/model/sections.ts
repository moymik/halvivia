import type { BookSection, BookSectionId } from './types';

export const BOOK_SECTIONS = [
  {
    id: 'fiction',
    label: 'Художественная литература',
    googleCategoryHints: ['fiction', 'literary', 'novel', 'роман', 'проза'],
  },
  {
    id: 'comics',
    label: 'Комиксы и манга',
    googleCategoryHints: ['comics', 'graphic novels', 'manga', 'манга', 'комикс'],
  },
  {
    id: 'nonfiction',
    label: 'Нон-фикшн',
    googleCategoryHints: ['self-help', 'psychology', 'business', 'history', 'science'],
  },
  {
    id: 'it-design',
    label: 'IT и дизайн',
    googleCategoryHints: ['computers', 'design', 'programming', 'technology'],
  },
  {
    id: 'classic',
    label: 'Классика',
    googleCategoryHints: ['classic', 'classics', 'literary collections'],
  },
] as const satisfies readonly BookSection[];

export const BOOK_SECTION_IDS = BOOK_SECTIONS.map((section) => section.id);

export function isBookSectionId(value: string): value is BookSectionId {
  return BOOK_SECTION_IDS.includes(value as BookSectionId);
}

export function suggestSections(categories: string[]): BookSectionId[] {
  const categoryText = categories.join(' ').toLowerCase();
  const matches = BOOK_SECTIONS.filter((section) =>
    section.googleCategoryHints.some((hint) => categoryText.includes(hint)),
  ).map((section) => section.id);

  return matches.length > 0 ? matches : ['fiction'];
}
