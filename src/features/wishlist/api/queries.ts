import { verifySession } from '@/shared/lib/auth';
import { getUserBookWishlist, getUserFilmWishlist } from '@/features/wishlist/api/db';
import { mapFilms } from '@/entities/films/model/mappers';
import { mapDbBook } from '@/entities/books/model/mappers';

export async function getFilmWishlist(userId: string, limit = 25, page = 1) {
  const session = await verifySession();

  if (session.status === 'unauthenticated') {
    return null;
  }

  const result = await getUserFilmWishlist(userId, limit, page);

  return {
    films: mapFilms(result.films),
    totalCount: result.totalCount,
    totalPages: result.totalPages,
  };
}

export async function getBookWishlist(userId: string, limit = 25, page = 1) {
  const session = await verifySession();

  if (session.status === 'unauthenticated') {
    return null;
  }

  const result = await getUserBookWishlist(userId, limit, page);

  return {
    books: result.books.map(mapDbBook),
    totalCount: result.totalCount,
    totalPages: result.totalPages,
  };
}
