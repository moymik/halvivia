import type { Metadata } from 'next';

import { golosText, roboto } from 'src/shared/config';
import { Footer } from 'src/widgets/Footer';
import { Header } from 'src/widgets/Header';

import 'src/app/styles/globals.css';
import 'src/app/styles/typography.css';
import { AuthModal } from '@/features/auth/ui/AuthModal';
import { AuthForm } from '@/features/auth/ui/AuthForm';

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: 'Halvivia',
  description: 'Home page',
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`h-full antialiased ${roboto.variable} ${golosText.variable}`}>
      <body className="flex min-h-full flex-col justify-between">
        <Header>
          <AuthModal>
            <AuthForm></AuthForm>
          </AuthModal>
        </Header>

        <main className="flex-1">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}

export default RootLayout;
