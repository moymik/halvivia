'use client';

import { useState } from 'react';
import { dropdownLinks } from '@/widgets/Header/config/dropdown.config';
import DropdownLink from '@/widgets/Header/ui/DropdownLink';
import { User } from '@/entities/user';
import LoginButton from '@/widgets/Header/ui/LoginButton';
import { logout } from '@/features/auth';
import { NAVIGATION_LINKS, ROUTES } from '@/shared/config';
import { redirect } from 'next/navigation';
import LogoutIcon from '@/shared/ui/icons/LogoutIcon';

type HeaderProps = React.ComponentPropsWithoutRef<'div'> & {
  user: User;
};

export function HeaderDropdown({ user }: HeaderProps) {
  const [open, setOpen] = useState(false);
  console.log(user.name);

  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(!open)} className="rounded border px-4 py-2">
        {user.name}
      </button>

      {open && (
        <div className="bg-bg-base border-border-default fixed left-0 mt-4 flex h-screen flex-col border-t">
          <div className={'flex h-41 flex-col items-center justify-center'}>
            <div>тут будет картинка</div>
            <p>{user.name}</p>
          </div>
          <div className="flex h-41 w-screen flex-col gap-3">
            {dropdownLinks.map((link) => (
              <DropdownLink
                setOpen={setOpen}
                link={link.link}
                icon={'LogoutIcon'}
                key={link.link.id}
              />
            ))}
          </div>
          <div className="flex h-41 w-screen flex-col gap-3">
            <DropdownLink
              setOpen={setOpen}
              hideLabel
              link={NAVIGATION_LINKS.LOGIN}
              icon={'LogoutIcon'}
            >
              Сменить аккаунт
            </DropdownLink>
            <button
              className={'hover:text-primary block w-full text-left text-base/tight'}
              onClick={logout}
            >
              <DropdownLink
                icon={'LogoutIcon'}
                setOpen={setOpen}
                onClick={(e) => {
                  e.preventDefault();
                }}
                hideLabel
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
