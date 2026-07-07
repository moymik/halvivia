'use client';

import { RatingWithUser } from '@/entities/rating/model/types';
import { getRatingColorClass } from '@/entities/rating/lib/utils';
import UserAvatarMini from '@/entities/user/ui/UserAvatarMini';

type RatingListProps = {
  ratings: RatingWithUser[];
  className?: string;
  emptyText?: string;
};

export function RatingList({ ratings, className, emptyText = 'Нет оценок' }: RatingListProps) {
  if (!ratings.length) {
    return <div className="text-text-secondary py-4 text-center text-sm">{emptyText}</div>;
  }

  return (
    <ul className={`space-y-1 ${className}`}>
      {ratings.map((rating) => (
        <li
          key={rating.id}
          className="hover:bg-bg-muted flex items-center justify-between rounded-md px-2 py-1.5 transition-colors"
        >
          <div className="flex min-w-0 items-center gap-2">
            <UserAvatarMini
              user={{
                ...rating.user,
                role: null,
              }}
              className="h-7 w-7 border-none"
            />

            <span className="truncate text-sm">{rating.user.name ?? 'Unknown'}</span>
          </div>

          <span className={`font-semibold ${getRatingColorClass(rating.value)}`}>
            {rating.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default RatingList;
