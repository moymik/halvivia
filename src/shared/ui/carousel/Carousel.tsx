import React, { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/shared';
import { ArrowIcon } from '@/shared/ui/icons';

export type CarouselProps = {
  children?: ReactNode;
  label?: string;
  href?: string;
  className?: string;
};

export function Carousel({
  children,
  label = 'Комедии',
  href = '/cinema',
  className,
}: CarouselProps) {
  return (
    <section className="w-full py-4">
      <div className={cn('relative flex w-full flex-row items-center justify-between', className)}>
        <Link href={href} className="text-text-primary text-[clamp(20px,2.5vw,2rem)] font-bold">
          {label}
        </Link>

        <Link
          href={href}
          className="text-primary text-base leading-[1.15rem] font-medium visited:text-[rgba(0,90,194,0.5)] sm:hidden"
        >
          Все
        </Link>
      </div>

      <ul className="flex w-full scrollbar-thumb-transparent gap-3 overflow-x-auto py-4 hover:scrollbar-thumb-gray-800 md:py-6 [&>li]:shrink-0 [&>li]:basis-[calc((100%-1*12px)/2)] md:[&>li]:basis-[calc((100%-4*12px)/5)] lg:[&>li]:basis-[calc((100%-5*12px)/6)] xl:[&>li]:basis-[calc((100%-5*12px)/6)] 2xl:[&>li]:basis-[calc((100%-5*12px)/6)]">
        {React.Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </section>
  );
}

export default Carousel;
