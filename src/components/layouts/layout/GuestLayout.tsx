'use client';

import { type PropsWithChildren } from 'react';
import { BasicContainer, BasicToast } from '@/components/ui-parts';
import { useScrollToTop } from '@/hooks';
import { Footer, GuestHeader } from '../layout-parts';

export const GuestLayout = ({ children }: PropsWithChildren) => {
  useScrollToTop();

  return (
    <div className="relative">
      <GuestHeader />

      <div className="mt-18 pb-15 min-h-pj pt-10">
        <BasicContainer>
          <main>{children}</main>
        </BasicContainer>
      </div>

      <Footer />

      <BasicToast />
    </div>
  );
};
