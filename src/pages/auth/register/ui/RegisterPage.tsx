'use client';
import { z } from 'zod';

import { ChangeEvent, useActionState, useState } from 'react';
import { registerAction } from '../api/registerAction';

import { useDebouncedCallback } from 'use-debounce';
import { registerSchema } from '@/pages/auth/register/model/types';

type ClientErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
} | null;

export function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [clientErrors, setClientErrors] = useState<ClientErrors>(null);

  const clientValidate = useDebouncedCallback((data: typeof formData) => {
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      setClientErrors(z.flattenError(parsed.error).fieldErrors);
    } else setClientErrors(null);
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };
    setFormData(updated);
    clientValidate(updated);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const parsed = registerSchema.safeParse(formData);
    if (!parsed.success) {
      e.preventDefault();
      setClientErrors(z.flattenError(parsed.error).fieldErrors);
    } else {
      setClientErrors(null);
    }
  };

  const [state, formAction, pending] = useActionState(registerAction, { success: false });

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        action={formAction}
        className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl"
      >
        <div>
          <h1 className="text-2xl font-semibold text-white">Регистрация</h1>
        </div>

        <div className="space-y-2">
          <input
            name="name"
            placeholder="Имя пользователя"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white transition outline-none focus:border-zinc-500"
            value={formData.name}
            onChange={handleChange}
          />

          {clientErrors?.name && <p className="text-warning text-sm">{clientErrors.name[0]}</p>}
        </div>

        <div className="space-y-2">
          <input
            name="email"
            type="email"
            placeholder="Email (по желанию)"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white transition outline-none focus:border-zinc-500"
            value={formData.email}
            onChange={handleChange}
          />

          {clientErrors?.email && <p className="text-warning text-sm">{clientErrors.email[0]}</p>}
        </div>

        <div className="space-y-2">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white transition outline-none focus:border-zinc-500"
            value={formData.password}
            onChange={handleChange}
          />

          {clientErrors?.password && (
            <p className="text-warning text-sm">{clientErrors.password[0]}</p>
          )}
        </div>

        <button
          disabled={pending || Boolean(clientErrors)}
          type="submit"
          className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {pending ? 'Ожидание...' : 'Создать аккаунт'}
        </button>

        {state.success && <p className="text-success text-sm">Account created successfully</p>}
        {!state.success &&
          state.errors?.map((error) => (
            <p key={error} className="text-warning text-sm">
              {error}
            </p>
          ))}
      </form>
    </div>
  );
}

export default RegisterPage;
