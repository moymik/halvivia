import { ROUTES } from '@/shared/config';

export function getFilmRefById(id: string) {
  return ROUTES.CINEMA + '/' + id;
}
