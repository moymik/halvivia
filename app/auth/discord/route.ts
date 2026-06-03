import { exchangeCode, getGuilds, getDiscordUser } from './api';
import { handleLogin } from './login/api';
import { handleLink } from './link_discord/api';

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

    if (state === 'login') {
      return handleLogin(discordUser);
    }

    if (state === 'link') {
      return handleLink(discordUser);
    }

    return Response.json({ error: 'Invalid state' }, { status: 400 });
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

/*
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return Response.json({ error: 'No code provided' }, { status: 400 });
    }

    const token = await exchangeCode(code);

    const [discordUser, guilds] = await Promise.all([
      getDiscordUser(token.access_token),
      getGuilds(token.access_token),
    ]);

    const isMember = checkMember(guilds);

    console.log('discord info', discordUser, guilds, isMember);
    //тут будет условность, что имя не занято
    let id: string = '';
    const existingUser = await findUserByDiscordId(discordUser.id);

    if (!existingUser) {
      const newUser = await createDiscordUser({
        name: discordUser.username+':)',//тут есть условность что вдруг не окажется аккаунта с таким же именем как наш ник в дискорде. Потом поправлю
        discordId: discordUser.id,
        password_hash: generateRandomPassword(12),
      });
      if (!newUser) {
        return Response.json({ error: 'Not able to create user' }, { status: 500 });
      }
      console.log('successfully created user', discordUser);
      id = newUser.id;
    } else {
      id = existingUser.id;
    }

    //создаем сессию
    await issueSession(id);
  } catch (err) {
    return Response.json({ error: 'unexpected_error', message: String(err) }, { status: 500 });
  }
  return redirect(ROUTES.HOME);
}
*/

/*
token = {
  token_type: 'Bearer',
  access_token: 'MTUxMTE5.......',
  expires_in: 604800,
  refresh_token: 'dasd......',
  scope: 'identify guilds',
};
user
{
  id: '839840459736088626',
  username: 'nctrc',
  avatar: null,
  discriminator: '0',
  public_flags: 0,
  flags: 0,
  banner: null,
  accent_color: null,
  global_name: 'NCTRC',
  avatar_decoration_data: null,
  collectibles: null,
  display_name_styles: null,
  banner_color: null,
  clan: null,
  primary_guild: null,
  mfa_enabled: false,
  locale: 'ru',
  premium_type: 0
}

guilds
[
  {
    id: '623964456929591297',
    name: 'Halva Povidlo Billion Club',
    icon: 'a_21e60d08c36f4f8b39be9f9b28254b0e',
    banner: null,
    owner: false,
    permissions: '9003899767225971',
    features: [
      'AUDIO_BITRATE_128_KBPS',
      'ANIMATED_ICON',
      'CHANNEL_ICON_EMOJIS_GENERATED',
      'VIDEO_BITRATE_ENHANCED',
      'TIERLESS_BOOSTING_SYSTEM_MESSAGE',
      'STAGE_CHANNEL_VIEWERS_50',
      'BYPASS_SLOWMODE_PERMISSION_MIGRATION_COMPLETE',
      'INVITE_SPLASH',
      'PIN_PERMISSION_MIGRATION_COMPLETE',
      'SOUNDBOARD',
      'TIERLESS_BOOSTING',
      'VIDEO_QUALITY_720_60FPS'
    ]
  },
  {
    id: '839841888277233675',
    name: 'Сервер NCTRC',
    icon: null,
    banner: null,
    owner: true,
    permissions: '18014398509481983',
    features: [ 'EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT' ]
  },
  {
    id: '1083294372138856478',
    name: 'Сервер SALLIWAN',
    icon: null,
    banner: null,
    owner: false,
    permissions: '2248473465835073',
    features: []
  }
]
*/
