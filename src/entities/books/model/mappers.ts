import type { Book, BookExternalRating, BookSectionId } from './types';

type DbBook = {
  id: string;
  google_books_id: string | null;
  open_library_key: string | null;
  title: string;
  subtitle: string | null;
  authors: string[] | null;
  description: string | null;
  published_date: string | null;
  publisher: string | null;
  page_count: number | null;
  language: string | null;
  maturity_rating: string | null;
  info_link: string | null;
  preview_link: string | null;
  canonical_volume_link: string | null;
  thumbnail_url: string | null;
  categories: string[] | null;
  section_ids: BookSectionId[] | null;
  external_ratings: BookExternalRating[] | null;
  created_by_user_id: string | null;
  created_at: string | Date;
};

export function mapDbBook(row: DbBook): Book {
  return {
    id: row.id,
    googleBooksId: row.google_books_id,
    openLibraryKey: row.open_library_key,
    title: row.title,
    subtitle: row.subtitle,
    authors: row.authors ?? [],
    description: row.description,
    publishedDate: row.published_date,
    publisher: row.publisher,
    pageCount: row.page_count,
    language: row.language,
    maturityRating: row.maturity_rating,
    infoLink: row.info_link,
    previewLink: row.preview_link,
    canonicalVolumeLink: row.canonical_volume_link,
    thumbnailUrl: row.thumbnail_url,
    categories: row.categories ?? [],
    sectionIds: row.section_ids ?? [],
    externalRatings: row.external_ratings ?? [],
    createdByUserId: row.created_by_user_id,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
  };
}
