import { type User } from '@/entities/user';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared';
import { Image } from '@imagekit/next';

export type UserAvatarProps = {
  user: User;
} & ComponentPropsWithoutRef<'img'>;

export function UserAvatarMini({ user, className }: UserAvatarProps) {
  return user.avatarUrl ? (
    <div>
      <Image
        urlEndpoint={`https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}`} // New prop
        src={user.avatarUrl}
        className={cn('border-primary h-15 w-15 rounded-full border-2', className)}
        width={100}
        height={100}
        alt="Picture of the author"
      />
    </div>
  ) : (
    <div className={'border-primary h-15 w-15 rounded-full border-2 bg-gray-500'}></div>
  );
}

export default UserAvatarMini;
