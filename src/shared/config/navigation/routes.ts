export const ROUTES = {
  HOME: '/',
  CINEMA: '/cinema',
  LIBRARY: '/library',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DISCORD_LOGIN: '/auth/discord/login',
  DISCORD_LINK_ACCOUNT: '/auth/discord/link_discord',
} as const;

// type Route = "/" | "/cinema" | "/library" | "/terms" | "/privacy"
export type Route = (typeof ROUTES)[keyof typeof ROUTES];
