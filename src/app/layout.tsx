import { type Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import '@/styles/globals.css';
import Provider from './provider';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'お仕事管理',
  description: 'お仕事管理 APP | Next × TypeScript',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
