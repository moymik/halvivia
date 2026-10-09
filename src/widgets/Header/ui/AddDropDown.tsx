'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown';

import BookIcon from '@/shared/assets/books.svg';
import GameIcon from '@/shared/assets/games.svg';
import FilmIcon from '@/shared/assets/films.svg';

import { Button } from '@/shared/ui/Button';
import { useAddSubjectDialogStore } from '@/features/addSubject/model/addSubjectDialogStore';

export function AddDropDown() {
  const openDialog = useAddSubjectDialogStore((state) => state.openDialog);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Добавить</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-bg-surface ring-border-default z-1000 w-44.5">
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onSelect={() => openDialog('film')}
        >
          <FilmIcon className="size-5 shrink-0" />
          Добавить фильм
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onSelect={() => openDialog('book')}
        >
          <BookIcon className="size-5 shrink-0" />
          Добавить книгу
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onSelect={() => openDialog('game')}
        >
          <GameIcon className="size-5" />
          Добавить игру
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddDropDown;
