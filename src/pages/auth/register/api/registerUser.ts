'use server';
import { hash } from 'bcryptjs';

import { registerSchema } from '../model/types';
import { createUser } from '@/entities/user';
import { isPgError } from '@/shared/lib/db';
import { createAccessToken, createRefreshToken } from '@/shared/lib/auth/jwt';
import { insertRefreshToken } from '@/shared/lib/auth/refresh_token.db';
import { setSessionCookies } from '@/shared/lib/auth/cookies';
import { redirect } from 'next/navigation';

export type RegisterState = {
  errors?: string[];
  success: boolean;
};

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
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

    const accessToken = await createAccessToken({ userId: user.id });
    const refreshToken = await createRefreshToken({ userId: user.id });

    // 3. store refresh token in DB
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await insertRefreshToken({
      token: refreshToken,
      userId: user.id,
      expiresAt,
    });

    await setSessionCookies({ accessToken, refreshToken });
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
