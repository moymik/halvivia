import { Comment, DbComment } from './types';

export function mapDbCommentToComment(dbComment: DbComment): Comment {
  return {
    id: dbComment.id,
    userId: dbComment.user_id,
    content: dbComment.content,
    entityType: dbComment.entity_type,
    entityId: dbComment.entity_id,
    parentId: dbComment.parent_id,
    createdAt: dbComment.created_at,
  };
}

export function mapCommentToDbComment(comment: Comment): DbComment {
  return {
    id: comment.id,
    user_id: comment.userId,
    content: comment.content,
    entity_type: comment.entityType,
    entity_id: comment.entityId,
    parent_id: comment.parentId,
    created_at: comment.createdAt,
  };
}

export function mapDbCommentsToComments(dbComments: DbComment[]): Comment[] {
  return dbComments.map(mapDbCommentToComment);
}
export function mapCommentsToDbComments(comments: Comment[]): DbComment[] {
  return comments.map(mapCommentToDbComment);
}
