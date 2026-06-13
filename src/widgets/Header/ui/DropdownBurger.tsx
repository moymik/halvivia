'use client';
import { useState } from 'react';

import { Icon } from '@/shared/ui/icon';
import Link from 'next/link';
import { ROUTES } from '@/shared/config';
import FilmIcon from '@/shared/assets/Film.svg';

export function DropdownBurger() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-end lg:hidden">
      <button onClick={() => setOpen(!open)}>
        <Icon name="BurgerIcon" className="w-4 md:w-5.5" />
      </button>

      <div
        className={`bg-bg-base border-t-border-default absolute top-full left-0 h-[calc(100vh-73px)] w-screen border-t py-5 transition-[translate,opacity] duration-300 ease-in-out ${
          open ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-full opacity-0'
        } `}
      >
        <div className="bold flex flex-col items-start justify-center gap-4 pb-5 text-xl">
          <Link onClick={() => setOpen(false)} href={ROUTES.CINEMA}>
            <FilmIcon className="inline" />
            Смотрильня
          </Link>

          <div className="flex flex-row items-center gap-2 px-10">
            <Icon className="text-primary w-3.5" name="AddIcon" />
            <Link onClick={() => setOpen(false)} href={ROUTES.CINEMA}>
              Добавить фильм
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
