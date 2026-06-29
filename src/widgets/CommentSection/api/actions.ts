'use server';
import { CommentEntityType } from '@/entities/comments/model/types';
import { verifySession } from '@/shared/lib/auth';
import { GetCommentsSchema } from '../model/schemas';

import { ActionResult } from '@/shared/model';
import { getCommentsWithAuthors } from '@/widgets/CommentSection/api/db';
import { CommentWithAuthorTree } from '@/widgets/CommentSection/model/types';
import { buildCommentWithAuthorTree } from '@/widgets/CommentSection/model/buildCommentWithAuthorTree';
import { mapDbCommentWithAuthorToCommentWithAuthor } from '@/widgets/CommentSection/model/mappers';

export async function getCommentsWithAuthorAction(input: {
  entityType: CommentEntityType;
  entityId: string;
}): Promise<ActionResult<CommentWithAuthorTree[]>> {
  const session = await verifySession();

  if (session.status === 'unauthenticated') {
    return {
      success: false,
      error: 'UNAUTHENTICATED',
    };
  }

  const parsed = GetCommentsSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: 'VALIDATION_ERROR',
    };
  }

  try {
    const dbComments = await getCommentsWithAuthors(input);

    const tree = buildCommentWithAuthorTree(
      dbComments.map(mapDbCommentWithAuthorToCommentWithAuthor),
    );

    return {
      success: true,
      data: tree,
    };
  } catch (error) {
    console.error('Failed to fetch comments', error);

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}
