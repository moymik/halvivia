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
      role          VARCHAR(20),
      avatar_url    VARCHAR(255)
    );
  `;
  // (на самом деле это avatar uri а не url)
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

async function createFilmsTable() {
  await sql`
    CREATE TABLE films
    (
      id                          UUID PRIMARY KEY     DEFAULT gen_random_uuid(),

      kinopoisk_id                INTEGER     NOT NULL,
      kinopoisk_hd_id             TEXT,
      imdb_id                     TEXT,

      name_ru                     TEXT,
      name_en                     TEXT,
      name_original               TEXT,

      poster_url                  TEXT        NOT NULL,
      poster_url_preview          TEXT        NOT NULL,

      rating_imdb                 NUMERIC,

      rating_kinopoisk            NUMERIC,
  

      web_url                     TEXT        NOT NULL,

      year                        INTEGER,
      film_length                 INTEGER,

      slogan                      TEXT,
      description                 TEXT,

      type                        TEXT        NOT NULL,

      rating_age_limits           TEXT,

      last_sync                   TIMESTAMP   NOT NULL,

      countries                   TEXT[]      NOT NULL DEFAULT '{}',

      start_year                  INTEGER,
      end_year                    INTEGER,

      serial                      BOOLEAN,
      short_film                  BOOLEAN,
      completed                   BOOLEAN,
      created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX idx_films_created_at
      ON films (created_at DESC);
  `;

  await sql`CREATE TABLE genres (
                                  id SERIAL PRIMARY KEY,
                                  name TEXT NOT NULL UNIQUE
            );`;

  await sql`CREATE TABLE film_genres (
                                       film_id TEXT NOT NULL REFERENCES films(id) ON DELETE CASCADE,
                                       genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE,

                                       PRIMARY KEY (film_id, genre_id)
            );
  CREATE INDEX idx_film_genres_genre_id
    ON film_genres (genre_id);

`;
}

async function main() {}

main();
