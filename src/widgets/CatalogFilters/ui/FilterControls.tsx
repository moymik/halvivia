'use client';

import { ComponentPropsWithoutRef, ReactNode, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';

import { cn } from '@/shared';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

const controlStyles =
  'border-border-default bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-border-white h-10 w-full rounded-lg border text-sm transition-colors duration-200 focus:outline-none';

type FilterPanelProps = {
  children: ReactNode;
  onReset: () => void;
};

export function FilterPanel({ children, onReset }: FilterPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  function handleReset() {
    // Текстовые поля неконтролируемые и форма не пересоздается при смене URL,
    // поэтому очищаем их вручную. Чекбоксы и селекты обновятся из пропсов.
    panelRef.current
      ?.querySelectorAll<HTMLInputElement>('input:not([type=checkbox])')
      .forEach((input) => {
        input.value = '';
      });
    onReset();
  }

  return (
    <div ref={panelRef} className="flex flex-col gap-6">
      <h2 className="font-heading text-base leading-6 font-bold">Фильтры</h2>

      {children}

      <Button
        type="button"
        variant="outline"
        onClick={handleReset}
        className="mt-1 w-full text-sm font-normal"
      >
        Сбросить все
      </Button>
    </div>
  );
}

type FilterFieldProps = {
  label: string;
  // Для полей без собственного <input> (список чекбоксов) подпись не связывается через htmlFor.
  htmlFor?: string;
  // Действие справа от подписи, например «Выбрать все».
  action?: ReactNode;
  hint?: string;
  children: ReactNode;
};

export function FilterField({ label, htmlFor, action, hint, children }: FilterFieldProps) {
  const labelStyles = 'text-text-secondary text-sm leading-4';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        {htmlFor ? (
          <label htmlFor={htmlFor} className={labelStyles}>
            {label}
          </label>
        ) : (
          <span className={labelStyles}>{label}</span>
        )}
        {action}
      </div>
      {children}
      {hint && <p className="text-text-muted text-xs">{hint}</p>}
    </div>
  );
}

type FilterLinkButtonProps = ComponentPropsWithoutRef<'button'>;

export function FilterLinkButton({ className, ...props }: FilterLinkButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'text-primary hover:text-primary-hover text-xs leading-4 transition-colors duration-200',
        className,
      )}
    />
  );
}

type FilterInputProps = ComponentPropsWithoutRef<'input'> & {
  withSearchIcon?: boolean;
};

export function FilterInput({ withSearchIcon = false, className, ...props }: FilterInputProps) {
  return (
    <div className="group relative">
      {withSearchIcon && (
        <Search
          aria-hidden="true"
          strokeWidth={1.75}
          className="text-text-secondary group-focus-within:text-text-primary pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 transition-colors duration-200"
        />
      )}
      <input
        {...props}
        className={cn(
          controlStyles,
          withSearchIcon ? 'pr-4 pl-10' : 'px-4',
          '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-search-cancel-button]:appearance-none',
          className,
        )}
      />
    </div>
  );
}

type FilterSelectProps = ComponentPropsWithoutRef<'select'> & {
  options: readonly { value: string; label: string }[];
};

export function FilterSelect({ options, className, ...props }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(controlStyles, 'cursor-pointer appearance-none pr-10 pl-4', className)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        strokeWidth={1.75}
        className="text-text-primary pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
      />
    </div>
  );
}

type FilterCheckboxListProps<TValue extends string | number> = {
  label: string;
  options: readonly { value: TValue; label: string }[];
  isChecked: (value: TValue) => boolean;
  onToggle: (value: TValue) => void;
};

export function FilterCheckboxList<TValue extends string | number>({
  label,
  options,
  isChecked,
  onToggle,
}: FilterCheckboxListProps<TValue>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="border-border-default bg-bg-base max-h-64 overflow-y-auto rounded-lg border px-3 py-2"
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="flex min-h-7.5 cursor-pointer items-center gap-3 py-1 text-sm leading-4"
        >
          <Checkbox
            checked={isChecked(option.value)}
            onCheckedChange={() => onToggle(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
