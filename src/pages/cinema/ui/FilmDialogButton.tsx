'use client';
import { Button } from '@/shared/ui/Button';
import { useState } from 'react';
import KinopoiskForm from '@/features/addKinopoiskFilm/ui/KinopoiskForm';
import Dialog from '@/shared/ui/Dialog/Dialog';

export function FilmDialogButton() {
  const [filmDialogOpen, setFilmDialogOpen] = useState(false);

  return (
    <div>
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
    </div>
  );
}

export default FilmDialogButton;
