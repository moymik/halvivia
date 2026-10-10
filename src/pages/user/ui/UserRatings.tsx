import {
  getUserBooksWithRating,
  getUserFilmsWithRating,
  getUserGamesWithRating,
} from '@/widgets/UserRatingsLists/api/db';
import { RatingHistory } from '@/widgets/UserRatingsLists/ui/RatingHistory';

type RatingSortBy = 'date' | 'rating';
type SortOrder = 'asc' | 'desc';

type UserRatingsProps = {
  userId: string;
  searchParams: {
    booksPage?: string;
    filmsPage?: string;
    gamesPage?: string;
    sortBy?: string;
    sortOrder?: string;
  };
};

function getSortBy(value?: string): RatingSortBy {
  return value === 'rating' ? 'rating' : 'date';
}

function getSortOrder(value?: string): SortOrder {
  return value === 'asc' ? 'asc' : 'desc';
}

const PAGE_SIZE = 20;

function getPage(value?: string): number {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export async function UserRatings({ userId, searchParams }: UserRatingsProps) {
  const booksPage = getPage(searchParams.booksPage);
  const filmsPage = getPage(searchParams.filmsPage);
  const gamesPage = getPage(searchParams.gamesPage);
  const sortBy = getSortBy(searchParams.sortBy);
  const sortOrder = getSortOrder(searchParams.sortOrder);

  const [books, films, games] = await Promise.all([
    getUserBooksWithRating(userId, booksPage, PAGE_SIZE, sortBy, sortOrder),
    getUserFilmsWithRating(userId, filmsPage, PAGE_SIZE, sortBy, sortOrder),
    getUserGamesWithRating(userId, gamesPage, PAGE_SIZE, sortBy, sortOrder),
  ]);

  return (
    <RatingHistory
      booksTotalCount={books.totalCount}
      filmsTotalCount={films.totalCount}
      gamesTotalCount={games.totalCount}
      books={books.items}
      films={films.items}
      games={games.items}
      booksPage={booksPage}
      filmsPage={filmsPage}
      gamesPage={gamesPage}
      pageSize={PAGE_SIZE}
      sortBy={sortBy}
      sortOrder={sortOrder}
    />
  );
}

export default UserRatings;
