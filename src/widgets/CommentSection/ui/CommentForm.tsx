'use client';

import { useState, useTransition } from 'react';
import { createCommentAction } from '@/entities/comments/api/actions';
import { CreateCommentInput } from '@/entities/comments/model/types';
import { Button } from '@/shared/ui/Button';
import { CommentWithAuthor } from '@/widgets/CommentSection/model/types';
import { useCurrentUserStore } from '@/entities/user/model/currentUserStore';
import CrossIcon from '@/shared/ui/icons/CrossIcon';
import Smile from '@/shared/assets/smile.svg';
import Clip from '@/shared/assets/clip.svg';
import UserAvatarMini from '@/entities/user/ui/UserAvatarMini';
import { parseCommentFormError } from '@/widgets/CommentSection/ui/parseCommentFormError';

type Props = Omit<CreateCommentInput, 'content'> & {
  onCreated?: (comment: CommentWithAuthor) => void;
  currentAnswerTo: CommentWithAuthor | null;
  setCurrentAnswerTo: (currentAnswerTo: CommentWithAuthor | null) => void;
};

export function CommentForm({
  entityId,
  entityType,
  onCreated,
  currentAnswerTo,
  setCurrentAnswerTo,
}: Props) {
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const currentUser = useCurrentUserStore((state) => state.currentUser);

  const handleSubmit = () => {
    const trimmed = content.trim();

    if (trimmed.length < 2) {
      setError('Введите хотя бы два символа');
      return;
    }

    setError(null);

    startTransition(async () => {
      if (!currentUser) {
        setError('Войдите в аккаунт, чтобы оставить комментарий');
        return;
      }

      const res = await createCommentAction({
        content: trimmed,
        entityId,
        entityType,
        parentId: currentAnswerTo?.id,
      });

      if (!res.success) {
        setError(parseCommentFormError(res));
        return;
      }

      setContent('');
      onCreated?.({
        ...res.data,
        author: {
          id: currentUser.id,
          name: currentUser?.name,
          avatarUrl: currentUser?.avatarUrl,
          role: currentUser?.role,
        },
      });
    });
  };

  return (
    <div
      className={`mb-3 flex flex-col items-center gap-2 md:flex-row ${currentAnswerTo === null ? 'md:items-center' : 'md items-start'} md:gap-13`}
    >
      <UserAvatarMini className="hidden h-12 w-12 md:flex lg:h-16 lg:w-16" user={currentUser} />
      <div className={'flex w-full flex-1 flex-col gap-4'}>
        {currentAnswerTo && (
          <div className={'relative flex w-full flex-row items-center gap-4'}>
            <div
              className={
                'bg-primary-080 border-primary relative min-h-3 w-full rounded-xl border-l-4 px-5 py-1'
              }
            >
              <h4 className={'leading-5 font-medium'}>{currentAnswerTo?.author.name} </h4>
              <span className={'text-sm'}> {currentAnswerTo.content} </span>
            </div>
            <button className={'right-1 w-3'}>
              <CrossIcon onClick={() => setCurrentAnswerTo(null)}></CrossIcon>
            </button>
          </div>
        )}
        <div
          className={
            //-mx-4 тут чтобы убрать дефолтные паддинги на мобилке
            'bg-bg-base-050 -mx-4 flex flex-row items-center gap-4 p-5 md:mx-0 md:rounded-[60px] md:px-6 md:py-3'
          }
        >
          <Smile></Smile>
          <div className={'relative flex w-full flex-1 flex-col'}>
            <textarea
              name="commentTextArea"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(null);
              }}
              placeholder={'Напиши что-нибудь...'}
              className={
                'md:text-s field-sizing-content resize-none text-xs leading-5 focus:border-none focus-visible:outline-none'
              }
            />
            {error && <div className={'text-error absolute -bottom-2 text-xs'}>{error}</div>}
          </div>
          <Clip></Clip>
        </div>
      </div>
      <Button
        variant={'primaryOnLight'}
        onClick={handleSubmit}
        disabled={isPending}
        className={`${content.length === 0 && 'hidden'} w-[calc(100vw-32px)] md:flex md:w-47.5`}
      >
        {isPending ? 'Ожидание...' : 'Отправить'}
      </Button>
    </div>
  );
}
