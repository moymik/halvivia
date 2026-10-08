'use client';

import { Button } from '@/shared/ui/Button';
import { AddIcon } from '@/shared/ui/icons';
import { cn } from '@/shared';
import { useAddSubjectDialogStore } from '@/features/addSubject/model/addSubjectDialogStore';
type AddBookDialogButtonProps = {
  className?: string;
};
export function AddBookDialogButton({ className }: AddBookDialogButtonProps) {
  const openDialog = useAddSubjectDialogStore((state) => state.openDialog);

  return (
    <Button
      type="button"
      variant="primary"
      className={cn('h-10 gap-2 px-5 text-sm', className)}
      onClick={() => openDialog('book')}
    >
      <AddIcon className="h-4 w-4" />
      Добавить книгу
    </Button>
  );
}

export default AddBookDialogButton;
