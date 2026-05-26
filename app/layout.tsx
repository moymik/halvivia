import type { Metadata } from 'next';

import { golosText, roboto } from 'src/shared/config';
import { Footer } from 'src/widgets/Footer';
import { Header } from 'src/widgets/Header';

import 'src/app/styles/globals.css';
import 'src/app/styles/typography.css';

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
