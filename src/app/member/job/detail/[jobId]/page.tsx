import { type Metadata } from 'next';
import { JobDetailContainer } from '@/features/job/components/detail/JobDetailContainer';
import { findJobMock } from '@/features/job/mocks/jobs';
import { MemberLayout } from '@/components/layouts/layout';
import { type PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'お仕事詳細 | お仕事管理',
};

type JobDetailPageProps = {
  jobId: string;
};

export default async function JobDetailPage({
  params,
}: PageProps<JobDetailPageProps>) {
  // API 未接続のため、テストデータを表示する
  const job = findJobMock(Number(params.jobId));

  return (
    <MemberLayout>
      <JobDetailContainer job={job} />
    </MemberLayout>
  );
}
