import z from 'zod';
import { RatingSchema, RatingValueSchema } from '@/entities/rating/model/schemas';

export type DbRating = {
  id: string;
  user_id: string;

  subject_type: string;
  subject_id: string;

  rating: number | null;

  created_at: string; // TIMESTAMPTZ -> ISO string
};

export type Rating = z.infer<typeof RatingSchema>;

export type RatingValue = z.infer<typeof RatingValueSchema>;
