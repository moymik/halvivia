'use client';

import { Subject } from '@/shared/model';
import { useQuery } from '@tanstack/react-query';
import { getRatingByUserIdAndSubjectAction } from '@/entities/rating/api/actions';
import { ratingQueryKey } from './queryKeys';

export function useRatingQuery(userId: string | null, subject: Subject) {
  return useQuery({
    queryKey: ratingQueryKey(userId, subject),
    queryFn: async () => {
      if (!userId) {
        throw new Error('User id is required');
      }

      const res = await getRatingByUserIdAndSubjectAction({
        userId: userId!,
        subject,
      });

      if (!res.success) {
        throw new Error(res.error);
      }

      return res.data?.value ?? null;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}
