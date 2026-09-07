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

export const UserNameSchema = z
  .string()
  .trim()
  .min(2, 'Имя должно содержать минимум 2 символа')
  .max(20, 'Имя должно содержать максимум 20 символов')
  .regex(/^\S+$/, 'Пробелы в имени не допускаются');
