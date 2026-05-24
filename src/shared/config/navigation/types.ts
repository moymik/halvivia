import type { Route } from './routes';

export type ExternalHref =
  | `http://${string}`
  | `https://${string}`
  | `mailto:${string}`
  | `tel:${string}`;

export type NavigationHref = Route | ExternalHref;

export type NavigationLink = {
  id: string;
  label: string;
  href: NavigationHref;
};

export type ExternalLink = NavigationLink & { href: ExternalHref };
