'use client';

import { z } from 'zod';
import { ChangeEvent, SubmitEvent, useState } from 'react';
import { useActionState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Button } from '@/shared/ui/Button';
import { registerAction } from '../api/registerAction';
import { registerSchema } from '../model/types';
import { Input } from '@/shared/ui/Input';

type RegisterFormProps = {
  onLogin: () => void;
};

type ClientErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
} | null;

export function RegisterForm({ onLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [clientErrors, setClientErrors] = useState<ClientErrors>(null);

  const clientValidate = useDebouncedCallback((data: typeof formData) => {
    const parsed = registerSchema.safeParse(data);

    if (!parsed.success) {
      setClientErrors(z.flattenError(parsed.error).fieldErrors);
    } else {
      setClientErrors(null);
    }
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);
    clientValidate(updated);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    const parsed = registerSchema.safeParse(formData);

    if (!parsed.success) {
      event.preventDefault();

      setClientErrors(z.flattenError(parsed.error).fieldErrors);
    } else {
      setClientErrors(null);
    }
  };

  const [state, formAction, pending] = useActionState(registerAction, { success: false });

  return (
    <div className="w-full">
      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <Input
            name="name"
            variant="dark"
            placeholder="Имя пользователя"
            value={formData.name}
            className={'text-sm'}
            onChange={handleChange}
          />

          {clientErrors?.name && <p className="text-warning text-sm">{clientErrors.name[0]}</p>}
        </div>

        <div className="space-y-3">
          <Input
            variant="dark"
            name="email"
            type="email"
            placeholder="Email (по желанию)"
            value={formData.email}
            onChange={handleChange}
            className={'text-sm'}
          />

          {clientErrors?.email && <p className="text-warning text-sm">{clientErrors.email[0]}</p>}
        </div>

        <div className="space-y-3">
          <Input
            variant="dark"
            name="password"
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            className={'text-sm'}
          />

          {clientErrors?.password && (
            <p className="text-warning text-sm">{clientErrors.password[0]}</p>
          )}
        </div>

        <Button
          disabled={pending || Boolean(clientErrors)}
          type="submit"
          className="mt-8 flex w-full justify-center"
        >
          {pending ? 'Ожидание...' : 'Создать аккаунт'}
        </Button>

        {!state.success &&
          state.errors?.map((error) => (
            <p key={error} className="text-warning text-sm">
              {error}
            </p>
          ))}
      </form>
      <div className="text-text-primary mt-8 text-center">
        Уже есть аккаунт?&nbsp;
        <button
          type="button"
          onClick={onLogin}
          className="text-primary hover:text-primary-hover font-medium underline transition-colors duration-300 ease-in"
        >
          Войти
        </button>
      </div>
    </div>
  );
}
