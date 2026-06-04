'use server';

import { redirect } from 'next/navigation';
import { NAVIGATION_LINKS } from '@/shared/config';

export type DiscordAuthState = 'login' | 'link';

export async function startDiscordAuthAction(state: DiscordAuthState, _formData?: FormData) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    response_type: 'code',
    scope: 'identify guilds',
    redirect_uri: NAVIGATION_LINKS.DISCORD_REDIRECT.href,
    state,
  });

  redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
}
export const startDiscordLoginAction = startDiscordAuthAction.bind(null, 'login');
export const startDiscordLinkAction = startDiscordAuthAction.bind(null, 'link');
