import Link from 'next/link';

import FilmIcon from '@/shared/assets/Film.svg';
import { Icon } from '@/shared/ui/icon';
import { IconName } from '@/shared/ui/icon/Icon';

type MenuSectionProps = {
  title: string;
  href: string;
  items: {
    title: string;
    href: string;
    icon: IconName;
  }[];
  onClose: () => void;
};

export function DropdownSection({ title, href, items, onClose }: MenuSectionProps) {
  return (
    <section className="bold flex flex-col items-start gap-4 pb-5 text-xl">
      <h3>
        <Link href={href} onClick={onClose}>
          <FilmIcon className="inline" />
          {title}
        </Link>
      </h3>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2 px-10">
            <Icon className="text-primary w-3.5" name={item.icon} />

            <Link href={item.href} onClick={onClose}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
