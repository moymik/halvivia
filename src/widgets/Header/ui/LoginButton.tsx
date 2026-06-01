'use client';
import { logout } from '@/widgets/Header/lib/logout';
import { useRouter } from 'next/navigation';

export type LoginButtonProps = {
  sessionStatus: 'unauthenticated' | 'authenticated' | 'refreshable';
};

export function LoginButton({ sessionStatus }: LoginButtonProps) {
  const router = useRouter();

  return sessionStatus === 'unauthenticated' ? (
    <button
      className="font-heading rounded-md p-2 font-medium transition hover:shadow-[0_6px_20px_-10px_rgba(255,255,255,0.6)]"
      aria-label="Открыть меню авторизации"
      onClick={() => {
        router.push('/auth/login');
      }}
    >
      Войти
    </button>
  ) : (
    <button
      className="font-heading rounded-md p-2 font-medium transition hover:shadow-[0_6px_20px_-10px_rgba(255,255,255,0.6)]"
      aria-label="Выйти из аккаунта"
      onClick={logout}
    >
      Выйти
    </button>
  );
}

export default LoginButton;
