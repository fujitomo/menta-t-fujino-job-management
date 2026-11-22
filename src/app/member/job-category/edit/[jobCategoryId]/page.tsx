import { type Metadata } from 'next';
import { JobCategoryEditContainer } from '@/features/job-category/components/edit/JobCategoryEditContainer';
import { findJobCategoryMock } from '@/features/job-category/mocks/jobCategories';
import { MemberLayout } from '@/components/layouts/layout';
import { type PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'カテゴリー編集 | お仕事管理',
};

type JobCategoryEditPageProps = {
  jobCategoryId: string;
};

export default async function JobCategoryEditPage({
  params,
}: PageProps<JobCategoryEditPageProps>) {
  // API 未接続のため、テストデータを表示する
  const jobCategory = findJobCategoryMock(Number(params.jobCategoryId));

  return (
    <MemberLayout>
      <JobCategoryEditContainer jobCategory={jobCategory} />
    </MemberLayout>
  );
}
