import { redirect } from 'next/navigation';
import { findUserByDiscordId } from '@/entities/user/api/db';
import { DiscordUser } from '../types';
import { withAuth } from '@/shared/lib/auth/dal';
import { linkDiscordAccount } from '@/features/auth/model/db';
import { NAVIGATION_LINKS } from '@/shared/config';

export async function handleLink(discordUser: DiscordUser) {
  const { userId } = await withAuth();

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existingUser = await findUserByDiscordId(discordUser.id);

  if (existingUser && existingUser.id !== userId) {
    return Response.json(
      {
        error: 'Discord account already linked to another user',
      },
      { status: 409 },
    );
  }

  const res = await linkDiscordAccount(userId, discordUser.id);
  if (!res) {
    return Response.json({ error: 'Failed to link discord account' }, { status: 500 });
  }
  return redirect(NAVIGATION_LINKS.HOME.href);
}
