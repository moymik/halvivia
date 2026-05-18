import type { Metadata } from 'next';
import './globals.css';
import { golosText, roboto } from '@/shared/fonts/fonts';

export const metadata: Metadata = {
  title: 'Halvivia',
  description: 'Home page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${roboto.variable} ${golosText.variable}`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
