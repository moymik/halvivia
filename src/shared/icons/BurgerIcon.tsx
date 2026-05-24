import { IconSVGComponentProps } from './types';

export type BurgerIconProps = IconSVGComponentProps;

export function BurgerIcon({ className }: BurgerIconProps) {
  return (
    <svg className={className} viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.77417 0.77417H16.7742M0.77417 6.77417H16.7742M0.77417 12.7742H16.7742"
        stroke="currentColor"
        strokeWidth="1.54839"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BurgerIcon;
