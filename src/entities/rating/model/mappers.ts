import {
  DbRating,
  DbRatingWithUser,
  Rating,
  RatingValue,
  RatingWithUser,
} from '@/entities/rating/model/types';
import { Subject } from '@/shared/model/subject/types';

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

export function mapDbToRatingWithUser(db: DbRatingWithUser): RatingWithUser {
  return {
    ...mapDbRatingToRating(db),

    user: {
      id: db.user.id,
      name: db.user.name,
      avatarUrl: db.user.avatar_url,
    },
  };
}
