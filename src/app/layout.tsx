import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/providers/tq-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata: Metadata = {
  title: 'TODO APP',
  description: '간단한 할일에 대한 CRUD 사이트입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <Providers>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
