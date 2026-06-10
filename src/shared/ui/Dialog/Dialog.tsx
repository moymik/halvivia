import { cn } from '@/shared';
import { ArrowIcon } from '@/shared/ui/icons';
import { useEffect } from 'react';
import { CrossIcon } from '@/shared/ui/icons/CrossIcon';

type DialogProps = {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
  closeLabel?: string;
  onClose: () => void;
};

export function Dialog({ isOpen, children, title, onClose, className, closeLabel }: DialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="backdrop-blur-2xs fixed top-0 z-100 flex h-full w-full items-center justify-center bg-black/60">
      <div
        className={cn(
          `bg-bg-inverse fixed z-500 flex min-h-[calc(100vh-72px)] w-full flex-col items-center overscroll-none rounded-2xl border border-[rgba(17,17,17,0.5)] px-10 py-14 lg:min-h-auto lg:w-auto`,
          className,
        )}
        onClick={onClose}
      >
        <a
          className={
            'text-text-inverse absolute top-4 left-4 text-xs opacity-50 lg:right-4 lg:left-auto'
          }
        >
          <ArrowIcon className={'inline-block h-2.5 scale-x-[-1] lg:hidden'}></ArrowIcon>
          <span className={'h-4 w-4 lg:hidden'}>{closeLabel}</span>
          <CrossIcon className={'hidden lg:inline-block'} />
        </a>

        <h2 className={'text-text-inverse text-2xl font-semibold'}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
