import 'server-only';
import { User } from './types';
import { DBPublicUser } from '@/shared/lib/db/types';

export function mapDBUserToUser(db: DBPublicUser): User {
  return {
    id: db.id,
    name: db.name,
    email: db.email,
    discordId: db.discord_id,
    role: db.role,
    avatarUrl: db.avatar_url,
  };
}
