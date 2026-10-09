import { Icon } from '@/shared/ui/icon';
import { AppLink } from '@/shared/ui/app-link';
import { NAVIGATION_LINKS } from '@/shared/config';
import HeaderUserBar from '@/widgets/Header/ui/HeaderUserBar';
import { Suspense } from 'react';
import { BurgerButton } from '@/widgets/Header/ui/BurgerButton';
import HeaderSearch from '@/widgets/Header/ui/HeaderSearch';
import { HeaderMobileNav } from '@/widgets/Header/ui/HeaderMobileNav';

export async function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="border-border-default bg-bg-surface relative z-500 flex w-full flex-col border-b">
      <div className="border-border-default flex h-17.5 items-center justify-between gap-4 border-b px-4 lg:h-25 lg:gap-8 lg:border-b-0 lg:pr-10 lg:pl-0">
        <div className="flex items-center gap-3.5 lg:gap-0">
          {/* На десктопе бургер стоит по центру колонки свернутого меню, логотип — сразу за ней */}
          <div className="flex items-center lg:w-21.25 lg:justify-center">
            <BurgerButton />
          </div>
          <AppLink
            link={NAVIGATION_LINKS.CINEMA}
            className="flex items-center gap-2 lg:gap-3.5"
            aria-label="Халва Повидло — на главную"
            hideLabel
          >
            <Icon name={'LogoIcon'} className="w-4 shrink-0 lg:w-6"></Icon>
            <span className="font-heading text-sm leading-3.5 font-normal lg:text-xl lg:leading-5">
              Халва
              <br />
              Повидло
            </span>
          </AppLink>
        </div>
        <div className="hidden w-full max-w-132 lg:block">
          <HeaderSearch />
        </div>
        <Suspense fallback={null}>
          <HeaderUserBar></HeaderUserBar>
        </Suspense>
      </div>
      <HeaderMobileNav />
      {children}
    </header>
  );
}

export default Header;
