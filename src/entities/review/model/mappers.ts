import { DbReviewWithRating, Review } from '@/entities/review/model/types';
import { SubjectType } from '@/subject/types';

export function mapDbReviewWithRatingToReview(db: DbReviewWithRating): Review {
  return {
    id: db.review_id,

    userId: db.user_id,

    subject: {
      type: db.subject_type as SubjectType,
      id: db.subject_id,
    },

    title: db.title,
    text: db.review_text,

    ratingValue: db.rating_value,

    createdAt: new Date(db.review_created_at),
  };
}
