import { verifySession } from '@/shared/lib/auth';
import { getFilmWishlist } from '@/features/wishlist/api/queries';
import Carousel from '@/shared/ui/carousel/Carousel';
import FilmCard from '@/entities/films/ui/FilmCard';
import { ROUTES } from '@/shared/config';
type PlannedFilmsCarouselProps = { userId?: string };
export async function PlannedFilmsCarousel({ userId }: PlannedFilmsCarouselProps) {
  const session = await verifySession();
  if (session.status === 'unauthenticated') {
    return null;
  }
  const targetUserId = userId ?? session.payload.userId;
  const wishlist = await getFilmWishlist(targetUserId, 10);
  if (!wishlist) {
    throw new Error('Не удалось загрузить список запланированных фильмов.');
  }
  return (
    <Carousel href={`${ROUTES.PROFILE}/${targetUserId}/?tab=movies`} label="Планирую посмотреть">
      {wishlist.films.map((film) => (
        <li className="relative" key={film.id}>
          <FilmCard {...film} />
        </li>
      ))}
    </Carousel>
  );
}
export default PlannedFilmsCarousel;
