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
        d="M7.5 0.5V14.5M0.5 7.5H14.5"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AddIcon;
