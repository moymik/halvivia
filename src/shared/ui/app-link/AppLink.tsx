import { ReactNode } from 'react';

import Link from 'next/link';

import type { NavigationLink } from '@/shared/config/navigation/types';
import { isExternalLink } from '@/shared/config/navigation';

export type AppLinkProps = {
  link: NavigationLink;
  className?: string;
  children?: ReactNode;
  hideLabel?: boolean;
};

export function AppLink({ link, className, children, hideLabel }: AppLinkProps) {
  if (isExternalLink(link)) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {!hideLabel ? link.label : ''}
        {children}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {!hideLabel ? link.label : ''}
      {children}
    </Link>
  );
}

export default AppLink;
