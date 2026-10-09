import type { Subject, SubjectType } from '@/shared/model/subject/types';

// Теги для 'use cache'. Каталог сбрасывается при добавлении элемента или новой оценке
// (rating_avg хранится в строке фильма/книги/игры и показывается в карточках).
export const cacheTags = {
  catalog: (type: SubjectType) => `catalog:${type}`,
  subject: (subject: Subject) => `subject:${subject.type}:${subject.id}`,
  // Имя и аватар пользователя, которые попадают в закэшированные списки оценок и ленту активности.
  userProfile: (userId: string) => `user:${userId}:profile`,
};
