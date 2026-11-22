import { type Metadata } from 'next';
import { JobCategoryCreateContainer } from '@/features/job-category/components/create/JobCategoryCreateContainer';
import { MemberLayout } from '@/components/layouts/layout';
import { SIDE_MENU_LINK_IDS } from '@/components/layouts/layout-parts/types/sideMenuType';

export const metadata: Metadata = {
  title: 'カテゴリー登録 | お仕事管理',
};

export default function JobCategoryCreatePage() {
  return (
    <MemberLayout sideMenuActiveLinkId={SIDE_MENU_LINK_IDS.jobCategoryCreate}>
      <JobCategoryCreateContainer />
    </MemberLayout>
  );
}
