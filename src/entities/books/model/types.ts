export type BookSectionId = 'fiction' | 'comics' | 'nonfiction' | 'it-design' | 'classic';

export type BookSection = {
  id: BookSectionId;
  label: string;
  googleCategoryHints: string[];
};

export type BookExternalRating = {
  source: 'google-books' | 'open-library';
  label: string;
  value: number;
  votesCount?: number | null;
  url?: string | null;
};

export type Book = {
  id: string;
  googleBooksId: string | null;
  openLibraryKey: string | null;
  title: string;
  subtitle: string | null;
  authors: string[];
  description: string | null;
  publishedDate: string | null;
  publisher: string | null;
  pageCount: number | null;
  language: string | null;
  maturityRating: string | null;
  infoLink: string | null;
  previewLink: string | null;
  canonicalVolumeLink: string | null;
  thumbnailUrl: string | null;
  categories: string[];
  sectionIds: BookSectionId[];
  externalRatings: BookExternalRating[];
  createdByUserId: string | null;
  createdAt: string;
};

export type BookExternalSource = 'google-books' | 'open-library';

export type BookSearchResult = {
  externalId: string;
  source: BookExternalSource;
  googleBooksId?: string | null;
  openLibraryKey?: string | null;
  title: string;
  subtitle?: string | null;
  authors: string[];
  description?: string | null;
  publishedDate?: string | null;
  publisher?: string | null;
  pageCount?: number | null;
  language?: string | null;
  maturityRating?: string | null;
  infoLink?: string | null;
  previewLink?: string | null;
  canonicalVolumeLink?: string | null;
  thumbnailUrl?: string | null;
  categories: string[];
  externalRatings: BookExternalRating[];
  suggestedSectionIds: BookSectionId[];
  rawData: unknown;
};

export type BookSearchResultPreview = Omit<BookSearchResult, 'rawData'>;

export type AddBookInput = {
  book: BookSearchResult;
  sectionIds: BookSectionId[];
};

export type AddBookSelectionInput = {
  source: BookExternalSource;
  googleBooksId?: string | null;
  openLibraryKey?: string | null;
  sectionIds: BookSectionId[];
};
