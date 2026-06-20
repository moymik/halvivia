import { ActionResult } from '@/entities/comments/api/actions';

type CreateCommentError = Extract<ActionResult<Comment>, { success: false }>;

export function parseCommentFormError(error: CreateCommentError): string {
  switch (error.error) {
    case 'UNAUTHENTICATED':
      return 'Войдите в аккаунт, чтобы оставить комментарий';

    case 'UNAUTHORIZED':
      return 'Только члены сообщества могут оставлять комментарии';

    case 'DB_ERROR':
      return 'Не удалось создать комментарий. Попробуйте позже';

    case 'VALIDATION_ERROR':
      return 'Некорректные данные';

    default:
      return 'Произошла неизвестная ошибка';
  }
}
