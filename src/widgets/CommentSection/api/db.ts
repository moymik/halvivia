import { CommentEntityType } from '@/entities/comments/model/types';
import { DbCommentWithAuthor } from '@/widgets/CommentSection/model/types';
import { sql } from '@/shared/lib/db';
import { cacheLife } from 'next/cache';

export async function getCommentsWithAuthors({
  entityType,
  entityId,
}: {
  entityType: CommentEntityType;
  entityId: string;
}): Promise<DbCommentWithAuthor[]> {
  'use cache';
  cacheLife('seconds');

  return (await sql`
    SELECT
      c.*,
      u.name AS user_name,
      u.avatar_url AS user_avatar_url,
      u.role AS user_role
    FROM comments c
    INNER JOIN users u
      ON u.id = c.user_id
    WHERE c.entity_type = ${entityType}
      AND c.entity_id = ${entityId}
    ORDER BY c.created_at DESC
  `) as DbCommentWithAuthor[];
}
