import { ROUTES } from '@/shared/config';

export function getBookRefById(id: string) {
  return ROUTES.LIBRARY + '/' + id;
}
