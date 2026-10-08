import { Icon } from '@/shared/ui/icon';
import { AppLink } from '@/shared/ui/app-link';
import { NAVIGATION_LINKS } from '@/shared/config';
import HeaderUserBar from '@/widgets/Header/ui/HeaderUserBar';
import { Suspense } from 'react';
import { BurgerButton } from '@/widgets/Header/ui/BurgerButton';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export async function Header({ children }: { children: React.ReactNode }) {
  return (
    <header
      className={
        'border-border-default bg-bg-surface sticky top-0 z-500 flex h-18 w-full flex-row items-center justify-between border-b px-4 md:z-100 lg:h-25 lg:px-10'
      }
    >
      <div className={'flex gap-3.5 lg:gap-7.5'}>
        <BurgerButton aria-label="Открыть меню" aria-controls="main-navigation"></BurgerButton>
        <AppLink
          link={NAVIGATION_LINKS.CINEMA}
          className="flex items-center gap-3 lg:gap-4"
          aria-label="Halva and Povidlo homepage"
          hideLabel
        >
          <Icon name={'LogoIcon'} className="w-4 md:w-4.5 lg:w-6"></Icon>
          <span className="inline-block leading-none">
            Halva&
            <br />
            Povidlo
          </span>
        </AppLink>
      </div>
      <div className={'space-between hidden w-1/3 lg:flex'}>
        <Input variant={'dark'} searchIcon={'always'} placeholder="Поиск"></Input>
      </div>
      <Suspense fallback={'loading...'}>
        <HeaderUserBar></HeaderUserBar>
      </Suspense>
      {children}
    </header>
  );
}

export default Header;
