import { create } from 'zustand';

type BurgerMenuStore = {
  menuOpened: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const useBurgerMenuStore = create<BurgerMenuStore>((set) => ({
  menuOpened: false,

  toggleMenu: () =>
    set((state) => ({
      menuOpened: !state.menuOpened,
    })),

  closeMenu: () =>
    set({
      menuOpened: false,
    }),
}));
