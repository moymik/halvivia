import { getBookWishlist } from '@/features/wishlist/api/queries';
import BookCard from '@/entities/books/ui/BookCard';

type BookWishlistGridProps = {
  userId: string;
  limit?: number;
  page?: number;
};

export async function BookWishlistGrid({ userId, limit = 24, page = 1 }: BookWishlistGridProps) {
  const result = await getBookWishlist(userId, limit, page);

  if (!result) {
    return <div>Необходимо авторизоваться.</div>;
  }

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,6.5rem)] gap-3 py-4 sm:grid-cols-[repeat(auto-fill,8rem)] lg:grid-cols-[repeat(auto-fill,9.25rem)]">
      {result.books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
