import type { ComponentPropsWithoutRef } from 'react';

export function ArrowIcon({ className, ...props }: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      className={className}
      width="13"
      height="17"
      viewBox="0 0 13 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.8683 16.6565C2.5602 16.8798 2.18944 17 1.80896 17C0.156879 17 -0.62737 14.9648 0.597521 13.8562L4.87713 9.98285C5.75437 9.18889 5.75437 7.81111 4.87713 7.01715L0.597517 3.14383C-0.627374 2.03522 0.156878 0 1.80896 0C2.18944 0 2.5602 0.120215 2.8683 0.34348L11.8891 6.88052C12.991 7.67902 12.991 9.32098 11.8891 10.1195L2.8683 16.6565Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ArrowIcon;
