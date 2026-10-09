import { menuSections } from '@/widgets/Header/model/burgerMenu.config';
import { BurgerMenuSection } from '@/widgets/Header/ui/BurgerMenuSection';
import { Suspense } from 'react';
import { cn } from '@/shared';

export type BurgerMenuProps = {
  open: boolean;
  setClose: () => void;
};

export function BurgerMenu({ open, setClose }: BurgerMenuProps) {
  return (
    <Suspense fallback={null}>
      <div className={cn('flex flex-col pt-10 pb-5', open ? 'gap-5' : 'gap-4')}>
        {menuSections.map((section) => (
          <BurgerMenuSection key={section.href} {...section} menuOpened={open} onClose={setClose} />
        ))}
      </div>
    </Suspense>
  );
}

export default BurgerMenu;
