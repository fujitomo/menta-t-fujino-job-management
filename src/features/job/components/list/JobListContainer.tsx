'use client';

import { ChevronLink, TitleWithCount } from '@/components/ui-parts';
import { Links } from '@/constants';
import { JobCard } from './JobCard';
import { JobSearchForm } from './JobSearchForm';
import { JOB_CATEGORY_SUMMARY_MOCKS } from '../../mocks/jobCategorySummaries';
import { JOB_MOCKS } from '../../mocks/jobs';
import { PREFECTURE_MOCKS } from '../../mocks/prefectures';

export const JobListContainer = () => {
  // TODO: お仕事一覧APIの未連携（現在はテストデータを表示）
  const jobs = JOB_MOCKS;

  return (
    <>
      <div className="flex justify-between">
        <TitleWithCount count={jobs.length}>お仕事一覧</TitleWithCount>

        <ChevronLink href={Links.MEMBER_JOB_CREATE} className="gap-x-3">
          お仕事を登録する
        </ChevronLink>
      </div>

      <JobSearchForm
        prefectures={PREFECTURE_MOCKS}
        categories={JOB_CATEGORY_SUMMARY_MOCKS}
        className="mt-7"
      />

      <ul className="border-pj-gray-600 mt-6 grid gap-y-5 border-t pt-6">
        {jobs.map((job) => (
          <li key={job.id}>
            <JobCard job={job} isDeleting={false} onDeleteClick={() => {}} />
          </li>
        ))}
      </ul>
    </>
  );
};
