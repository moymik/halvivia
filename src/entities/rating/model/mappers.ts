import { DbRating, DbRatingWithUser, Rating, RatingWithUser } from '@/entities/rating/model/types';
import { Subject } from '@/shared/model/subject/types';

export function mapDbRatingToRating(db: DbRating): Rating {
  const subject: Subject = {
    type: db.subject_type as Subject['type'],
    id: db.subject_id,
  };

  return {
    id: db.id,

    subject,

    value: db.rating,

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
