import React from 'react';
import clsx from 'clsx';
import { FooterLink } from '@/widgets/Footer/model/footer.data';
import Link from 'next/link';

type FooterNavListProps = {
  name: string;
  links: FooterLink[];
  className?: string;
};

export const FooterNavSection = ({ name, links, className }: FooterNavListProps) => {
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <h4 className="h4 text-sm font-bold lg:text-base">{name}</h4>

      <ul
        className={clsx(
          'flex flex-col text-xs md:text-sm lg:text-base',
          name === 'Контакты' ? 'gap-3' : 'gap-2.25',
        )}
      >
        {links.map((link) => (
          <li key={link.href} className={clsx('text- text-text-secondary text-xs lg:text-sm')}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'leading-6 hover:underline md:font-medium',
                  link.hideOnTablet && 'invisible lg:visible',
                )}
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className={clsx('hover:underline', link.hideOnTablet && 'invisible lg:visible')}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
