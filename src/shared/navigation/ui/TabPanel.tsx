import Link from 'next/link';
import React from 'react';

type TabItem = {
  href: string;
  label: string;
};

type Props = {
  items: TabItem[];
  className?: string;
};

export function TabPanel({ items, className }: Props) {
  return (
    <nav className={className}>
      <ul className="hidden h-full lg:flex">
        {items.map((item) => (
          <li key={item.href} className="border-border-default w-63 border">
            <Link
              href={item.href}
              className="h4 text-link-default hover:text-link-hover flex h-full w-full items-center justify-center hover:shadow-[0_6px_20px_-10px_rgba(255,255,255,0.6)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TabPanel;
