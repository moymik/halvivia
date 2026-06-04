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
    INSERT INTO users (name, email, password_hash, role)
    VALUES (${data.name}, ${data.email}, ${data.passwordHash}, ${'GUEST'})
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
  role: string;
}): Promise<User> {
  const [row] = await sql`
    INSERT INTO users (name, discord_id, password_hash, role)
    VALUES (${data.name}, ${data.discordId}, ${data.password_hash}, ${data.role})
    RETURNING id, name,email, discord_id
  `;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    discordId: row.discord_id,
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
  };
}
