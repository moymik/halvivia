import { getFilmWishlist } from '@/features/wishlist/api/queries';
import FilmCard from '@/entities/films/ui/FilmCard';

type FilmWishlistGridProps = {
  userId: string;
  limit?: number;
  page?: number;
};

export async function FilmWishlistGrid({ userId, limit = 24, page = 1 }: FilmWishlistGridProps) {
  const result = await getFilmWishlist(userId, limit, page);
  if (!result) {
    return <div>Необходимо авторизоваться.</div>;
  }

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3 py-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {result.films.map((film) => (
          <FilmCard
            key={film.id}
            id={film.id}
            name={film.name}
            posterUrl={film.posterUrl}
            ratingAvg={film.ratingAvg}
            variant="grid"
          />
        ))}
      </div>
    </>
  );
}
