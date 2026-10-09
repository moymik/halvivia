'use client';

import { ReactNode, useEffect } from 'react';

import { cn } from '@/shared';
import { useBurgerMenuStore } from '@/widgets/Header/model/burgerMenuStore';
import BurgerMenu from '@/widgets/Header/ui/BurgerMenu';
import { Footer } from '@/widgets/Footer';

type MainContentProps = {
  children: ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  const { menuOpened, closeMenu } = useBurgerMenuStore();

  useEffect(() => {
    if (!menuOpened) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpened, closeMenu]);

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Ниже lg меню открывается шторкой поверх контента, под верхней строкой хедера */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={cn(
          'bg-bg-overlay fixed inset-x-0 top-17.5 bottom-0 z-505 transition-opacity duration-300 lg:hidden',
          menuOpened ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <nav
        id="main-navigation"
        aria-label="Основная навигация"
        className={cn(
          'bg-bg-surface border-border-default fixed top-17.5 bottom-0 left-0 z-510 w-57.5 shrink-0 overflow-hidden border-r transition-[translate,width] duration-300 ease-in-out',
          'lg:static lg:z-auto lg:translate-x-0',
          menuOpened ? 'translate-x-0 lg:w-57.5' : '-translate-x-full lg:w-21.25',
        )}
      >
        <div className="h-full overflow-x-hidden overflow-y-auto">
          <BurgerMenu open={menuOpened} setClose={closeMenu} />
        </div>
      </nav>

      <main className="bg-bg-base text-text-secondary min-w-0 flex-1 overflow-y-auto">
        {children}

        <Footer />
      </main>
    </div>
  );
}
