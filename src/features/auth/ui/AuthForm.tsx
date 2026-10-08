'use client';

import { useState } from 'react';

import Dialog from '@/shared/ui/Dialog/Dialog';
import { useAuthModalStore } from '../model/AuthModalStore';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { DiscordLoginButton } from './DiscordLoginButton';

type AuthMode = 'login' | 'register';

export function AuthForm() {
  const { closeModal } = useAuthModalStore();
  const [mode, setMode] = useState<AuthMode>('login');

  const isLogin = mode === 'login';

  return (
    <Dialog
      isOpen
      onClose={closeModal}
      variant="dark"
      title={isLogin ? 'Войти' : 'Регистрация'}
      className={'pt-18 md:w-111'}
    >
      <div className="w-full max-w-111">
        {isLogin ? (
          <LoginForm onRegister={() => setMode('register')} />
        ) : (
          <RegisterForm onLogin={() => setMode('login')} />
        )}
      </div>
    </Dialog>
  );
}
