'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

type CatalogLayoutProps = {
  title: ReactNode;
  // Форма фильтров. Рендерится дважды: в боковой панели (от lg) и в попапе (ниже lg),
  // поэтому id внутри формы должны строиться через useId.
  filters: ReactNode;
  children: ReactNode;
};

export function CatalogLayout({ title, filters, children }: CatalogLayoutProps) {
  const [filtersOpened, setFiltersOpened] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!filtersOpened) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (popoverRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return;
      }

      setFiltersOpened(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setFiltersOpened(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filtersOpened]);

  return (
    <section className="text-text-primary flex min-h-full">
      <div className="flex min-w-0 flex-1 flex-col gap-6 px-4 pt-6 pb-10 lg:px-10 lg:pt-10">
        <div className="relative flex items-center justify-between gap-4">
          <h1 className="text-xl leading-tight font-bold">{title}</h1>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setFiltersOpened((opened) => !opened)}
            aria-expanded={filtersOpened}
            aria-controls="catalog-filters-popover"
            className="text-text-primary flex shrink-0 items-center gap-2 text-sm lg:hidden"
          >
            Фильтры
            <SlidersHorizontal
              className="text-primary size-5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </button>

          {filtersOpened && (
            <div
              ref={popoverRef}
              id="catalog-filters-popover"
              className="border-border-default bg-bg-surface absolute top-full right-0 z-50 mt-2 max-h-[calc(100dvh-240px)] w-77 max-w-[calc(100vw-32px)] overflow-y-auto rounded-lg border p-4 shadow-xl lg:hidden"
            >
              {filters}
            </div>
          )}
        </div>

        {children}
      </div>

      <aside
        aria-label="Фильтры"
        className="border-border-default bg-bg-surface hidden w-81.5 shrink-0 border-l lg:block"
      >
        <div className="sticky top-0 max-h-[calc(100dvh-101px)] overflow-y-auto px-6 py-10">
          {filters}
        </div>
      </aside>
    </section>
  );
}
