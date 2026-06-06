import Link from 'next/link';

import type { NavigationLink } from '@/shared/config/navigation/types';
import { isExternalLink } from '@/shared/config/navigation';
import { cn } from '@/shared/lib/utils';

export type AppLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  link: NavigationLink;
  hideLabel?: boolean;
  query?: Record<string, string | number | boolean>;
};

const baseStyles =
  'transition-[background-color,border-color,color,opacity] duration-300 ease-out hover:text-white';

export function AppLink({ link, className, children, hideLabel, href, ...props }: AppLinkProps) {
  if (isExternalLink(link)) {
    return (
      <a
        href={href ? href : link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, className)}
        {...props}
      >
        {!hideLabel ? link.label : ''}
        {children}
      </a>
    );
  }
  return (
    <Link href={href ? href : link.href} className={cn(baseStyles, className)} {...props}>
      {!hideLabel ? link.label : ''}
      {children}
    </Link>
  );
}

export default AppLink;
