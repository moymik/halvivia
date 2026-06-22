'use server';
import { withAuth } from '@/shared/lib/auth';
import { createComment } from '@/entities/comments/api/db';
import { CreateCommentInput } from '@/entities/comments/model/types';
import { Comment } from '@/entities/comments/model/types';
import { mapDbCommentToComment } from '@/entities/comments/model/mappers';
import { AppErrorCode } from '@/shared';
import { CreateCommentSchema } from '@/entities/comments/model/schemas';

export type ActionErrorCode = AppErrorCode;

export type ActionResult<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: ActionErrorCode;
    };

export async function createCommentAction(
  input: CreateCommentInput,
): Promise<ActionResult<Comment>> {
  const parsed = CreateCommentSchema.safeParse(input);

  if (!parsed.success) {
    console.error(parsed.error);
    return {
      success: false,
      error: 'VALIDATION_ERROR',
    };
  }

  const session = await withAuth();

  if (session.status === 'unauthenticated') {
    return {
      success: false,
      error: 'UNAUTHENTICATED',
    };
  }

  if (session.payload.role !== 'MEMBER') {
    return {
      success: false,
      error: 'UNAUTHORIZED',
    };
  }

  try {
    const dbComment = await createComment({
      ...parsed.data,
      userId: session.payload.userId,
    });

    return {
      success: true,
      data: mapDbCommentToComment(dbComment),
    };
  } catch (error) {
    console.error('Failed to create comment', error);

    return {
      success: false,
      error: 'DB_ERROR',
    };
  }
}
