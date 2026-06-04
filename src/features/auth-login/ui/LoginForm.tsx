'use client';
import { loginAction } from '../api/loginAction';
import { useActionState } from 'react';
import { NAVIGATION_LINKS } from '@/shared/config';
import Link from 'next/link';
import { startDiscordLoginAction } from '@/features/auth/discord/startDiscordAuthAction';

export function LoginForm() {
  const [state, dispatchLoginAction, isPending] = useActionState(loginAction, { success: false });
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        action={dispatchLoginAction}
        className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl"
      >
        <div>
          <h1 className="text-2xl font-semibold text-white">Вход</h1>
        </div>

        <div className="space-y-2">
          <input
            name="name"
            required
            placeholder="Имя пользователя"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white transition-colors ease-out outline-none focus:border-zinc-500"
          />
          {state?.errors?.name && <p>Имя пользователя введено неверно</p>}
        </div>

        <div className="space-y-2">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white transition-colors ease-out outline-none focus:border-zinc-500"
            required
          />
          {state?.errors?.password && <p>Пароль введен неверно</p>}
        </div>
        <button
          //disabled={pending}
          type="submit"
          className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black transition-opacity ease-out hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Ожидание...' : 'Войти'}
        </button>
        <div>
          <Link
            className={
              'text-text-muted hover:text-text-primary text-sm font-medium transition-[color] ease-out'
            }
            href={NAVIGATION_LINKS.REGISTER.href}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              startDiscordLoginAction();
            }}
            className={
              'text-text-muted hover:text-text-primary text-sm font-medium transition-[color] ease-out'
            }
          >
            Войти через дискорд
          </button>
        </div>
      </form>
    </div>
  );
}
