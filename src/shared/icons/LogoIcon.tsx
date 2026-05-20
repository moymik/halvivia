type LogoProps = {
  className?: string;
};

export function LogoIcon({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M1.71252 28.4273L15.1972 15.7229C15.3346 15.5935 15.4125 15.4131 15.4125 15.2243V2.3974C15.4125 2.01909 15.1058 1.7124 14.7275 1.7124H2.39752C2.01921 1.7124 1.71252 2.01909 1.71252 2.3974V15.2243C1.71252 15.4131 1.79041 15.5935 1.9278 15.7229L15.4125 28.4273"
        stroke="currentColor"
        strokeWidth="3.42498"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default LogoIcon;
