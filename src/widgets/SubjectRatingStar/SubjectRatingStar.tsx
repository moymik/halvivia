'use client';

import { useCallback, useState } from 'react';

import { getRatingsBySubjectAction } from '@/entities/rating';
import { getRatingColorClass } from '@/entities/rating/lib/utils';
import type { RatingWithUser } from '@/entities/rating/model/types';
import type { Subject } from '@/shared/model';
import { StarIcon } from '@/shared/ui/icons';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/Popover';

import RatingList from '@/widgets/SubjectRatingStar/ui/RatingList';

export type SubjectRatingStarProps = {
  avgRating: number | null;
  subject: Subject;
  className?: string;
};

export function SubjectRatingStar({ avgRating, subject, className }: SubjectRatingStarProps) {
  const [ratings, setRatings] = useState<RatingWithUser[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const loadRatings = useCallback(async () => {
    if (ratings !== null || loading) return;

    setLoading(true);
    setLoadError(false);

    try {
      const result = await getRatingsBySubjectAction({ subject });

      if (result.success) {
        setRatings(result.data);
      } else {
        setLoadError(true);
      }
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [ratings, loading, subject]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      void loadRatings();
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Посмотреть оценки пользователей${
            avgRating != null ? `, средняя оценка ${avgRating}` : ''
          }`}
          aria-expanded={open}
          className={`inline-flex cursor-pointer items-center gap-1 ${getRatingColorClass(
            avgRating,
          )} ${className ?? ''}`}
        >
          <StarIcon className="w-4" fill="currentColor" />
          {avgRating ?? '—'}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        side="top"
        sideOffset={8}
        className="bg-bg-surface ring-border-default z-600 w-72 max-w-[calc(100vw-2rem)] rounded-xl p-3 shadow-lg"
      >
        {loading ? (
          <div className="text-text-secondary py-4 text-center text-sm">Загрузка...</div>
        ) : loadError ? (
          <div className="text-text-secondary py-4 text-center text-sm">
            <p>Не удалось загрузить оценки.</p>

            <button
              type="button"
              className="text-primary mt-2 underline"
              onClick={() => void loadRatings()}
            >
              Попробовать снова
            </button>
          </div>
        ) : ratings !== null && ratings.length > 0 ? (
          <>
            <div className="border-border mb-3 flex items-center justify-between border-b pb-2">
              <span className="text-sm font-semibold">Оценки пользователей</span>

              <span className="text-text-secondary text-sm">({ratings.length})</span>
            </div>

            <RatingList ratings={ratings} className="max-h-64 overflow-y-auto" />
          </>
        ) : ratings !== null ? (
          <div className="text-text-secondary py-4 text-center text-sm">Оценок пока нет</div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

export default SubjectRatingStar;
