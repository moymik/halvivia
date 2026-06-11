'use client';

import { getFilmByIdAction } from '@/entities/films/model/actions';
import { addKinopoiskFilmAction } from '@/features/addKinopoiskFilm/api/actions';
import { searchKinopoiskFilmsByKeyword } from '@/features/addKinopoiskFilm/api/actions';
import FilmCard from '@/entities/films/ui/FilmCard';
import Carousel from '@/shared/ui/carousel/Carousel';
import { Button } from '@/shared/ui/Button';
import { useState } from 'react';
import Dialog from '@/shared/ui/Dialog/Dialog';
import KinopoiskForm from '@/features/addKinopoiskFilm/ui/KinopoiskForm';

export function CinemaPage() {
  const [filmDialogOpen, setFilmDialogOpen] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      <Dialog
        title={'Загрузи фильм'}
        closeLabel={'Поиск фильмов'}
        isOpen={filmDialogOpen}
        onClose={() => setFilmDialogOpen(false)}
      >
        <KinopoiskForm />
      </Dialog>
      <Button
        variant={'primary'}
        className={'w-fit'}
        onClick={() => {
          setFilmDialogOpen(true);
        }}
      >
        добавить фильм
      </Button>

      <Carousel>
        <FilmCard key={1} />
        <FilmCard key={2} />
        <FilmCard key={3} />
        <FilmCard key={4} />
        <FilmCard key={5} />
        <FilmCard key={6} />
        <FilmCard key={7} />
        <FilmCard key={8} />
        <FilmCard key={9} />
        <FilmCard key={10} />
      </Carousel>
      <Carousel>
        <FilmCard key={1} />
        <FilmCard key={2} />
        <FilmCard key={3} />
        <FilmCard key={4} />
        <FilmCard key={5} />
        <FilmCard key={6} />
        <FilmCard key={7} />
        <FilmCard key={8} />
        <FilmCard key={9} />
        <FilmCard key={10} />
      </Carousel>
      <Carousel>
        <FilmCard key={1} />
        <FilmCard key={2} />
        <FilmCard key={3} />
        <FilmCard key={4} />
        <FilmCard key={5} />
        <FilmCard key={6} />
        <FilmCard key={7} />
        <FilmCard key={8} />
        <FilmCard key={9} />
        <FilmCard key={10} />
      </Carousel>
      <Carousel>
        <FilmCard key={1} />
        <FilmCard key={2} />
        <FilmCard key={3} />
        <FilmCard key={4} />
        <FilmCard key={5} />
        <FilmCard key={6} />
        <FilmCard key={7} />
        <FilmCard key={8} />
        <FilmCard key={9} />
        <FilmCard key={10} />
      </Carousel>
      <button
        className={'mt-100'}
        onClick={async () => {
          const film = await getFilmByIdAction('e9339093-33db-4dc8-b465-381efbf712eb');
        }}
      >
        получить фильм по id{' '}
      </button>
      <button
        onClick={async () => {
          const film = await addKinopoiskFilmAction(1143242);
          console.log('ответ', film);
        }}
      >
        добавить кинопоиск фильм по айди
      </button>
      <button
        onClick={async () => {
          const films = await searchKinopoiskFilmsByKeyword('тор');
          console.log('ответ', films);
        }}
      >
        найти фильмы по kyword
      </button>
    </div>
  );
}

export default CinemaPage;
