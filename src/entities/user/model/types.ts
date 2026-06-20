import { z } from 'zod';

export type User = {
  id: string;
  name: string | null;
  discordId: string | null;
  email: string | null;
  role: 'MEMBER' | 'GUEST' | null;
  avatarUrl: string | null;
};

export type PublicUser = Pick<User, 'id' | 'name' | 'avatarUrl' | 'role'>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(20),
  email: z.string().email(),
});
