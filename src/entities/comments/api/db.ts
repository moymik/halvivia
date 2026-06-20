import { sql } from '@/shared/lib/db';

('server-only');

import { CommentEntityType, DbComment } from '@/entities/comments/model/types';

export type CreateCommentParams = {
  userId: string;
  content: string;
  entityType: CommentEntityType;
  entityId: string;
  parentId?: string | null;
};

export async function createComment(params: CreateCommentParams): Promise<DbComment> {
  const { userId, content, entityType, entityId, parentId = null } = params;
  const rows = await sql`
    INSERT INTO comments (
      user_id,
      content,
      entity_type,
      entity_id,
      parent_id
    )
    VALUES (
      ${userId},
      ${content},
      ${entityType},
      ${entityId},
      ${parentId}
    )
    RETURNING *;
  `;

  return rows[0] as DbComment;
}

export async function getComments({
  entityType,
  entityId,
}: {
  entityType: CommentEntityType;
  entityId: string;
}) {
  const rows = (await sql`
    SELECT *
    FROM comments
    WHERE entity_type = ${entityType}
      AND entity_id = ${entityId}
    ORDER BY created_at ASC;
  `) as DbComment[];

  return rows;
}
