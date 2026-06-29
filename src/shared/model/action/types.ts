import { AppErrorCode } from '@/shared';

export type ActionResult<T, E extends string = never> =
  | { success: true; data: T }
  | {
      success: false;
      error: AppErrorCode | E;
    };
