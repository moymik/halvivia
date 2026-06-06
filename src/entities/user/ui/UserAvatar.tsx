import { type User } from '@/entities/user';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared';

export type UserAvatarProps = {
  user: User;
} & ComponentPropsWithoutRef<'img'>;

export function UserAvatar({ user, className }: UserAvatarProps) {
  return user.avatarUrl ? (
    <img
      className={cn('border-primary w-15 rounded-full border-2', className)}
      src={user.avatarUrl}
      alt={'Аватарка' + user.name}
    />
  ) : (
    <div
      className={cn('border-primary h-15 w-15 rounded-full border-2 bg-gray-500', className)}
    ></div>
  );
}

export default UserAvatar;
