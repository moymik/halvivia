import { DbRating, Rating, RatingValue } from '@/entities/rating/model/types';
import { Subject } from '@/subject/types';

export function normalizeRating(value: number | null): RatingValue {
  if (value === null) return null;
  switch (value) {
    case -1:
    case 0:
    case 1:
    case 2:
      return value;
    default:
      return null;
  }
}

export function mapDbRatingToRating(db: DbRating): Rating {
  const subject: Subject = {
    type: db.subject_type as Subject['type'],
    id: db.subject_id,
  };

  return {
    id: db.id,

    subject,

    value: normalizeRating(db.rating),

    createdAt: new Date(db.created_at),
  };
}
