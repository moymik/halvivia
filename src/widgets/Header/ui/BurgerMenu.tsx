'use client';
import { useState } from 'react';

import { Icon } from '@/shared/ui/icon';
import { DropdownSection } from '@/widgets/Header/ui/BurgerMenuSection';
import { menuSections } from '@/widgets/Header/model/burgerMenu.config';

export function BurgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-end lg:hidden">
      <button onClick={() => setOpen(!open)}>
        <Icon name="BurgerIcon" className="w-4 md:w-5.5" />
      </button>

      <div
        className={`bg-bg-base border-t-border-default page-content-width absolute top-full left-0 h-[calc(100vh-73px)] border-t py-5 transition-[translate,opacity] duration-300 ease-in-out ${
          open ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-full opacity-0'
        } `}
      >
        {menuSections.map((section) => (
          <DropdownSection key={section.href} {...section} onClose={() => setOpen(false)} />
        ))}
      </div>
    </div>
  );
}
