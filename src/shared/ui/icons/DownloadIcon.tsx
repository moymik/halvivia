export function DownloadIcon({ className, ...props }: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      className={className}
      {...props}
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 13.5V15.5C0.5 16.0304 0.710714 16.5391 1.08579 16.9142C1.46086 17.2893 1.96957 17.5 2.5 17.5H14.5C15.0304 17.5 15.5391 17.2893 15.9142 16.9142C16.2893 16.5391 16.5 16.0304 16.5 15.5V13.5M13.5 7.5L8.5 12.5L3.5 7.5M8.5 12.5V0.5"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DownloadIcon;
