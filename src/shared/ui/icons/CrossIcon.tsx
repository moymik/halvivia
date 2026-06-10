import { IconSVGComponentProps } from '@/shared/ui/icons/types';

export type CloseIconProps = IconSVGComponentProps;

export function CrossIcon({ className, ...props }: CloseIconProps) {
  return (
    <svg
      width="14"
      className={className}
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.00029 0.999954L12.8407 12.8404M1.00029 12.8404L12.8407 0.999954"
        stroke="currentColor"
        stroke-opacity="0.2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CrossIcon;
