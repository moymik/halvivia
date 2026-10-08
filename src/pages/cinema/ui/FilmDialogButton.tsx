'use client';
import { Button } from '@/shared/ui/Button';
import { useAddSubjectDialogStore } from '@/features/addSubject/model/addSubjectDialogStore';

export function FilmDialogButton() {
  const openDialog = useAddSubjectDialogStore((state) => state.openDialog);

  return (
    <Button variant="primary" className="w-fit" onClick={() => openDialog('film')}>
      добавить фильм
    </Button>
  );
}

export default FilmDialogButton;
