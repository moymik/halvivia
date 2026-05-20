import type { Metadata } from 'next';
import './globals.css';
import '@/shared/typography/typography.css';

import { golosText, roboto } from '@/shared/fonts/fonts';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

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
      <body className="flex min-h-full flex-col justify-between">
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
