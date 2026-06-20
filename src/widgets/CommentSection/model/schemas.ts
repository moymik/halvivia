import { CommentEntityTypeSchema } from '@/entities/comments/model/schemas';
import { z } from 'zod';
export const GetCommentsSchema = z.object({
  entityType: CommentEntityTypeSchema,
  entityId: z.string().uuid(),
});
