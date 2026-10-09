'use client';

import { Icon } from '@/shared/ui/icon';

import { useBurgerMenuStore } from '@/widgets/Header/model/burgerMenuStore';

export function BurgerButton() {
  const { menuOpened, toggleMenu } = useBurgerMenuStore();

  return (
    <button
      type="button"
      onClick={toggleMenu}
      aria-expanded={menuOpened}
      aria-controls="main-navigation"
      aria-label={menuOpened ? 'Закрыть меню' : 'Открыть меню'}
      className="hover:bg-bg-hover -ml-2.5 flex size-10 items-center justify-center rounded-lg transition-colors duration-200 lg:ml-0"
    >
      <Icon name="BurgerIcon" className="w-5.5" />
    </button>
  );
}
