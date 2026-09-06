import { verifySession } from '@/shared/lib/auth';
import { getUserFilmWishlist } from '@/features/wishlist/api/db';

export async function getFilmWishlist(userId: string) {
  const session = await verifySession();

  if (session.status === 'unauthenticated') {
    return null;
  }

  return getUserFilmWishlist(userId);
}
