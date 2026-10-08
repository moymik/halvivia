'use client';

import { useActionState } from 'react';

import { Button } from '@/shared/ui/Button';
import { loginAction } from '../api/loginAction';
import { Input } from '@/shared/ui/Input';
import DiscordLoginButton from '@/features/auth/ui/DiscordLoginButton';

type LoginFormProps = {
  onRegister: () => void;
};

export function LoginForm({ onRegister }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginAction, { success: false });

  return (
    <div className="w-full">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Input variant="dark" name="name" required placeholder="Имя" className={'text-sm'} />

          {state?.errors?.name && (
            <p className="text-warning text-sm">Имя пользователя введено неверно</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            variant="dark"
            name="password"
            type="password"
            required
            placeholder="Пароль"
            className={'text-sm'}
          />

          {state?.errors?.password && <p className="text-warning text-sm">Пароль введен неверно</p>}
        </div>

        <Button type="submit" disabled={pending} className="mt-8 flex w-full justify-center">
          {pending ? 'Ожидание...' : 'Войти'}
        </Button>
      </form>
      <div className="text-text-primary mt-8 text-center">
        Нет аккаунта?&nbsp;
        <button
          type="button"
          onClick={onRegister}
          className="text-primary hover:text-primary-hover font-medium underline transition-colors duration-300 ease-in"
        >
          Зарегистрируйся
        </button>
      </div>
      <div className="my-6 flex items-center gap-3">
        <div className="bg-border-default h-px flex-1" />

        <span className="text-text-muted text-sm">или</span>

        <div className="bg-border-default h-px flex-1" />
      </div>

      <DiscordLoginButton />
    </div>
  );
}
