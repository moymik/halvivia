import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/shared';
import { ArrowIcon } from '@/shared/ui/icons';

export type CarouselProps = {
  children?: ReactNode[];
  label?: string;
  href?: string;
  className?: string;
};

export function Carousel({
  children,
  label = 'Комедии',
  href = '/library',
  className,
}: CarouselProps) {
  return (
    <div>
      <div className={cn('relative flex w-full flex-row items-center justify-between', className)}>
        <Link href={href} className="text-[clamp(20px,2.5vw,2rem)] font-bold">
          {label}
          &nbsp;
          <ArrowIcon className={'inline'} />
        </Link>
        <Link
          href={href}
          className={
            'text-primary text-base leading-[1.15rem] font-medium visited:text-[rgba(0,90,194,0.5)] sm:hidden'
          }
        >
          Все
        </Link>
      </div>
      <div className="flex scrollbar-thumb-transparent flex-row gap-[max(4px,0.5vw)] overflow-x-scroll overflow-y-visible py-6 hover:scrollbar-thumb-gray-800">
        {children}
      </div>
    </div>
  );
}

export default Carousel;
