import { getUserFilmsWithRating } from '@/widgets/UserRatingsLists/api/db';
import Carousel from '@/shared/ui/carousel/Carousel';
import FilmCard from '@/entities/films/ui/FilmCard';

export default async function RatedFilmsCarousel({ userId }: { userId: string }) {
  const response = await getUserFilmsWithRating(userId);
  return (
    <Carousel className={'text-text-inverse'} href={'/cinema/lists'} label={'Смотрильня'}>
      {response.items.map((film) => (
        <li className={'relative'} key={film.id}>
          <FilmCard
            {...film}
            name={film.nameRu || film.nameEn || film.nameOriginal || `без названия`}
          >
            <div className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white">
              {film.userRating}
            </div>
          </FilmCard>
        </li>
      ))}
    </Carousel>
  );
}
