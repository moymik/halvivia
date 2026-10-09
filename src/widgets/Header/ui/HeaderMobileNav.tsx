'use client';

import { Suspense, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

import AddDropDown from '@/widgets/Header/ui/AddDropDown';
import HeaderSearch from '@/widgets/Header/ui/HeaderSearch';
import { SectionBreadcrumb } from '@/widgets/Header/ui/SectionBreadcrumb';

const iconButtonStyles =
  'hover:bg-bg-hover flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200';

export function HeaderMobileNav() {
  const [searchOpened, setSearchOpened] = useState(false);

  return (
    <div className="flex h-16.5 items-center gap-2 px-4 lg:hidden">
      {searchOpened ? (
        <>
          <button
            type="button"
            onClick={() => setSearchOpened(false)}
            aria-label="Закрыть поиск"
            className={`${iconButtonStyles} -ml-2.5`}
          >
            <ArrowLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <HeaderSearch autoFocus onNavigate={() => setSearchOpened(false)} />
        </>
      ) : (
        <>
          <Suspense fallback={<div className="flex-1" />}>
            <SectionBreadcrumb />
          </Suspense>
          <button
            type="button"
            onClick={() => setSearchOpened(true)}
            aria-label="Открыть поиск"
            className={iconButtonStyles}
          >
            <Search className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <AddDropDown className="ml-2" />
        </>
      )}
    </div>
  );
}
