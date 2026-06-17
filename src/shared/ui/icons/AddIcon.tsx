import type { ComponentPropsWithoutRef } from 'react';

export function AddIcon({ className, ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      className={className}
      {...props}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 2V13M2 7.5H13" // Немного отступили от краев (с 0.5 до 2), чтобы округлые концы не обрезались рамкой SVG
        stroke="currentColor"
        strokeWidth="3" // <--- ДОБАВЛЕНО: увеличили толщину, теперь углы видно
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AddIcon;
