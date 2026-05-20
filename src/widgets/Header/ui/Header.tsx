import React from 'react';
import Link from 'next/link';
import BurgerIcon from '@/shared/icons/BurgerIcon';
import { NotificationIcon } from '@/shared/icons/NotificationIcon';
import LogoIcon from '@/shared/icons/LogoIcon';
import TabPanel from '../../../shared/navigation/ui/TabPanel';

export function Header() {
  return (
    <header
      className={
        'border-border-default bg-bg-surface sticky top-0 z-1000 flex h-18 w-full flex-row items-center justify-between border-b px-4 md:px-8.5 lg:h-23 lg:px-20 xl:px-25.5 2xl:px-75'
      }
    >
      <button
        className="rounded-md p-2 transition hover:bg-white/10 lg:hidden"
        aria-label="Открыть меню"
        aria-controls="main-navigation"
      >
        <BurgerIcon className="w-4 md:w-5.5"></BurgerIcon>
      </button>

      <div className="absolute top-1/2 left-1/2 flex h-full -translate-x-1/2 -translate-y-1/2 items-center justify-between lg:static lg:translate-0">
        <Link
          href="/"
          className="mr-19 flex items-center gap-2"
          aria-label="Halva and Povidlo homepage"
        >
          <LogoIcon className="w-4 md:w-4.5 lg:w-6" />
          <span className="hidden leading-none md:inline-block">
            Halva&
            <br />
            Povidlo
          </span>
        </Link>
        <TabPanel
          className="h-full"
          items={[
            { href: '/cinema', label: 'Смотрильня' },
            { href: '/library', label: 'Читальня' },
          ]}
        />
      </div>

      <div className="flex gap-4 lg:gap-6">
        <button
          className="flex items-center rounded-md transition hover:bg-white/10"
          aria-label="Уведомления"
        >
          <NotificationIcon className="w-4 lg:w-5.5"></NotificationIcon>
        </button>
        <button
          className="font-heading rounded-md p-2 font-medium transition hover:shadow-[0_6px_20px_-10px_rgba(255,255,255,0.6)]"
          aria-label="Открыть меню авторизации"
        >
          Войти
        </button>
      </div>
    </header>
  );
}

export default Header;
