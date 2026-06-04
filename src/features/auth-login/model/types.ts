import { z } from 'zod';

export const loginSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(20, 'Имя должно содержать максимум 20 символов')
    .regex(/^\S+$/, 'Пробелы в имени не допускаются'),

  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(100, 'Пароль должен содержать максимум 100 символов')
    .regex(/^\S+$/, 'Пароль не должен содержать пробелы'),
});

export type LoginState = {
  errors?: { password?: string; name?: string; server?: string };
  success: boolean;
};
