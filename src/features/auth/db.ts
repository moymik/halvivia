import 'server-only';
import { AuthUser, RegisterUser } from './types';
import { sql } from '@/shared/lib/db';
import { User } from '@/entities/user';

export async function findAuthUserByName(name: string): Promise<AuthUser | null> {
  const rows = (await sql`
    SELECT id, name, email, password_hash as "passwordHash"
    FROM users 
    WHERE name = ${name} 
    LIMIT 1
  `) as AuthUser[];

  return rows[0] ?? null;
}

export async function createUser(data: RegisterUser): Promise<User> {
  const [row] = await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (${data.name}, ${data.email}, ${data.passwordHash})
    RETURNING id, name, email, discord_id
  `;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    discordId: row.discord_id,
  };
}

export async function createDiscordUser(data: {
  name: string;
  discordId: string;
  password_hash: string;
}): Promise<User> {
  const [row] = await sql`
    INSERT INTO users (name, discord_id, password_hash)
    VALUES (${data.name}, ${data.discordId}, ${data.password_hash})
    RETURNING id, name,email, discord_id
  `;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    discordId: row.discord_id,
  };
}

export async function linkDiscordAccount(userId: string, discordId: string) {
  const [row] = await sql`
    UPDATE users
    SET discord_id = ${discordId}
    WHERE id = ${userId}
    RETURNING id, name,email, discord_id
  `;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    discordId: row.discord_id,
  };
}
