import { z } from 'zod';
import { SubjectSchema } from '@/shared/model/subject/schema';

export const RatingValueSchema = z.union([
  z.literal(-1),
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.null(),
]);
export const RatingSchema = z.object({
  id: z.string().uuid(),

  subject: SubjectSchema,

  value: RatingValueSchema,

  createdAt: z.date(),
});
