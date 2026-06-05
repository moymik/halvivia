import React from 'react';
import { cn } from '@/shared';

type ButtonVariant = 'primary' | 'outline' | 'outlineBlue';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant;
};

const baseStyles =
  'btn inline-flex items-center justify-center gap-4 h-[44px] px-5 rounded-[60px]  whitespace-nowrap opacity-75 hover:opacity-100 font-medium disabled:opacity-40 transition-[background-color,border-color,color,opacity] duration-300 ease-out ';

const variants = {
  primary: 'bg-primary',

  outline: 'hover:bg-primary opacity-100 border-border-white border hover:border-primary',

  outlineBlue:
    'hover:bg-primary opacity-100 border text-primary border-primary hover:text-text-primary',
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
