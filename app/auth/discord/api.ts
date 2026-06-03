import { DiscordGuild, DiscordToken, DiscordUser } from './types';
import { NAVIGATION_LINKS } from '@/shared/config';
import { DISCORD_ENDPOINTS } from './constraints';

export async function exchangeCode(code: string): Promise<DiscordToken> {
  const res = await fetch(DISCORD_ENDPOINTS.TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`,
        ).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: NAVIGATION_LINKS.DISCORD_REDIRECT.href,
    }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function getDiscordUser(accessToken: string): Promise<DiscordUser> {
  const res = await fetch(DISCORD_ENDPOINTS.USER, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
}

export async function getGuilds(accessToken: string): Promise<DiscordGuild[]> {
  const res = await fetch(DISCORD_ENDPOINTS.GUILDS, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch guilds');
  }

  return res.json();
}
