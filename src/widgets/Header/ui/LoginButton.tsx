'use client';
import { logout } from '@/features/auth';
import { useAuthModalStore } from '@/features/auth/';

export type LoginButtonProps = {
  isLoggedIn: boolean;
};

export function LoginButton() {
  const openModal = useAuthModalStore((s) => s.openModal);
  return (
    <button
      className="font-heading rounded-md p-2 font-medium transition-shadow hover:shadow-[0_6px_20px_-10px_rgba(255,255,255,0.6)]"
      aria-label="Открыть меню авторизации"
      onClick={() => {
        openModal();
      }}
    >
      Войти
    </button>
  );
}

export default LoginButton;
