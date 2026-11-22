'use client';

import { type PropsWithChildren } from 'react';
import { BasicToast } from '@/components/ui-parts';
import { useScrollToTop } from '@/hooks';
import { Footer, MemberHeader } from '../layout-parts';
import { SideMenu } from '../layout-parts/SideMenu';
import { type SideMenuLinkId } from '../layout-parts/types/sideMenuType';

interface MemberLayoutProps {
  sideMenuActiveLinkId?: SideMenuLinkId;
}

export const MemberLayout = ({
  children,
  sideMenuActiveLinkId,
}: PropsWithChildren<MemberLayoutProps>) => {
  useScrollToTop();

  return (
    <div className="relative">
      <MemberHeader />

      <div className="pb-15 min-h-pj mt-18 pt-10">
        <div className="max-w-pj mx-auto flex w-full gap-9 px-9">
          <SideMenu activeLinkId={sideMenuActiveLinkId} />
          <main className="w-full">{children}</main>
        </div>
      </div>
      <Footer />
      <BasicToast />
    </div>
  );
};
