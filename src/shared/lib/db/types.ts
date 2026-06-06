import 'server-only';
import { UserRole } from '@/shared/model/auth/types';

export type DBUser = {
  id: string; // UUID
  name: string | null; // VARCHAR(20) UNIQUE (может быть null, если не вставлен)
  email: string | null; // CITEXT UNIQUE
  password_hash: string; // NOT NULL
  discord_id: string | null; // VARCHAR(20) UNIQUE
  avatar_url: string | null;
  role: UserRole;
};

export type DBRefreshToken = {
  id: string; // UUID
  user_id: string; // UUID FK -> users.id
  token: string; // TEXT UNIQUE
  expires_at: string; // TIMESTAMPTZ (в JS приходит string)
  created_at: string; // TIMESTAMPTZ (DEFAULT NOW())
};

export type DBPublicUser = {
  id: string; // UUID
  name: string | null; // VARCHAR(20) UNIQUE (может быть null, если не вставлен)
  email: string | null; // CITEXT UNIQUE
  password_hash: string; // NOT NULL
  discord_id: string | null; // VARCHAR(20) UNIQUE
  avatar_url: string | null;
  role: UserRole;
};
