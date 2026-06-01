import { z } from 'zod';

export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string | null;
  password_hash: string;
};

export type CreateUserData = {
  name: string;
  email: string | null;
  passwordHash: string;
};

export type CreatedUser = {
  id: string;
  name: string;
  email: string | null;
};

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(20),
  email: z.string().email(),
});
