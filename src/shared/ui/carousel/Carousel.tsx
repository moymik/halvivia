import React, { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/shared';
import { ArrowRight } from 'lucide-react';

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
    <section className="w-full py-2.5">
      <div
        className={cn(
          'text-text-primary relative flex w-full flex-row items-center justify-between',
          className,
        )}
      >
        <h2 className="font-heading text-xl leading-tight font-bold">
          <Link href={href}>{label}</Link>
        </h2>

        <Link
          href={href}
          className="text-primary hover:text-primary-hover flex items-center gap-1 text-base leading-tight font-medium transition-colors duration-200"
        >
          Все
          <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>

      <ul className="flex w-full scrollbar-thumb-transparent gap-3 overflow-x-auto py-4 hover:scrollbar-thumb-gray-800 md:py-6 2xl:py-7 [&>li]:shrink-0 [&>li]:basis-[calc((100%-1*12px)/2)] md:[&>li]:basis-[calc((100%-4*12px)/5)] lg:[&>li]:basis-[calc((100%-5*12px)/6)] xl:[&>li]:basis-[calc((100%-5*12px)/6)] 2xl:[&>li]:basis-[calc((100%-5*12px)/6)]">
        {React.Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </section>
  );
}

export default Carousel;
