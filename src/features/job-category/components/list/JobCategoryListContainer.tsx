'use client';

import {
  BasicLoading,
  ChevronLink,
  TitleWithCount,
} from '@/components/ui-parts';
import { Links } from '@/constants';
import { JobCategoryCard } from './JobCategoryCard';
import { useGetPublicJobCategories } from '../../api/getPublicJobCategories';

export const JobCategoryListContainer = () => {
  const { data: jobCategories, isFetching: isGetPublicJobCategoriesFetching } =
    useGetPublicJobCategories();

  if (isGetPublicJobCategoriesFetching || !jobCategories) {
    return <BasicLoading />;
  }

  return (
    <>
      <div className="flex justify-between">
        <TitleWithCount count={jobCategories.length}>
          カテゴリー一覧
        </TitleWithCount>

        <ChevronLink
          href={Links.MEMBER_JOB_CATEGORY_CREATE}
          className="gap-x-3"
        >
          カテゴリーを登録する
        </ChevronLink>
      </div>

      <ul className="mt-7 grid gap-y-5">
        {jobCategories.map((jobCategory) => (
          <li key={jobCategory.id}>
            <JobCategoryCard
              jobCategory={jobCategory}
              isDeleting={false}
              onDeleteClick={() => {}}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
