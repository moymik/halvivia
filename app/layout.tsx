import type { Metadata } from 'next';
import '@/app/styles/globals.css';

import { roboto, tiktokSans } from 'src/shared/config';
import { Header } from 'src/widgets/Header';

import 'src/app/styles/typography.css';
import { AuthModal } from '@/features/auth/ui/AuthModal';
import { AuthForm } from '@/features/auth/ui/AuthForm';
import { QueryProvider } from '@/app/providers/QueryProvider';
import { TooltipProvider } from '@/shared/ui/tooltip/Tooltip';
import { MainContent } from './MainContent';
import { AddSubjectDialogs } from '@/features/addSubject/ui/AddSubjectDialogs';

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: 'Halvivia',
  icons: {
    icon: '/favicon.svg',
  },
};

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`h-full antialiased ${roboto.variable} ${tiktokSans.variable}`}>
      <body className="flex h-screen flex-col overflow-hidden">
        <QueryProvider>
          <TooltipProvider>
            <Header>
              <AuthModal>
                <AuthForm />
              </AuthModal>
            </Header>

            <MainContent>{children}</MainContent>
            <AddSubjectDialogs />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

export default RootLayout;
