import { Comment, DbComment } from '@/entities/comments/model/types';
import { PublicUser } from '@/entities/user/model/types';

export type CommentWithAuthor = Comment & {
  author: PublicUser;
};

export type DbCommentWithAuthor = DbComment & {
  user_name: string | null;
  user_avatar_url: string | null;
  user_role: 'MEMBER' | 'GUEST' | null;
};

export type CommentWithAuthorTree = CommentWithAuthor & {
  replies: CommentWithAuthorTree[];
};
