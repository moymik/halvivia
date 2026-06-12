import FilmCard from '@/entities/films/ui/FilmCard';
import Carousel from '@/shared/ui/carousel/Carousel';

import Link from 'next/link';
import { getInitialCardsAction } from '@/pages/cinema/api/actions';
import FilmDialogButton from '@/pages/cinema/ui/FilmDialogButton';

export async function CinemaPage() {
  'use cache';
  const cardProps = await getInitialCardsAction();
  return (
    <div className="flex flex-col gap-4">
      <Link href="/cinema/db09b127-557d-476f-a05e-45ac9dca1b75">Naruto</Link>
      <Carousel label={'Новинки'}>
        {cardProps.recentCards.map((prop) => (
          <FilmCard key={prop.id} {...prop} />
        ))}
      </Carousel>
      <FilmDialogButton></FilmDialogButton>
      <Carousel label={'Фильмы'}>
        {cardProps.filmCards.map((prop) => (
          <FilmCard key={prop.id} {...prop} />
        ))}
      </Carousel>
      <Carousel label={'Сериалы'}>
        {cardProps.seriesCards.map((prop) => (
          <FilmCard key={prop.id} {...prop} />
        ))}
      </Carousel>
      <Carousel label={'Аниме'}>
        {cardProps.animeCards.map((prop) => (
          <FilmCard key={prop.id} {...prop} />
        ))}
      </Carousel>
      <Carousel label={'Мультфильмы'}>
        {cardProps.cartoonCards.map((prop) => (
          <FilmCard key={prop.id} {...prop} />
        ))}
      </Carousel>
    </div>
  );
}

export default CinemaPage;
