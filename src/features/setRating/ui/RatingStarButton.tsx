'use client';

import { Subject } from '@/shared/model';
import { useState } from 'react';
import { Icon } from '@/shared/ui/icon';
import { SetRatingRadio } from '@/features/setRating/ui/SetRatingRadio';
import { useCurrentUserStore } from '@/entities/user/model/currentUserStore';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import { useRatingQuery } from '../model/useRatingQuery';
import { cn } from '@/shared';

const variants = {
  onDark: {
    button: 'border-border-default',
    icon: 'text-text-primary',
  },
  onLight: {
    button: 'border-border-inverse-200',
    icon: 'text-text-inverse',
  },
} as const;

export type setRatingButtonProps = {
  subject: Subject;
  variant?: keyof typeof variants;
  className?: string;
};

function getIconFillClass(variant: keyof typeof variants, hasRating: boolean) {
  if (!hasRating) return '';

  switch (variant) {
    case 'onDark':
      return 'fill-bg-inverse';

    case 'onLight':
      return 'fill-bg-primary';

    default:
      return '';
  }
}

export function RatingStarButton({ subject, variant = 'onDark', className }: setRatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = useCurrentUserStore((state) => state.currentUser);

  const userId = currentUser ? currentUser.id : null;

  const { data: rating, isLoading } = useRatingQuery(userId, subject);

  const hasRating = rating !== null && rating !== undefined;
  const iconFillClass = getIconFillClass(variant, hasRating);

  return (
    <>
      {isOpen ? (
        <SetRatingRadio
          subject={subject}
          userId={userId!}
          handleSuccessChange={() => setIsOpen(false)}
          buttonVariant={variant === 'onDark' ? 'dark' : 'light'}
        />
      ) : (
        <button
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-md border-[1.75px]',
            variants[variant].button,
            className,
          )}
          aria-label={!isOpen && 'Открыть выбор рейтинга'}
          aria-expanded={isOpen}
          onClick={() => {
            if (currentUser) setIsOpen(!isOpen);
            else redirect(ROUTES.LOGIN);
          }}
        >
          {isLoading ? (
            <div className="h-4.5 w-4.5 animate-pulse rounded-full bg-current opacity-20" />
          ) : (
            <Icon
              className={cn('w-4.5 stroke-2', variants[variant].icon, iconFillClass)}
              name="StarIcon"
            />
          )}
        </button>
      )}
    </>
  );
}

export default RatingStarButton;
