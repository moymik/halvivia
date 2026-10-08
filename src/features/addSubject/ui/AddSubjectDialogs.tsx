'use client';

import { AddBookForm } from '@/features/addBook/ui/AddBookForm';
import { AddGameForm } from '@/features/addGame/ui/AddGameForm';
import KinopoiskForm from '@/features/addKinopoiskFilm/ui/KinopoiskForm';
import { useAddSubjectDialogStore } from '@/features/addSubject/model/addSubjectDialogStore';
import Dialog from '@/shared/ui/Dialog/Dialog';

export function AddSubjectDialogs() {
  const openedDialog = useAddSubjectDialogStore((state) => state.openedDialog);
  const closeDialog = useAddSubjectDialogStore((state) => state.closeDialog);

  return (
    <>
      <Dialog
        className="overflow-visible"
        title="Загрузи фильм"
        isOpen={openedDialog === 'film'}
        onClose={closeDialog}
      >
        <KinopoiskForm />
      </Dialog>

      <Dialog
        title="Добавить книгу"
        isOpen={openedDialog === 'book'}
        onClose={closeDialog}
        className="max-w-105 gap-5 px-5 py-10 md:px-8"
      >
        <AddBookForm />
      </Dialog>

      <Dialog
        title="Добавить игру"
        isOpen={openedDialog === 'game'}
        onClose={closeDialog}
        className="max-w-105 gap-5 px-5 py-10 md:px-8"
      >
        <AddGameForm />
      </Dialog>
    </>
  );
}

export default AddSubjectDialogs;
