import { CommentWithAuthor, CommentWithAuthorTree } from '@/widgets/CommentSection/model/types';

export function insertCommentWithAuthor(
  tree: CommentWithAuthorTree[],
  newComment: CommentWithAuthor,
): CommentWithAuthorTree[] {
  if (!newComment.parentId) {
    return [{ ...newComment, replies: [] }, ...tree];
  }

  const insertRecursively = (nodes: CommentWithAuthorTree[]): CommentWithAuthorTree[] => {
    return nodes.map((node) => {
      if (node.id === newComment.parentId) {
        return {
          ...node,
          replies: [...node.replies, { ...newComment, replies: [] }],
        };
      }

      return {
        ...node,
        replies: insertRecursively(node.replies),
      };
    });
  };

  return insertRecursively(tree);
}
