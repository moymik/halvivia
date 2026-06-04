import 'server-only';
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL as string);

async function createUserTable() {
  // Создаем расширение UUID
  await sql`CREATE EXTENSION IF NOT EXISTS citext;\n`;
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
  // Создаем таблицу users
  await sql`
    CREATE TABLE IF NOT EXISTS users
    (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          VARCHAR(20) UNIQUE,
      email         CITEXT      UNIQUE,
      password_hash TEXT        NOT NULL,
      discord_id    VARCHAR(20) UNIQUE,
      role          VARCHAR(20)
    );
  `;
}

async function createRefreshTokensTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto;`;

  await sql`
    CREATE TABLE IF NOT EXISTS refresh_tokens
    (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token      TEXT        NOT NULL UNIQUE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx
      ON refresh_tokens(user_id);
  `;
}

async function main() {
  //
}

main();
