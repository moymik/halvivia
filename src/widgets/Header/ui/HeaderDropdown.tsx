'use client';

import { useState } from 'react';
import { dropdownLinks } from '@/widgets/Header/config/dropdown.config';
import DropdownLink from '@/widgets/Header/ui/DropdownLink';
import { User } from '@/entities/user';
import { logout } from '@/features/auth';
import { NAVIGATION_LINKS, ROUTES } from '@/shared/config';
import Link from 'next/link';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';

type HeaderProps = React.ComponentPropsWithoutRef<'div'> & {
  user: User;
};

export function HeaderDropdown({ user }: HeaderProps) {
  const [open, setOpen] = useState(false);
  console.log(user.name);

  return (
    <div className="flex flex-col items-end">
      <button onClick={() => setOpen(!open)} className={'border-primary rounded-full border-2'}>
        <UserAvatar user={user}></UserAvatar>
      </button>

      {open && (
        <div className="bg-bg-base md:border-border-default border-t-border-default absolute top-full left-0 flex h-screen w-screen flex-col rounded-b-lg border-t py-5 md:left-auto md:h-auto md:w-[min(30vw,339px)] md:border">
          <div className={'flex flex-col items-center justify-center pb-5'}>
            <Link href={ROUTES.PROFILE + user.id}>
              <UserAvatar user={user} className={'h-24 w-24'}></UserAvatar>
            </Link>
            <p>{user.name}</p>
          </div>
          <div className="border-border-second flex w-screen flex-col gap-3 border-t py-5 md:w-auto md:items-start">
            {dropdownLinks.map((link) => (
              <DropdownLink
                setOpen={setOpen}
                link={link.link}
                href={
                  !(link.link.id === NAVIGATION_LINKS.PROFILE.id)
                    ? undefined
                    : link.link.href + user.id
                }
                icon={link.iconName}
                key={link.link.id}
              >
                {link.link.label}
              </DropdownLink>
            ))}
          </div>
          <div className="border-t-border-second flex w-screen flex-col gap-3 border-t pt-5 md:w-auto">
            <DropdownLink setOpen={setOpen} link={NAVIGATION_LINKS.LOGIN} icon={'AddIcon'}>
              Сменить аккаунт
            </DropdownLink>
            <button
              className={'hover:text-primary block w-screen text-left text-base/tight md:w-auto'}
              onClick={logout}
            >
              <DropdownLink
                icon={'LogoutIcon'}
                setOpen={setOpen}
                onClick={(e) => {
                  e.preventDefault();
                }}
                link={NAVIGATION_LINKS.LOGIN}
              >
                Выйти
              </DropdownLink>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderDropdown;
