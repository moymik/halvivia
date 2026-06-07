import 'server-only';
import { AuthUser, RegisterUser } from '../model/types';
import { sql } from '@/shared/lib/db';
import { User } from '@/entities/user';
import { DEFAULT_AVATAR_URL } from '../model/auth.config';

export async function findAuthUserByName(name: string): Promise<AuthUser | null> {
  const rows = (await sql`
    SELECT id, name, email, password_hash as "passwordHash", role
    FROM users
    WHERE name = ${name}
    LIMIT 1
  `) as AuthUser[];

  return rows[0] ?? null;
}

export async function createUser(data: RegisterUser): Promise<User> {
  const [row] = await sql`
    INSERT INTO users (name, email, password_hash, role, avatar_url)
    VALUES (${data.name}, ${data.email}, ${data.passwordHash}, ${data.role}, ${DEFAULT_AVATAR_URL})
    RETURNING id, name, email, discord_id, role, avatar_url
  `;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    discordId: row.discord_id,
    role: row.role,
    avatarUrl: row.avatar_url,
  };
}

export async function createDiscordUser(data: {
  name: string;
  discordId: string;
  password_hash: string;
  role: string;
}): Promise<User> {
  const [row] = await sql`
    INSERT INTO users (name, discord_id, password_hash, role, avatar_url)
    VALUES (${data.name}, ${data.discordId}, ${data.password_hash}, ${data.role}, ${DEFAULT_AVATAR_URL})
    RETURNING id, name,email, discord_id
  `;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    discordId: row.discord_id,
    role: row.role,
    avatarUrl: row.avatar_url,
  };
}

export async function linkDiscordAccount(userId: string, discordId: string, role: string) {
  const [row] = await sql`
    UPDATE users
    SET discord_id = ${discordId}, role = ${role}
    WHERE id = ${userId}
    RETURNING id, name,email, discord_id
  `;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    discordId: row.discord_id,
    avatarUrl: row.avatar_url,
  };
}
