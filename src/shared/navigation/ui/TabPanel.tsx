import Link from 'next/link';
import React from 'react';
import { NavigationLink } from '@/shared/navigation';

type Props = {
  links: NavigationLink[];
  className?: string;
};

export function TabPanel({ links, className }: Props) {
  return (
    <nav className={className}>
      <ul className="hidden h-full lg:flex">
        {links.map((l) => (
          <li key={l.href} className="border-border-default w-63 border">
            <Link
              href={l.href}
              className="h4 text-link-default hover:text-link-hover flex h-full w-full items-center justify-center hover:shadow-[0_6px_20px_-10px_rgba(255,255,255,0.6)]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TabPanel;
