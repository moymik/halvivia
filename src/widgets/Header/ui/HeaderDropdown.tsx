'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CircleUserRound, LogOut, Settings } from 'lucide-react';

import { User } from '@/entities/user';
import { logout } from '@/features/auth';
import { ROUTES } from '@/shared/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown';
import { UserAvatarMini } from '@/entities/user/ui/UserAvatarMini';

type HeaderProps = {
  user: User;
};

const itemStyles =
  'hover:bg-bg-hover focus:bg-bg-hover text-text-primary hover:text-text-primary focus:text-text-primary flex h-8 cursor-pointer items-center gap-2 rounded-md px-1 text-sm [&_svg]:size-5';

export function HeaderDropdown({ user }: HeaderProps) {
  const router = useRouter();
  const profileHref = ROUTES.PROFILE + user.id;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Меню аккаунта"
          className="focus-visible:outline-primary rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <UserAvatarMini className="size-9 lg:size-11" user={user}></UserAvatarMini>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="bg-bg-surface ring-border-default text-text-primary z-1000 flex w-auto min-w-40 flex-col gap-2 rounded-lg p-3"
      >
        <Link
          href={profileHref}
          className="border-border-default mb-1 flex items-center gap-2 border-b pb-3"
        >
          <UserAvatarMini className="size-9 md:size-9" user={user}></UserAvatarMini>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-base leading-5 font-medium">{user.name}</span>
            {user.email && (
              <span className="text-text-secondary max-w-40 truncate text-xs">{user.email}</span>
            )}
          </span>
        </Link>

        <DropdownMenuItem asChild className={itemStyles}>
          <Link href={profileHref}>
            <CircleUserRound strokeWidth={1.5} aria-hidden="true" />
            Профиль
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className={itemStyles}>
          <Link href={ROUTES.SETTINGS + user.id}>
            <Settings strokeWidth={1.5} aria-hidden="true" />
            Настройки
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemStyles}
          onSelect={async () => {
            await logout();
            router.refresh();
          }}
        >
          <LogOut strokeWidth={1.5} aria-hidden="true" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderDropdown;
