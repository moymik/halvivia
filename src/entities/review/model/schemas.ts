import { z } from 'zod';
import { RatingValueSchema } from '@/entities/rating/model/schemas';
import { SubjectSchema, SubjectTypeSchema } from '@/shared/model/subject/schema';

export const ReviewSchema = z.object({
  id: z.string().uuid(),
  subject: SubjectSchema,
  userId: z.string().uuid(),

  title: z.string().max(100).nullable(),
  text: z.string().nullable(),

  createdAt: z.date(),
  ratingValue: RatingValueSchema,
});

export const DbReviewWithRatingSchema = z.object({
  review_id: z.string().uuid(),

  user_id: z.string().uuid(),

  subject_type: SubjectTypeSchema,
  subject_id: z.string().uuid(),

  title: z.string().max(100).nullable(),
  review_text: z.string().nullable(),

  review_created_at: z.string(),

  rating_value: RatingValueSchema,
});
