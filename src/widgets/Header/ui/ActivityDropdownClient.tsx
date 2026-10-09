'use client';

import { useRef, useState } from 'react';
import { Bell } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/Dropdown';

type ActivityDropdownClientProps = {
  children: React.ReactNode;
};

const DESKTOP_MEDIA_QUERY = '(min-width: 1280px)';
const PAGE_GUTTER = 16;

// По макету на десктопе правый край панели совпадает с иконкой колокольчика,
// а ниже lg — с правым краем контента хедера (поверх аватарки).
// Для align="end" положительный alignOffset сдвигает панель влево.
function getAlignOffset(trigger: HTMLElement | null) {
  if (!trigger) {
    return 0;
  }

  const triggerRect = trigger.getBoundingClientRect();
  const icon = trigger.querySelector('svg');

  if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
    return icon ? triggerRect.right - icon.getBoundingClientRect().right : 0;
  }

  return triggerRect.right - (document.documentElement.clientWidth - PAGE_GUTTER);
}

export function ActivityDropdownClient({ children }: ActivityDropdownClientProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [alignOffset, setAlignOffset] = useState(0);

  return (
    <DropdownMenu
      modal={false}
      onOpenChange={(open) => {
        if (open) {
          setAlignOffset(getAlignOffset(triggerRef.current));
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className="hover:bg-bg-hover data-[state=open]:bg-bg-hover flex size-8 items-center justify-center rounded-lg transition-colors duration-200"
          aria-label="Уведомления"
        >
          <Bell className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={alignOffset}
        sideOffset={8}
        collisionPadding={PAGE_GUTTER}
        className="bg-bg-surface ring-border-default text-text-primary z-1000 w-77 max-w-[calc(100vw-32px)] overflow-hidden rounded-lg p-0"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
