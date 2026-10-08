import { IconSVGComponentProps } from '@/shared/ui/icons/types';

export type CloseIconProps = IconSVGComponentProps;

export function CrossIcon({ className, ...props }: CloseIconProps) {
  return (
    <svg
      {...props}
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00029 0.999954L12.8407 12.8404M1.00029 12.8404L12.8407 0.999954"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CrossIcon;
