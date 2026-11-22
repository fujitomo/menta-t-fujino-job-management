import { type Metadata } from 'next';
import { JobCategoryDetailContainer } from '@/features/job-category/components/detail/JobCategoryDetailContainer';
import { findJobCategoryMock } from '@/features/job-category/mocks/jobCategories';
import { MemberLayout } from '@/components/layouts/layout';
import { type PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'カテゴリー詳細 | お仕事管理',
};

type JobCategoryDetailPageProps = {
  jobCategoryId: string;
};

export default async function JobCategoryDetailPage({
  params,
}: PageProps<JobCategoryDetailPageProps>) {
  // API 未接続のため、テストデータを表示する
  const jobCategory = findJobCategoryMock(Number(params.jobCategoryId));

  return (
    <MemberLayout>
      <JobCategoryDetailContainer jobCategory={jobCategory} />
    </MemberLayout>
  );
}
