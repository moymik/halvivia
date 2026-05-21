import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { FooterSection, isContactSection } from '../model/footerNavigation';
import { isExternalLink } from '@/shared/navigation';

type FooterNavListProps = FooterSection & {
  className?: string;
};

export function FooterNavSection({ id, title, links, className }: FooterNavListProps) {
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <h4 className="h4 text-sm font-bold lg:text-base">{title}</h4>

      <ul
        className={clsx(
          'flex flex-col text-xs md:text-sm lg:text-base',
          isContactSection({ id: id }) ? 'gap-3' : 'gap-2.25',
        )}
      >
        {links.map((link) => (
          <li
            key={link.href}
            className={clsx(
              'text- text-text-secondary text-xs lg:text-sm',
              link.hidden?.tablet && 'invisible lg:visible',
            )}
          >
            {isExternalLink(link.href) ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={'leading-6 hover:underline md:font-medium'}
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={'hover:underline'}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterNavSection;
