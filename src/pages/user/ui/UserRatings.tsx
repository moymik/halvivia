import { getUserBooksWithRating, getUserFilmsWithRating } from '@/widgets/UserRatingsLists/api/db';
import { RatingHistory } from '@/widgets/UserRatingsLists/ui/RatingHistory';

type UserRatingsProps = {
  userId: string;
  searchParams: {
    booksPage?: string;
    filmsPage?: string;
  };
};

const PAGE_SIZE = 20;

function getPage(value?: string): number {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export async function UserRatings({ userId, searchParams }: UserRatingsProps) {
  const booksPage = getPage(searchParams.booksPage);
  const filmsPage = getPage(searchParams.filmsPage);

  const [books, films] = await Promise.all([
    getUserBooksWithRating(userId, booksPage, PAGE_SIZE),

    getUserFilmsWithRating(userId, filmsPage, PAGE_SIZE),
  ]);

  return (
    <RatingHistory
      books={books}
      films={films}
      booksPage={booksPage}
      filmsPage={filmsPage}
      pageSize={PAGE_SIZE}
    />
  );
}

export default UserRatings;
