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
    <div className="backdrop-blur-2xs text-text-inverse fixed top-18 z-100 h-full w-full items-center justify-center bg-black/60 lg:top-0 lg:flex">
      <div
        className={cn(
          `bg-bg-inverse border-border-inverse-500 fixed z-500 flex h-full w-full flex-col items-center gap-8 overscroll-none rounded-none border px-4 py-15 md:min-h-auto md:px-10 md:py-13 lg:h-fit lg:w-fit lg:rounded-2xl`,
          className,
        )}
      >
        <a
          className={
            'text-text-inverse absolute top-4 left-4 cursor-pointer text-xs opacity-50 lg:right-4 lg:left-auto'
          }
        >
          <ArrowIcon
            onClick={onClose}
            className={'inline-block h-2.5 scale-x-[-1] lg:hidden'}
          ></ArrowIcon>
          <span className={'h-4 w-4 lg:hidden'}>{closeLabel}</span>
          <CrossIcon onClick={onClose} className={'hidden lg:inline-block'} />
        </a>

        <h2
          className={'text-text-inverse text-[clamp(20px,1.5vw,32px)] font-semibold lg:font-bold'}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
//border-[rgba(17,17,17,0.5)]
