import { IconSVGComponentProps } from './types';

export type NotificationIconProps = IconSVGComponentProps;

export function NotificationIcon({ active, className }: NotificationIconProps) {
  return (
    <div className="relative inline-flex">
      <svg viewBox="0 0 23 26" fill="none" className={className}>
        <path
          d="M7.51855 18.7686V20.0186C7.51855 21.0131 7.91364 21.9669 8.6169 22.6702C9.32017 23.3735 10.274 23.7686 11.2686 23.7686C12.2631 23.7686 13.2169 23.3735 13.9202 22.6702C14.6235 21.9669 15.0186 21.0131 15.0186 20.0186V18.7686M8.76855 3.76855C8.76855 3.10551 9.03195 2.46963 9.50079 2.00079C9.96963 1.53195 10.6055 1.26855 11.2686 1.26855C11.9316 1.26855 12.5675 1.53195 13.0363 2.00079C13.5052 2.46963 13.7686 3.10551 13.7686 3.76855C15.2041 4.44734 16.4278 5.50396 17.3086 6.82518C18.1894 8.1464 18.6941 9.6824 18.7686 11.2686V15.0186C18.8626 15.7957 19.1378 16.5399 19.5721 17.1912C20.0063 17.8425 20.5874 18.3828 21.2686 18.7686H1.26855C1.94973 18.3828 2.53082 17.8425 2.96504 17.1912C3.39926 16.5399 3.67449 15.7957 3.76855 15.0186V11.2686C3.843 9.6824 4.34768 8.1464 5.22849 6.82518C6.1093 5.50396 7.33304 4.44734 8.76855 3.76855Z"
          stroke="currentColor"
          strokeWidth="2.53676"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {active && <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500" />}
    </div>
  );
}

export default NotificationIcon;
