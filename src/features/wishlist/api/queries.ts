import { verifySession } from '@/shared/lib/auth';
import { getUserFilmWishlist } from '@/features/wishlist/api/db';
import { mapFilms } from '@/entities/films/model/mappers';

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
