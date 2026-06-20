import { CommentWithAuthor, DbCommentWithAuthor } from '@/widgets/CommentSection/model/types';
import { mapDbCommentToComment } from '@/entities/comments/model/mappers';

export function mapDbCommentWithAuthorToCommentWithAuthor(
  db: DbCommentWithAuthor,
): CommentWithAuthor {
  return {
    ...mapDbCommentToComment(db),

    author: {
      id: db.user_id,
      name: db.user_name,
      avatarUrl: db.user_avatar_url,
      role: db.user_role,
    },
  };
}
