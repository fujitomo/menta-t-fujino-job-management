import { type Metadata } from 'next';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getPublicJobCategoriesQueryOptions } from '@/features/job-category/api/getPublicJobCategories';
import { JobCategoryListContainer } from '@/features/job-category/components/list/JobCategoryListContainer';
import { MemberLayout } from '@/components/layouts/layout';
import { SIDE_MENU_LINK_IDS } from '@/components/layouts/layout-parts/types/sideMenuType';
import { ApiUtils } from '@/utils/api';

export const metadata: Metadata = {
  title: 'カテゴリー一覧 | お仕事管理',
};

export default async function JobCategoryListPage() {
  const queryClient = ApiUtils.getQueryClient();
  const publicCategoriesQueryOptions = getPublicJobCategoriesQueryOptions();

  await queryClient.fetchQuery(publicCategoriesQueryOptions);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      {/* アクティブにしたいサイドメニューIDを指定する */}
      <MemberLayout sideMenuActiveLinkId={SIDE_MENU_LINK_IDS.jobCategoryList}>
        <JobCategoryListContainer />
      </MemberLayout>
    </HydrationBoundary>
  );
}
