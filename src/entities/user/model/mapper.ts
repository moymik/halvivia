import { DBUser } from '@/shared/lib/db';
import { User } from './types';

export function mapDBUserToUser(db: DBUser): User {
  return {
    id: db.id,
    name: db.name,
    email: db.email,
    discordId: db.discord_id,
  };
}
