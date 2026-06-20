import { CommentEntityTypeSchema, CreateCommentSchema } from '@/entities/comments/model/schemas';
import { z } from 'zod';

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
export type CommentEntityType = z.infer<typeof CommentEntityTypeSchema>;

export type DbComment = {
  id: string;
  user_id: string;
  content: string;
  entity_type: CommentEntityType;
  entity_id: string;
  parent_id: string | null;
  created_at: Date;
};

export type Comment = {
  id: string;
  userId: string;
  content: string;
  entityType: CommentEntityType;
  entityId: string;
  parentId: string | null;
  createdAt: Date;
};

export type CommentTree = Comment & {
  replies: CommentTree[];
};
