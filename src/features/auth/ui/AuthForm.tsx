'use client';
import { Button } from '@/shared/ui/Button';
import Image from 'next/image';
import { NAVIGATION_LINKS } from '@/shared/config';

import Link from 'next/link';
import { useAuthModalStore } from '@/features/auth/model/store';
import { startDiscordLoginAction } from '@/features/auth/discord/startDiscordAuthAction';

export function AuthForm() {
  const { closeModal } = useAuthModalStore();
  return (
    <form
      action={startDiscordLoginAction}
      className="border-[rgba(249, 249, 249, 0.5)] bg-bg-surface absolute top-0 left-0 flex h-full w-screen flex-col items-center justify-center gap-12 lg:relative lg:h-77 lg:w-[24vw] lg:min-w-115 lg:rounded-2xl lg:border-2"
    >
      <Image
        src="/Remove-bg.ai_1748294333413.png"
        alt="Remove"
        width={312}
        height={378}
        className="absolute top-1/4 left-0 w-1/3 lg:top-0 lg:bottom-10"
      />

      <h2 className={'top-45 text-xl font-semibold lg:text-3xl lg:font-bold'}>Войти</h2>
      <div className={'flex w-full flex-col items-center gap-2'}>
        <Button type="submit" className={'flex w-full max-w-84 justify-center'}>
          Войти через Discord
        </Button>
        <Link
          className={'text-text-muted hover:text-text-primary text-sm font-medium'}
          href={NAVIGATION_LINKS.LOGIN.href}
          onClick={() => closeModal()}
        >
          Войти с помощью пароля
        </Link>
      </div>
    </form>
  );
}
