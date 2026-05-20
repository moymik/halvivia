import Image from 'next/image';
import clsx from 'clsx';

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={clsx('flex gap-4', className)}>
      <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
        <Image src="/discord_logo.svg" width={20} height={17} alt="discord" />
      </a>
      <a href="https://t.me" target="_blank" rel="noopener noreferrer">
        <Image src="/telegram_logo.svg" width={19} height={17} alt="telegram" />
      </a>
    </div>
  );
}
