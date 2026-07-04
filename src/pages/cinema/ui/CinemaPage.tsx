import FilmCard from '@/entities/films/ui/FilmCard';
import Carousel from '@/shared/ui/carousel/Carousel';

import { getInitialCardsAction } from '@/pages/cinema/api/actions';
import Toolbar from '@/pages/cinema/ui/Toolbar';
import FilmsGrid from '@/pages/cinema/ui/FilmsGrid';

export async function CinemaPage() {
  'use cache';
  const initialCards = await getInitialCardsAction();
  return (
    <>
      <section className={'bg-bg-inverse w-full pt-7.5 pb-4'}>
        <div className={'page-content-width'}>
          <Carousel className={'text-text-inverse'} label={'Новинки'}>
            {initialCards.recentCards.map((prop) => (
              <FilmCard key={prop.id} {...prop} />
            ))}
          </Carousel>
        </div>
      </section>
      <section className={'w-full'}>
        <div className={'page-content-width py-12'}>
          <Toolbar canAddFilm={true}></Toolbar>
          <FilmsGrid initialFilmCards={initialCards}></FilmsGrid>
        </div>
      </section>
    </>
  );
}

export default CinemaPage;
