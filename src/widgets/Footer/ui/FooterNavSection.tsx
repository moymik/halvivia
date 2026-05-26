import React from 'react';
import clsx from 'clsx';
import { AppLink } from '@/shared/ui/app-link';

import { FooterSection, isContactSection } from '../config/footer.config';
import { NAVIGATION_LINKS } from '@/shared/config';

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
              link.id === NAVIGATION_LINKS.email.id && 'invisible lg:visible',
            )}
          >
            <AppLink link={link}></AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterNavSection;
