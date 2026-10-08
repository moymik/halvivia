'use client';

import { Button } from '@/shared/ui/Button';
import { AddIcon } from '@/shared/ui/icons';
import { useAddSubjectDialogStore } from '@/features/addSubject/model/addSubjectDialogStore';

export function AddGameDialogButton() {
  const openDialog = useAddSubjectDialogStore((state) => state.openDialog);

  return (
    <Button
      type="button"
      variant="primary"
      className="h-10 gap-2 px-5 text-sm"
      onClick={() => openDialog('game')}
    >
      <AddIcon className="h-4 w-4" />
      Добавить игру
    </Button>
  );
}

export default AddGameDialogButton;
