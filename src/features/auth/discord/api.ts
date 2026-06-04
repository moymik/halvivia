import { DiscordGuild, DiscordToken, DiscordUser } from './types';
import { findUserByDiscordId } from '@/entities/user/api/db';
import { createDiscordUser } from '@/features/auth';
import { generateRandomPassword, isMember } from './utils';
import { issueSession, withAuth } from '@/shared/lib/auth/dal';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/navigation';
import { NAVIGATION_LINKS } from '@/shared/config';
import { DISCORD_ENDPOINTS } from './constraints';
import { linkDiscordAccount } from '@/features/auth/model/db';

export async function handleDiscordAuth(
  state: string | null,
  discordUser: DiscordUser,
  guilds: DiscordGuild[],
) {
  if (state === 'login') {
    return loginWithDiscord(discordUser, guilds);
  }

  if (state === 'link') {
    return linkDiscord(discordUser, guilds);
  }

  return Response.json({ error: 'Invalid state' }, { status: 400 });
}

async function loginWithDiscord(discordUser: DiscordUser, guilds: DiscordGuild[]) {
  let user = await findUserByDiscordId(discordUser.id);

  if (!user) {
    user = await createDiscordUser({
      name: discordUser.username + '))000))0',
      discordId: discordUser.id,
      password_hash: generateRandomPassword(12),
      role: isMember(guilds) ? 'MEMBER' : 'GUEST',
    });
  }

  await issueSession({ userId: user.id, role: user.role });

  return redirect(ROUTES.HOME);
}

async function linkDiscord(discordUser: DiscordUser, guilds: DiscordGuild[]) {
  const session = await withAuth();

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existingUser = await findUserByDiscordId(discordUser.id);

  if (existingUser && existingUser.id !== session.userId) {
    return Response.json(
      {
        error: 'Discord account already linked to another user',
      },
      { status: 409 },
    );
  }

  const role: string = isMember(guilds) ? 'MEMBER' : 'GUEST';
  const res = await linkDiscordAccount(session.userId, discordUser.id, role);

  if (!res) {
    return Response.json({ error: 'Failed to link discord account' }, { status: 500 });
  }

  return redirect(NAVIGATION_LINKS.HOME.href);
}

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
