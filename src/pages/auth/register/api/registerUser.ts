'use server';
import { hash } from 'bcryptjs';

import { registerSchema } from '../model/types';
import { createUser } from '@/entities/user';
import { isPgError } from '@/shared/lib/db';

export type RegisterState = {
  errors?: string[];
  success: boolean;
};

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  // 1. raw input
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
  };

  // 2. validation
  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: ['Неверно заполнены поля'], // не подробно, потому что есть клиентская валидация
      success: false,
    };
  }

  const { name, email, password } = parsed.data;

  const normalizedEmail = email ? email : null;

  // 4. hash password (shared responsibility)
  const passwordHash = await hash(password, 10);

  // 5. create user
  try {
    await createUser({
      name,
      email: normalizedEmail,
      passwordHash,
    });

    return {
      success: true,
    };
  } catch (e: unknown) {
    // PostgreSQL unique violation
    if (isPgError(e) && e.code === '23505') {
      const detail = e?.detail || '';

      const errors: RegisterState['errors'] = [];

      if (detail.includes('email')) {
        errors.push('Email уже используется');
      }

      if (detail.includes('name')) {
        errors.push('Имя уже занято');
      }

      return {
        success: false,
        errors,
      };
    }

    return {
      success: false,
      errors: ['Ошибка сервера, попробуйте позже'],
    };
  }

  //Todo:setcookie+redirect
}
