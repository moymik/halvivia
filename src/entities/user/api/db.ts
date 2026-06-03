import 'server-only';

import { sql } from '@/shared/lib/db';
import { User } from '../model/types';

export async function findUserByName(name: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, name, email
    FROM users
    WHERE name = ${name}
    LIMIT 1
  `;

  return (user as User | undefined) ?? null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, name, email
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  return (user as User | undefined) ?? null;
}

export async function findUserByDiscordId(discordId: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, name, email, discord_id
    FROM users
    WHERE discord_id = ${discordId}
    LIMIT 1
  `;

  return (user as User | undefined) ?? null;
}
export async function linkDiscordAccount(userId: string, discordId: string) {
  const [user] = await sql`
    UPDATE users
    SET discord_id = ${discordId}
    WHERE id = ${userId}
    RETURNING id, name, discord_id
  `;

  return user ?? null;
}
