'use client';
import { logout } from '@/widgets/Header/lib/logout';
import { useAuthModalStore } from '../model/store';

export type LoginButtonProps = {
  sessionStatus: 'unauthenticated' | 'authenticated' | 'refreshable';
};

export function LoginButton({ sessionStatus }: LoginButtonProps) {
  const openModal = useAuthModalStore((s) => s.openModal);
  const { open } = useAuthModalStore();

  return sessionStatus === 'unauthenticated' ? (
    <button
      className="font-heading rounded-md p-2 font-medium transition-shadow hover:shadow-[0_6px_20px_-10px_rgba(255,255,255,0.6)]"
      aria-label="Открыть меню авторизации"
      onClick={() => {
        openModal();
        console.log(open);
      }}
    >
      Войти
    </button>
  ) : (
    <button
      className="font-heading rounded-md p-2 font-medium transition-shadow hover:shadow-[0_6px_20px_-10px_rgba(255,255,255,0.6)]"
      aria-label="Выйти из аккаунта"
      onClick={logout}
    >
      Выйти
    </button>
  );
}

export default LoginButton;
