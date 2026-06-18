'use client';

import { cn } from '@/shared';
import { ArrowIcon } from '@/shared/ui/icons';
import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from 'react';
import { CrossIcon } from '@/shared/ui/icons/CrossIcon';

const backdropClassName =
  'backdrop-blur-2xs text-text-inverse fixed inset-0 z-100 flex items-center justify-center bg-black/60 mt-18 md:mt-0 md:p-4';

const dialogClassName =
  'bg-bg-inverse border-border-inverse-500 h-full relative z-500 flex md:max-h-[calc(100vh-32px)] w-full flex-col items-center gap-8 overflow-y-auto overscroll-contain md:rounded-2xl border px-4 py-12 md:px-10 md:py-13 md:h-fit md:w-fit';

const closeButtonClassName =
  'text-text-inverse absolute top-4 right-4 flex cursor-pointer items-center gap-1 text-xs opacity-50 transition-opacity hover:opacity-100';

const focusableElementSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

type DialogProps = {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
  onClose: () => void;
};

export function Dialog({ isOpen, children, title, onClose, className, closeLabel }: DialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.setTimeout(() => {
      const firstFocusableElement =
        dialogRef.current?.querySelector<HTMLElement>(focusableElementSelector);
      (firstFocusableElement ?? dialogRef.current)?.focus();
    }, 0);

    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = previousBodyOverflow;

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, onClose]);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableElementSelector) ?? [],
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  };

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={backdropClassName} onMouseDown={handleBackdropMouseDown}>
      <div
        ref={dialogRef}
        className={cn(dialogClassName, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : 'Диалог'}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
      >
        <button
          type="button"
          onClick={onClose}
          className={closeButtonClassName}
          aria-label={closeLabel ?? 'Закрыть'}
        >
          <ArrowIcon className="inline-block h-2.5 scale-x-[-1] md:hidden" />
          <span className="md:hidden">{closeLabel}</span>
          <CrossIcon className="hidden md:inline-block" />
        </button>

        {title && (
          <h2
            id={titleId}
            className="text-text-inverse text-[clamp(20px,1.5vw,32px)] font-semibold lg:font-bold"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default Dialog;
