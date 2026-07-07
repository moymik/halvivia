import { cn } from '@/shared';

export type InfoItem = {
  label: string;
  value?: React.ReactNode;
  href?: string;
  render?: () => React.ReactNode;
  key?: string;
};

export type InfoProps = {
  items: InfoItem[];
  className?: string;
};

export function Info({ items, className = '' }: InfoProps) {
  return (
    <ul
      className={cn(
        'grid w-full grid-cols-[max-content_1fr] gap-x-6.25 gap-y-1 text-sm lg:text-base',
        className,
      )}
    >
      {items.map((item, index) => (
        <li key={item.key ?? `${item.label}-${index}`} className="contents">
          <span className="text-nowrap opacity-50">{item.label}:</span>

          {item.render ? (
            item.render()
          ) : item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="wrap-break-words flex items-center gap-2 hover:underline"
            >
              {item.value}
            </a>
          ) : (
            <span className="wrap-break-words">{item.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Info;
