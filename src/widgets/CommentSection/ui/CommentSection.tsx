'use client';

import { useEffect, useState, useTransition } from 'react';
import { CreateCommentInput } from '@/entities/comments/model/types';
import { CommentForm } from '@/widgets/CommentSection/ui/CommentForm';

import { cn } from '@/shared';
import { CommentWithAuthor, CommentWithAuthorTree } from '@/widgets/CommentSection/model/types';
import { getCommentsWithAuthorAction } from '@/widgets/CommentSection/api/actions';
import { CommentNode } from '@/widgets/CommentSection/ui/CommentNode';
import { insertCommentWithAuthor } from '@/widgets/CommentSection/model/insertCommentWithAuthor';
type Props = Omit<CreateCommentInput, 'content'> & { className: string };

export function CommentSection({ entityType, entityId, className }: Props) {
  const [comments, setComments] = useState<CommentWithAuthorTree[]>([]);
  const [isPending, startTransition] = useTransition();
  const [currentAnswerTo, setCurrentAnswerTo] = useState<CommentWithAuthor | null>(null);

  //const user = getCurrentAuthUser() // тут поменять на общее хранилище
  useEffect(() => {
    startTransition(async () => {
      const res = await getCommentsWithAuthorAction({
        entityType,
        entityId,
      });

      if (!res.success) return;

      const tree = res.data;
      setComments(tree);
    });
  }, [entityType, entityId]);

  return (
    <section
      className={cn(
        'border-border-default text-text-inverse page-content-width mb-16 flex flex-col gap-5 border',
        className,
      )}
    >
      <h2 className={'lg:text-h2-size mt-8 text-xl font-bold'}>Комментарии</h2>

      <CommentForm
        entityId={entityId}
        entityType={entityType}
        currentAnswerTo={currentAnswerTo}
        setCurrentAnswerTo={setCurrentAnswerTo}
        onCreated={(newComment: CommentWithAuthor) => {
          setComments((prev) => insertCommentWithAuthor(prev, newComment));
        }}
      />
      <div className={'flex flex-col gap-4 lg:gap-6'}>
        {isPending && <div>Loading...</div>}

        {comments.map((c) => (
          <CommentNode
            key={c.id}
            comment={c}
            onReply={(reply) => {
              setCurrentAnswerTo(reply);
            }}
          />
        ))}
      </div>
    </section>
  );
}
