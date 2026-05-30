import { z } from 'zod';
export type User = {
  id: string; // UUID
  name: string; // VARCHAR(20)
  email: string; // CITEXT (в TS просто string)
};

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(20),
  email: z.string().email(),
});
