'use client';

import { type PropsWithChildren } from 'react';
import { BasicContainer, BasicToast } from '@/components/ui-parts';
import { useScrollToTop } from '@/hooks';
import { Footer, GuestHeader } from '../layout-parts';

export const GuestLayout = ({ children }: PropsWithChildren) => {
  useScrollToTop();

  return (
    <div className="relative flex min-h-screen flex-col">
      <GuestHeader />

      <div className="mt-18 flex flex-1 flex-col pb-15 pt-10">
        <BasicContainer>
          <main>{children}</main>
        </BasicContainer>
      </div>

      <Footer />

      <BasicToast />
    </div>
  );
};
