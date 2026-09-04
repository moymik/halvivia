import { Book } from '@/entities/books';
import { RatingValue } from '@/entities/rating/model/types';
import { FilmWithoutGenres } from '@/entities/films/model/types';

export type BookWithUserRating = Book & { userRating: RatingValue };
export type FilmWithUserRating = FilmWithoutGenres & { userRating: RatingValue };

export function isBookWithRating(book: Book | BookWithUserRating): book is BookWithUserRating {
  return 'userRating' in book;
}
