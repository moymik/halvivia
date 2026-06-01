import 'server-only';

import { sql } from '@/shared/lib/db';
import type { AuthUser, CreatedUser, CreateUserData, User } from '../model/types';

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

export async function findAuthUserByName(name: string): Promise<AuthUser | null> {
  const [user] = await sql`
    SELECT id, name, email, password_hash
    FROM users
    WHERE name = ${name}
    LIMIT 1
  `;

  return (user as AuthUser | undefined) ?? null;
}

export async function createUser(data: CreateUserData): Promise<CreatedUser> {
  const [user] = await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (${data.name}, ${data.email}, ${data.passwordHash})
    RETURNING id, name, email
  `;

  return user as CreatedUser;
}
