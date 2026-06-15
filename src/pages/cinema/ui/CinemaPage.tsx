import FilmCard from '@/entities/films/ui/FilmCard';
import Carousel from '@/shared/ui/carousel/Carousel';

import { getInitialCardsAction } from '@/pages/cinema/api/actions';
import FilmDialogButton from '@/pages/cinema/ui/FilmDialogButton';

export async function CinemaPage() {
  'use cache';
  const cardProps = await getInitialCardsAction();
  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-4 py-8 md:px-8 lg:py-9">
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
