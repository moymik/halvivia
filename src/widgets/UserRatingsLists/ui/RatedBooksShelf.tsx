import { getUserBooksWithRating } from '@/widgets/UserRatingsLists/api/db';
import { BookShelf } from '@/pages/library/ui/BookShelf';

export default async function RatedBooksShelf({ userId }: { userId: string }) {
  const books = await getUserBooksWithRating(userId);
  return (
    <BookShelf
      key={'rated_books'}
      title={'Читальня'}
      books={books}
      emptyText={'В этом разделе пока пусто'}
      muted={false}
      variant={'onLight'}
    />
  );
}
