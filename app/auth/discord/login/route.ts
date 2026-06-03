import { redirect } from 'next/navigation';
import { NAVIGATION_LINKS } from '@/shared/config';

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    response_type: 'code',
    scope: 'identify guilds',
    redirect_uri: NAVIGATION_LINKS.DISCORD_REDIRECT.href,
    state: 'login',
  });

  redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
}
