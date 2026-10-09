import Link from 'next/link';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ArrowIcon from '@/shared/assets/SmallArrowIcon.svg';

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
  const sectionIsCurrent = pathname === href || pathname.startsWith(`${href}/`);

  const sectionExpanded = sectionOpened === null ? sectionIsCurrent : sectionOpened;
  const toggleSection = () => {
    setSectionOpened((prev) => {
      if (prev === null) {
        return !sectionIsCurrent;
      }
      return !prev;
    });
  };

  return (
    <section className="flex flex-col">
      <div className="flex h-11 items-center">
        <Link href={href} onClick={onClose} className="group inline-flex h-11 items-center">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm hover:bg-[#1C1C1C]">
            <IconComponent className="size-5 shrink-0" />
          </span>
        </Link>

        <button
          type="button"
          onClick={toggleSection}
          className={`flex h-11 items-center gap-2 text-xl font-bold whitespace-nowrap transition-[opacity,transform] duration-200 ${
            menuOpened
              ? 'translate-x-0 opacity-100'
              : 'pointer-events-none -translate-x-2 opacity-0'
          } `}
        >
          <span>{title}</span>

          <span className="flex size-4 shrink-0 items-center justify-center">
            <ArrowIcon
              className={`size-3.5 transition-transform duration-200 ${sectionExpanded ? 'rotate-90' : ''} `}
            />
          </span>
        </button>
      </div>

      <ul
        className={`flex flex-col gap-2 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          menuOpened && sectionExpanded
            ? 'mt-4 max-h-96 opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        } `}
      >
        {items.map((item) => (
          <li key={item.href} className="text-text-secondary flex items-center gap-2 px-10">
            <Link
              href={item.href}
              className={`flex min-h-10 w-full items-center rounded-lg px-4 py-2 transition-colors ${
                isCurrentMenuItem(item.href, item.matchSearch, pathname, searchParams)
                  ? 'bg-primary-080 border-primary text-text-primary border-l-4'
                  : 'hover:text-text-primary'
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function isCurrentMenuItem(
  href: string,
  matchSearch: boolean | undefined,
  pathname: string,
  searchParams: ReadonlyURLSearchParams | null,
) {
  const [itemPathname, itemQuery = ''] = href.split('?');
  if (pathname !== itemPathname) {
    return false;
  }
  const expectedParams = new URLSearchParams(itemQuery);
  if (expectedParams.size === 0) {
    return !matchSearch || !searchParams || searchParams.size === 0;
  }
  if (!searchParams) {
    return false;
  }
  return [...expectedParams.entries()].every(([key, value]) => searchParams.get(key) === value);
}
