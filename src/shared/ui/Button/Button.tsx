import React from 'react';
import { cn } from '@/shared';

type ButtonVariant = 'primary' | 'outline' | 'outlineBlue' | 'primaryOnLight';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant;
};

const baseStyles =
  'btn flex w-fit items-center justify-center gap-4 h-[44px] px-5 rounded-[60px]  whitespace-nowrap font-medium disabled:opacity-40 transition-[background-color,border-color,color,opacity] duration-300 ease-out ';

const variants = {
  primary: 'bg-primary opacity-75 hover:opacity-100',
  primaryOnLight: 'bg-primary text-text-primary hover:bg-primary-dark', //пока что есть 2 варианта
  outline: 'hover:bg-primary  border-border-white border hover:border-primary',

  outlineBlue: 'hover:bg-primary border text-primary border-primary hover:text-text-primary',
} as const satisfies Record<ButtonVariant, string>;

export function Button({
  className,
  variant = 'primary',
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
}
