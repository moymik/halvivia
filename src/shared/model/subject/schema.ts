import { z } from 'zod';

export const SubjectTypeSchema = z.enum(['film', 'book']);

export const SubjectSchema = z.object({
  type: SubjectTypeSchema,
  id: z.string().uuid(),
});
