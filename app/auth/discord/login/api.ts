import { findUserByDiscordId } from '@/entities/user/api/db';
import { createDiscordUser } from '@/features/auth';
import { generateRandomPassword } from '../utils';
import { issueSession } from '@/shared/lib/auth/dal';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/navigation';
import { DiscordUser } from '../types';

export async function handleLogin(discordUser: DiscordUser) {
  let user = await findUserByDiscordId(discordUser.id);

  if (!user) {
    user = await createDiscordUser({
      name: discordUser.username,
      discordId: discordUser.id,
      password_hash: generateRandomPassword(12),
    });
  }

  await issueSession(user.id);

  return redirect(ROUTES.HOME);
}
