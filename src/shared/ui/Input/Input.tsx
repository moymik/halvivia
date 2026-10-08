import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared';
import SearchIcon from '@/shared/assets/SearchIcon.svg';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  variant?: 'light' | 'dark';
  searchIcon?: 'always' | 'textEmpty' | 'none';
};

const baseStyles =
  'h-10 w-full rounded-lg border px-4 focus:outline-none transition-colors transition-opacity duration-300 ease-in';

const variants = {
  dark: 'border-border-default bg-[rgba(17,17,17,1)] focus:border-border-white focus:placeholder:opacity-100 placeholder:text-text-primary placeholder:opacity-50 text-text-primary ',
  light: ' border-gray-100 focus:placeholder:opacity-0',
};

export function Input({
  variant = 'light',
  searchIcon = 'none',
  className,
  placeholder,
  ...props
}: InputProps) {
  const showSearchIcon = searchIcon !== 'none';

  return (
    <div className="relative w-full">
      <input
        {...props}
        placeholder={placeholder ?? ' '}
        className={cn('peer', baseStyles, variants[variant], showSearchIcon && 'px-8', className)}
      />

      {showSearchIcon && (
        <SearchIcon
          className={cn(
            'pointer-events-none absolute top-1/2 left-3 w-2.5 -translate-y-1/2 opacity-50',
            variant === 'dark' ? 'text-text-primary peer-focus:opacity-100' : 'text-[#111]',
            searchIcon === 'textEmpty' && [
              'peer-focus:hidden',
              'peer-[:not(:placeholder-shown)]:hidden',
            ],
          )}
        />
      )}
    </div>
  );
}

export default Input;
