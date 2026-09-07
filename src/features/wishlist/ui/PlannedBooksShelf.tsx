import { verifySession } from '@/shared/lib/auth';
import { getBookWishlist } from '@/features/wishlist/api/queries';
import { BookShelf } from '@/pages/library/ui/BookShelf';

export type PlannedBooksShelfProps = {
  userId?: string;
};

export async function PlannedBooksShelf({ userId }: PlannedBooksShelfProps) {
  const session = await verifySession();

  if (session.status === 'unauthenticated') {
    return null;
  }

  const targetUserId = userId ?? session.payload.userId;
  const wishlist = await getBookWishlist(targetUserId, 10);

  if (!wishlist) {
    throw new Error('Не удалось загрузить список запланированных книг.');
  }

  return (
    <BookShelf
      title="Планирую прочитать"
      books={wishlist.books}
      emptyText="Здесь пока пусто"
      muted
    />
  );
}

export default PlannedBooksShelf;
