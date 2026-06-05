'use server';
import { z } from 'zod';
import { loginSchema, LoginState } from '../model/types';

import bcrypt from 'bcryptjs';

import { findAuthUserByName } from './db';

import { issueSession } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const name = formData.get('name'),
    password = formData.get('password');

  //validation
  const validationResult = z.safeParse(loginSchema, {
    name,
    password,
  });

  if (!validationResult.success) {
    const flat = z.flattenError(validationResult.error);

    return {
      errors: {
        name: flat.fieldErrors.name?.[0],
        password: flat.fieldErrors.password?.[0],
      },
      success: false,
    };
  }

  try {
    const user = await findAuthUserByName(validationResult.data.name);
    if (!user) {
      return {
        success: false,
        errors: {
          name: 'Пользователь с этим именем не найден',
        },
      };
    }
    const passwordIsCorrect = await bcrypt.compare(
      String(validationResult.data.password),
      user.passwordHash,
    );

    if (!passwordIsCorrect) {
      return {
        success: false,
        errors: {
          password: 'Неверный пароль',
        },
      };
    }

    //if everything is ok
    await issueSession({ userId: user.id, role: user.role });
  } catch (e) {
    console.error(e);
    return { success: false, errors: { server: 'Ошибка сервера, попробуйте позже' } };
  }
  redirect(ROUTES.HOME);
}
