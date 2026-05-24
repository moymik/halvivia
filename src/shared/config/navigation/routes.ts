export const ROUTES = {
  HOME: '/',
  CINEMA: '/cinema',
  LIBRARY: '/library',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;

// type Route = "/" | "/cinema" | "/library" | "/terms" | "/privacy"
export type Route = (typeof ROUTES)[keyof typeof ROUTES];
