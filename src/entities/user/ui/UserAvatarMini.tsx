import { type User } from '@/entities/user';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared';
import { Image } from '@imagekit/next';

export type UserAvatarProps = {
  user: User;
} & ComponentPropsWithoutRef<'img'>;

export function UserAvatar({ user, className }: UserAvatarProps) {
  return user.avatarUrl ? (
    <div>
      <Image
        urlEndpoint={`https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}`} // New prop
        src="/avatars/ravi-sharma-OZkjKLwgWX0-unsplash.jpg"
        className={cn('border-primary h-15 w-15 rounded-full border-2', className)}
        width={800}
        height={600}
        sizes="(min-width: 1920px) 800px, 50vw"
        alt="Picture of the author"
      />{' '}
    </div>
  ) : (
    /*<img
      className={cn('border-primary w-15 rounded-full border-2', className)}
      src={user.avatarUrl}
      alt={'Аватарка' + user.name}
    />*/
    <div
      className={cn('border-primary h-15 w-15 rounded-full border-2 bg-gray-500', className)}
    ></div>
  );
}

export default UserAvatar;
