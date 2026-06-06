import { Image } from '@imagekit/next';
import { cn } from '@/shared';
import { UserAvatarProps } from '@/entities/user/ui/UserAvatarMini';

export function UserAvatarFull({ user, className }: UserAvatarProps) {
  return user.avatarUrl ? (
    <div className={'rounded-lg shadow'}>
      <Image
        urlEndpoint={`https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}`} // New prop
        src={user.avatarUrl}
        className={cn(
          'border-primary aspect-square w-[95vw] border-2 object-cover md:w-[50vw] lg:w-[33vw]',
        )}
        width={600}
        height={600}
        sizes="(min-width: 1200px) 33vw, (min-width: 800px) 50vw, 95vw"
        alt="Picture of the author"
      />
    </div>
  ) : (
    <div
      className={cn('border-primary h-15 w-15 rounded-full border-2 bg-gray-500', className)}
    ></div>
  );
}

export default UserAvatarFull;
