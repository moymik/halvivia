import { getBooksBySection, getRecentBooks } from '@/entities/books/api/db';
import { BOOK_SECTIONS } from '@/entities/books/model/sections';
import type { Book } from '@/entities/books/model/types';
import { verifySession } from '@/shared/lib/auth';
import { RECENT_BOOKS_LIMIT, SECTION_BOOKS_LIMIT, SECTION_BOOKS_QUERY_LIMIT } from './constants';

export type LibraryShelfViewModel = {
  id: string;
  title: string;
  books: Book[];
};

export type LibraryPageViewModel = {
  recentBooks: Book[];
  plannedBooks: Book[];
  sectionShelves: LibraryShelfViewModel[];
  canAddBooks: boolean;
};

export async function getLibraryPageViewModel(): Promise<LibraryPageViewModel> {
  const [recentBooks, sectionBooks, session] = await Promise.all([
    getRecentBooks(RECENT_BOOKS_LIMIT),
    Promise.all(
      BOOK_SECTIONS.map(async (section) => ({
        section,
        books: await getBooksBySection(section.id, SECTION_BOOKS_QUERY_LIMIT),
      })),
    ),
    verifySession(),
  ]);

  const sectionShelves = sectionBooks.map(({ section, books }) => ({
    id: section.id,
    title: section.label,
    books: books.slice(0, SECTION_BOOKS_LIMIT),
  }));

  return {
    recentBooks,
    plannedBooks: [],
    sectionShelves,
    canAddBooks: session.status !== 'unauthenticated' && session.payload.role === 'MEMBER',
  };
}
