'use client';

import { useTransition, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Subject } from '@/shared/model';
import { useRatingQuery } from '../model/useRatingQuery';
import { ratingQueryKey } from '../model/queryKeys';
import { setRatingAction } from '@/features/setRating/api/actions';
import { SetRatingButton } from '@/features/setRating/ui/SetRatingButton';
import { Props as ButtonProps } from './SetRatingButton';

type Props = {
  subject: Subject;
  userId: string;
  handleSuccessChange?: (newRating: number | null) => void;
  buttonVariant?: ButtonProps['variant'];
};

const RATINGS = [-1, 0, 1, 2] as const;

const ERROR_MESSAGES: Record<string, string> = {
  UNAUTHENTICATED: 'Пожалуйста, войдите в систему, чтобы поставить оценку.',
  DB_ERROR: 'Не удалось сохранить оценку. Попробуйте позже.',
  DEFAULT: 'Произошла непредвиденная ошибка.',
};

export function SetRatingRadio({
  subject,
  userId,
  handleSuccessChange,
  buttonVariant = 'dark',
}: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { data: currentRating } = useRatingQuery(userId, subject);

  const [error, setError] = useState<string | null>(null);

  const handleClick = (newRating: number) => {
    setError(null);

    startTransition(async () => {
      try {
        const res = await setRatingAction({
          subject,
          value: newRating,
        });

        if (!res.success) {
          setError(ERROR_MESSAGES[res.error] || ERROR_MESSAGES.DEFAULT);
          return;
        }
        const finalRating = res.data.value;

        queryClient.setQueryData(ratingQueryKey(userId, subject), finalRating);
        handleSuccessChange?.(finalRating);
      } catch (e) {
        setError(ERROR_MESSAGES.DEFAULT);
        console.error('Сбой при отправке рейтинга:', e);
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3.5 opacity-100">
        {RATINGS.map((value) => {
          return (
            <SetRatingButton
              key={value}
              active={value === currentRating}
              value={value}
              disabled={isPending}
              onClick={() => handleClick(value)}
              variant={buttonVariant}
            ></SetRatingButton>
          );
        })}
      </div>
      <p role="alert" className="animate-fadeIn text-xs font-medium text-red-500">
        {error}
      </p>
    </div>
  );
}
