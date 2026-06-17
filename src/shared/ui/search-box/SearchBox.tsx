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
          'mt-1 p-5 lg:absolute lg:top-full lg:right-0 lg:left-0 lg:z-50' +
            ' flex max-h-138.5 flex-col gap-4 ' +
            ' rounded-lg border border-gray-200 bg-white shadow-lg ' +
            ' ${className}',
          className,
        )}
      >
        <p className="text-text-inverse-500 px-4 pt-4 pb-2 text-sm">{hint}</p>
        <div className={'h-91.25 overflow-y-scroll'}>{children}</div>
        <p className="text-text-inverse-500 mx-auto px-4 pt-4 pb-2 text-sm">
          Не нашел нужный фильм? Добавь по кнопке
        </p>
        <Button variant={'primaryOnLight'} disabled className={'mx-auto w-full'}>
          Добавить фильм
        </Button>
      </div>
    )
  );
}

export default SearchBox;
