import { sql } from '@/shared/lib/db';
export async function findUserByName(name: string) {
  const [user] = await sql`
    SELECT *
    FROM users
    WHERE name = ${name}
    LIMIT 1
  `;

  return user ?? null;
}

export async function findUserByEmail(email: string) {
  const [user] = await sql`
    SELECT *
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  return user ?? null;
}

export async function createUser(data: {
  name: string;
  email: string | null;
  passwordHash: string;
}) {
  const [user] = await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (${data.name}, ${data.email}, ${data.passwordHash})
    RETURNING id, name, email
  `;
  return user;
}
