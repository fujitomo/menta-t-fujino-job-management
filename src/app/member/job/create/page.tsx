import { type Metadata } from 'next';
import { JobCreateContainer } from '@/features/job/components/create/JobCreateContainer';
import { MemberLayout } from '@/components/layouts/layout';
import { SIDE_MENU_LINK_IDS } from '@/components/layouts/layout-parts/types/sideMenuType';

export const metadata: Metadata = {
  title: 'お仕事登録 | お仕事管理',
};

export default function JobCreatePage() {
  return (
    <MemberLayout sideMenuActiveLinkId={SIDE_MENU_LINK_IDS.jobCreate}>
      <JobCreateContainer />
    </MemberLayout>
  );
}
