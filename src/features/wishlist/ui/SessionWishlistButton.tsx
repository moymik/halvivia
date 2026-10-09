import { verifySession } from '@/shared/lib/auth';
import { isBookInWishlist, isFilmInWishlist } from '@/features/wishlist/api/db';
import { BookWishlistButton } from '@/features/wishlist/ui/BookWishlistButton';
import { FilmWishlistButton } from '@/features/wishlist/ui/FilmWishlistButton';

type SessionWishlistButtonProps = {
  type: 'film' | 'book';
  id: string;
};

// Читает сессию, поэтому рендерится под <Suspense> и не блокирует закэшированную часть страницы.
export async function SessionWishlistButton({ type, id }: SessionWishlistButtonProps) {
  const session = await verifySession();
  const userId = session.status === 'unauthenticated' ? null : session.payload.userId;

  if (type === 'film') {
    const isInWishlist = userId ? await isFilmInWishlist(userId, id) : false;

    return <FilmWishlistButton filmId={id} isInWishlist={isInWishlist} />;
  }

  const isInWishlist = userId ? await isBookInWishlist(userId, id) : false;

  return <BookWishlistButton bookId={id} isInWishlist={isInWishlist} />;
}

export default SessionWishlistButton;
