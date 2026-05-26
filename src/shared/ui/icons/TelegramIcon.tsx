import { IconSVGComponentProps } from './types';

export type TelegramIconProps = IconSVGComponentProps;

export const TelegramIcon = ({}: TelegramIconProps) => {
  return (
    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 6.5L8.5 10.5L14.5 16.5L18.5 0.5L0.5 7.5L4.5 9.5L6.5 15.5L9.5 11.5"
        fill="#F9F9F9"
      />
      <path
        d="M12.5 6.5L8.5 10.5L14.5 16.5L18.5 0.5L0.5 7.5L4.5 9.5L6.5 15.5L9.5 11.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TelegramIcon;
