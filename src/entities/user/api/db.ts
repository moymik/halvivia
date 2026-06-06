import 'server-only';

import { sql } from '@/shared/lib/db';
import { User } from '../model/types';
import { mapDBUserToUser } from '@/entities/user/model/mapper';
import { DBPublicUser } from '@/shared/lib/db/types';

export async function findUserByName(name: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, name, email, discord_id, role, avatar_url
    FROM users
    WHERE name = ${name}
    LIMIT 1
  `;

  if (!user) return null;
  return mapDBUserToUser(user as DBPublicUser);
}

export async function findUserById(id: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, name, email, discord_id, role, avatar_url
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;
  if (!user) return null;
  return mapDBUserToUser(user as DBPublicUser);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, name, email, discord_id, role, avatar_url
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;
  if (!user) return null;
  return mapDBUserToUser(user as DBPublicUser);
}

export async function findUserByDiscordId(discordId: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, name, email, discord_id, role, avatar_url
    FROM users
    WHERE discord_id = ${discordId}
    LIMIT 1
  `;

  if (!user) return null;
  return mapDBUserToUser(user as DBPublicUser);
}
