import { menuSections } from '@/widgets/Header/model/burgerMenu.config';
import { BurgerMenuSection } from '@/widgets/Header/ui/BurgerMenuSection';
import { Suspense } from 'react';

export type BurgerMenuProps = {
  open: boolean;
  setClose: () => void;
};

export function BurgerMenu({ open, setClose }: BurgerMenuProps) {
  return (
    <Suspense fallback={null}>
      <div className="flex flex-col gap-4 py-5">
        {menuSections.map((section) => (
          <BurgerMenuSection key={section.href} {...section} menuOpened={open} onClose={setClose} />
        ))}
      </div>
    </Suspense>
  );
}

export default BurgerMenu;
