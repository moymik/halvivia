import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/shared';
import { isCurrentMenuItem, isCurrentMenuSection } from '@/widgets/Header/model/menuMatch';

// Ниже lg меню — выезжающая шторка поверх контента, её нужно закрывать после перехода.
const DRAWER_MEDIA_QUERY = '(max-width: 1279px)';

type MenuSectionProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  menuOpened: boolean;
  title: string;
  href: string;
  items: {
    title: string;
    href: string;
    matchSearch?: boolean;
  }[];
  onClose: () => void;
};

export function BurgerMenuSection({
  title,
  href,
  items,
  onClose,
  menuOpened,
  icon: IconComponent,
}: MenuSectionProps) {
  const [sectionOpened, setSectionOpened] = useState<boolean | null>(null);
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const sectionIsCurrent = isCurrentMenuSection(href, pathname);

  const sectionExpanded = sectionOpened === null ? sectionIsCurrent : sectionOpened;
  const itemsVisible = menuOpened && sectionExpanded;

  const toggleSection = () => {
    setSectionOpened((prev) => {
      if (prev === null) {
        return !sectionIsCurrent;
      }
      return !prev;
    });
  };

  const closeDrawer = () => {
    if (window.matchMedia(DRAWER_MEDIA_QUERY).matches) {
      onClose();
    }
  };

  return (
    <section className="flex flex-col">
      <div
        className={cn(
          'flex items-center transition-[height,padding] duration-300 ease-in-out',
          menuOpened ? 'h-7 pl-3.75' : 'h-11 pl-5',
        )}
      >
        <Link
          href={href}
          onClick={onClose}
          aria-label={title}
          aria-current={sectionIsCurrent ? 'true' : undefined}
          className={cn(
            'flex h-full w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-200',
            !menuOpened && (sectionIsCurrent ? 'bg-bg-hover' : 'hover:bg-bg-hover'),
          )}
        >
          <IconComponent className="size-5 shrink-0" />
        </Link>

        <button
          type="button"
          onClick={toggleSection}
          aria-expanded={itemsVisible}
          tabIndex={menuOpened ? 0 : -1}
          className={cn(
            'font-heading flex h-full items-center gap-2 text-base font-bold whitespace-nowrap transition-[opacity,transform] duration-200',
            menuOpened
              ? 'translate-x-0 opacity-100'
              : 'pointer-events-none -translate-x-2 opacity-0',
          )}
        >
          <span>{title}</span>
          <ChevronRight
            aria-hidden="true"
            strokeWidth={1.75}
            className={cn(
              'size-4 shrink-0 transition-transform duration-200',
              sectionExpanded && 'rotate-90',
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
          itemsVisible
            ? 'grid-rows-[1fr] opacity-100'
            : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-2 pt-4 pr-10 pl-15">
            {items.map((item) => {
              const itemIsCurrent = isCurrentMenuItem(
                item.href,
                item.matchSearch,
                pathname,
                searchParams,
              );

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeDrawer}
                    tabIndex={itemsVisible ? 0 : -1}
                    aria-current={itemIsCurrent ? 'page' : undefined}
                    className={cn(
                      'flex min-h-10 w-full items-center rounded-lg border-l-3 py-2 pr-3 pl-3 text-sm transition-colors duration-200',
                      itemIsCurrent
                        ? 'bg-bg-selected border-primary text-text-primary'
                        : 'text-text-secondary hover:text-text-primary border-transparent',
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-border-default mx-6 mt-5 border-t" />
        </div>
      </div>
    </section>
  );
}
