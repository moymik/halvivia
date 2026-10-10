import { Book } from '@/entities/books';
import { Game } from '@/entities/games';
import { RatingValue } from '@/entities/rating/model/types';
import { FilmWithoutGenres } from '@/entities/films/model/types';

export type BookWithUserRating = Book & {
  userRating: RatingValue;
  userRatingCreatedAt: string;
};

export type FilmWithUserRating = FilmWithoutGenres & {
  userRating: RatingValue;
  userRatingCreatedAt: string;
};

export type GameWithUserRating = Game & {
  userRating: RatingValue;
  userRatingCreatedAt: string;
};

export function isBookWithRating(book: Book | BookWithUserRating): book is BookWithUserRating {
  return 'userRating' in book;
}

export type RatingChartItem = {
  id: string;
  title: string;
  posterUrl: string | null;
  type: 'book' | 'film' | 'game';
  rating: -1 | 0 | 1 | 2;
  ratedAt: string;
  meta: string | null;
  description: string | null;
};

export type RatingHistoryPage<T> = {
  items: T[];
  totalCount: number;
  totalPages: number;
};

export type RatingHistoryType = 'books' | 'films' | 'games';

export type RatingSortBy = 'date' | 'rating';
export type SortOrder = 'asc' | 'desc';

export type RatingTableRow = {
  id: string;
  title: string;
  type: 'book' | 'film' | 'game';
  userRating: RatingValue;
  userRatingCreatedAt: string;

  posterUrl: string | null;
  meta: string | null;
  description: string | null;
};

export function mapBooksToTableRows(items: BookWithUserRating[]): RatingTableRow[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    type: 'book',
    userRating: item.userRating,
    userRatingCreatedAt: item.userRatingCreatedAt,
    posterUrl: item.thumbnailUrl,
    meta: [item.authors.join(', '), item.publishedDate].filter(Boolean).join(' · ') || null,
    description: item.description,
  }));
}

export function mapFilmsToTableRows(items: FilmWithUserRating[]): RatingTableRow[] {
  return items.map((item) => ({
    id: item.id,
    title: item.nameRu || item.nameOriginal || item.nameEn || 'Без названия',
    type: 'film',
    userRating: item.userRating,
    userRatingCreatedAt: item.userRatingCreatedAt,
    posterUrl: item.posterUrlPreview,
    meta:
      [item.year, item.filmLength ? `${item.filmLength} мин.` : null].filter(Boolean).join(' · ') ||
      null,
    description: item.description,
  }));
}

export function mapGamesToTableRows(items: GameWithUserRating[]): RatingTableRow[] {
  return items.map((item) => ({
    id: item.id,
    title: item.name || 'Без названия',
    type: 'game',
    userRating: item.userRating,
    userRatingCreatedAt: item.userRatingCreatedAt,
    posterUrl: item.headerImage,
    meta: [item.releaseDate, item.developers?.join(', ')].filter(Boolean).join(' · ') || null,
    description: item.shortDescription,
  }));
}
