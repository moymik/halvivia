import FilmCard from '@/entities/films/ui/FilmCard';
import Carousel from '@/shared/ui/carousel/Carousel';

import { getInitialCardsAction } from '@/pages/cinema/api/actions';
import FilmDialogButton from '@/pages/cinema/ui/FilmDialogButton';

export async function CinemaPage() {
  'use cache';
  const cardProps = await getInitialCardsAction();
  return (
    <>
      <section className={'bg-bg-inverse w-full'}>
        <div className={'page-content-width'}>
          <Carousel className={'text-text-inverse'} label={'Новинки'}>
            {cardProps.recentCards.map((prop) => (
              <FilmCard key={prop.id} {...prop} />
            ))}
          </Carousel>
        </div>
      </section>
      <section></section>
      <section className={'w-full'}>
        <div className={'page-content-width'}>
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
      </section>
    </>
  );
}

export default CinemaPage;
