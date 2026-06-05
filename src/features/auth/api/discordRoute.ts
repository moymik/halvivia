import {
  exchangeCode,
  getDiscordUser,
  getGuilds,
  handleDiscordAuth,
} from '@/features/auth/api/discordActions';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      return Response.json({ error: 'No code provided' }, { status: 400 });
    }

    const token = await exchangeCode(code);

    const discordUser = await getDiscordUser(token.access_token);
    const guilds = await getGuilds(token.access_token);

    return handleDiscordAuth(state, discordUser, guilds);
  } catch (err) {
    return Response.json(
      {
        error: 'unexpected_error',
        message: String(err),
      },
      { status: 500 },
    );
  }
}
