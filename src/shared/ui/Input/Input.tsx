import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared';
import SearchIcon from '@/shared/assets/SearchIcon.svg';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  variant?: 'light' | 'dark';
  searchIcon?: boolean;
};

const baseStyles = 'rounded-lg border h-10 w-full px-4 focus:outline-none';
const withSearchIcon = 'px-8 focus:px-4';

export function Input({ variant = 'light', searchIcon = false, className, ...props }: InputProps) {
  return (
    <div className="relative w-full focus-within:[&>svg]:hidden">
      <input
        {...props}
        className={cn(
          baseStyles,
          'border-gray-100 focus:placeholder:opacity-0',
          searchIcon ? withSearchIcon : '',
          className,
        )}
        {...props}
      />
      {searchIcon && (
        <SearchIcon className="absolute top-1/2 left-3 w-2.5 -translate-y-1/2"></SearchIcon>
      )}
    </div>
  );
}

export default Input;
