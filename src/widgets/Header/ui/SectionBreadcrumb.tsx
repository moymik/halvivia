'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { findCurrentMenuLocation } from '@/widgets/Header/model/menuMatch';

export function SectionBreadcrumb() {
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const location = findCurrentMenuLocation(pathname, searchParams);

  if (!location) {
    return <div className="flex-1" />;
  }

  const { section, item } = location;
  const SectionIcon = section.icon;

  return (
    <nav aria-label="Текущий раздел" className="flex min-w-0 flex-1 items-center gap-2">
      <Link href={section.href} className="flex shrink-0 items-center gap-2">
        <SectionIcon className="size-5 shrink-0" aria-hidden="true" />
        <span className="font-heading text-base font-bold">{section.title}</span>
      </Link>

      {item && (
        <>
          <ArrowRight
            className="text-primary size-4 shrink-0"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="text-text-secondary truncate text-sm" aria-current="page">
            {item.title}
          </span>
        </>
      )}
    </nav>
  );
}
