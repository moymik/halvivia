export const DISCORD_API_BASE = 'https://discord.com/api/v10';

export const DISCORD_ENDPOINTS = {
  TOKEN: `${DISCORD_API_BASE}/oauth2/token`,
  USER: `${DISCORD_API_BASE}/users/@me`,
  GUILDS: `${DISCORD_API_BASE}/users/@me/guilds`,
};
