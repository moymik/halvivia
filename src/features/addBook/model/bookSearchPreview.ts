import type { BookSearchResultPreview, BookSectionId } from '@/entities/books/model/types';

export function getBookSubtitle(book: BookSearchResultPreview) {
  return [book.authors.join(', '), book.publishedDate].filter(Boolean).join(' · ');
}

export function getInitialSections(book: BookSearchResultPreview | null): BookSectionId[] {
  return book?.suggestedSectionIds.length ? book.suggestedSectionIds : ['fiction'];
}
