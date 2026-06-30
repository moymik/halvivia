import { Subject } from '@/shared/model';

export const ratingQueryKey = (userId: string | null, subject: Subject) =>
  ['rating', userId, subject.id, subject.type] as const;
