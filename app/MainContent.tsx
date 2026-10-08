'use client';

import { ReactNode, Suspense } from 'react';

import { useBurgerMenuStore } from '@/widgets/Header/model/burgerMenuStore';
import BurgerMenu from '@/widgets/Header/ui/BurgerMenu';
import { Footer } from '@/widgets/Footer';

type MainContentProps = {
  children: ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  const { menuOpened, closeMenu } = useBurgerMenuStore();

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <nav
        className={`bg-bg-surface border-r-border-default overflow-hidden border-r transition-[width] duration-300 ease-in-out ${
          menuOpened ? 'w-1/2 lg:w-58' : 'w-14'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <BurgerMenu open={menuOpened} setClose={closeMenu} />
        </div>
      </nav>

      <main className="bg-bg-base text-text-secondary min-w-0 flex-1 overflow-y-auto">
        <Suspense>{children}</Suspense>

        <Footer />
      </main>
    </div>
  );
}
