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
      aria-label={menuOpened ? 'Close menu' : 'Open menu'}
    >
      <Icon name="BurgerIcon" className="w-4 md:w-5.5" />
    </button>
  );
}
