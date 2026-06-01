import { sql } from '../db';

export async function insertRefreshToken(params: {
  userId: string;
  token: string;
  expiresAt: Date;
}) {
  await sql`
    INSERT INTO refresh_tokens (user_id, token, expires_at)
    VALUES (${params.userId}, ${params.token}, ${params.expiresAt})
  `;
}

export async function findRefreshToken(token: string) {
  const result = await sql`
    SELECT user_id, expires_at
    FROM refresh_tokens
    WHERE token = ${token}
    LIMIT 1
  `;
  return result[0] ?? null;
}

export async function deleteRefreshToken(token: string) {
  await sql`
    DELETE FROM refresh_tokens
    WHERE token = ${token}
  `;
}

export async function deleteAllUserTokens(userId: string) {
  await sql`
    DELETE
    FROM refresh_tokens
    WHERE user_id = ${userId}
  `;
}
