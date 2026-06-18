import { cn } from '@/shared';
import { Button } from '@/shared/ui/Button';

export type SearchBoxProps = {
  className?: string;
  children?: React.ReactNode;
  hint?: string;
  show?: boolean;
};

export function SearchBox({
  show = false,
  children,
  hint = 'Результаты поиска',
  className = '',
}: SearchBoxProps) {
  return (
    show && (
      <div
        className={cn(
          'mt-1 w-full md:absolute md:top-full md:right-0 md:left-0 md:z-50 md:p-5' +
            ' flex scrollbar-thumb-transparent flex-col gap-4 ' +
            ' border-border-inverse-200 bg-bg-inverse rounded-lg md:border md:shadow-lg ' +
            ' ${className}',
          className,
        )}
      >
        <p className="text-text-inverse-500 text-sm">{hint}</p>
        {children}
      </div>
    )
  );
}

export default SearchBox;
