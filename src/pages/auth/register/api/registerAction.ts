'use server';
import { hash } from 'bcryptjs';

import { registerSchema } from '../model/types';
import { isPgError } from '@/shared/lib/db';

import { redirect } from 'next/navigation';
import { issueSession } from '@/shared/lib/auth/dal';
import { createUser } from '@/entities/user';

export type RegisterState = {
  errors?: string[];
  success: boolean;
};

export async function registerAction(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // validation
  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: ['Неверно заполнены поля'], // не подробно, потому что есть клиентская валидация
      success: false,
    };
  }

  const { name, email, password } = parsed.data;

  const normalizedEmail = email ? email : null;

  const passwordHash = await hash(password, 10);

  try {
    //1. create user
    const user = await createUser({
      name,
      email: normalizedEmail,
      passwordHash,
    });
    // 2. create tokens
    await issueSession(user.id);
  } catch (e: unknown) {
    console.error(e);
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
  redirect('/');
}
