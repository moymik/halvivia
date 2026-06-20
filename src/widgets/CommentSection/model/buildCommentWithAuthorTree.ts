import { CommentWithAuthor, CommentWithAuthorTree } from '../model/types';

const reverseReplies = (node: CommentWithAuthorTree) => {
  node.replies.reverse();
  for (const reply of node.replies) {
    reverseReplies(reply);
  }
};

export function buildCommentWithAuthorTree(comments: CommentWithAuthor[]): CommentWithAuthorTree[] {
  const map = new Map<string, CommentWithAuthorTree>();
  const roots: CommentWithAuthorTree[] = [];

  for (const c of comments) {
    map.set(c.id, { ...c, replies: [] });
  }

  for (const node of map.values()) {
    if (node.parentId) {
      map.get(node.parentId)?.replies.push(node);
    } else {
      roots.push(node);
    }
  }

  //чтобы ответы отображались по возрастанию даты, а обычные комментарии - по убыванию
  for (const root of roots) {
    reverseReplies(root);
  }

  return roots;
}
