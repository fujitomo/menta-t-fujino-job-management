import { type Metadata } from 'next';
import { JobListContainer } from '@/features/job/components/list/JobListContainer';
import { MemberLayout } from '@/components/layouts/layout';
import { SIDE_MENU_LINK_IDS } from '@/components/layouts/layout-parts/types/sideMenuType';

export const metadata: Metadata = {
  title: 'お仕事一覧 | お仕事管理',
};

export default function JobListPage() {
  return (
    <MemberLayout sideMenuActiveLinkId={SIDE_MENU_LINK_IDS.jobList}>
      <JobListContainer />
    </MemberLayout>
  );
}
