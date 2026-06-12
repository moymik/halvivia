'use client';

import FilmCard from '@/entities/films/ui/FilmCard';
import Carousel from '@/shared/ui/carousel/Carousel';
import { Button } from '@/shared/ui/Button';
import { useState } from 'react';
import Dialog from '@/shared/ui/Dialog/Dialog';
import KinopoiskForm from '@/features/addKinopoiskFilm/ui/KinopoiskForm';
import Link from 'next/link';

export function CinemaPage() {
  const [filmDialogOpen, setFilmDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Link href="/cinema/db09b127-557d-476f-a05e-45ac9dca1b75">Naruto</Link>
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
    </div>
  );
}

export default CinemaPage;
