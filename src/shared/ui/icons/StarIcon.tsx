export function StarIcon({ className, ...props }: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      className={className}
      {...props}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.493 16.248L4.321 19.493L5.5 12.62L0.5 7.753L7.4 6.753L10.486 0.5L13.572 6.753L20.472 7.753L15.472 12.62L16.651 19.493L10.493 16.248Z"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default StarIcon;
