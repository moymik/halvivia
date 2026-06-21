import { DbReviewWithRatingSchema, ReviewSchema } from '@/entities/review/model/schemas';
import { z } from 'zod';

export type DbReview = {
  id: string;
  user_id: string;

  subject_type: string;
  subject_id: string;

  title: string | null;
  review_text: string | null;

  created_at: string;
};

export type DbReviewWithRating = z.infer<typeof DbReviewWithRatingSchema>;

export type Review = z.infer<typeof ReviewSchema>;
