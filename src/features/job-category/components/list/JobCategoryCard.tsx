'use client';

import { BasicButton, BasicCard, DeleteButton } from '@/components/ui-parts';
import { Links } from '@/constants';
import { type JobCategory } from '../../types/jobCategory';

interface JobCategoryCardProps {
  jobCategory: JobCategory;
  isDeleting: boolean;
  onDeleteClick: (jobCategory: JobCategory) => void;
}

export const JobCategoryCard = ({
  jobCategory,
  isDeleting,
  onDeleteClick,
}: JobCategoryCardProps) => (
  <BasicCard className="flex flex-col">
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between">
        <p className="text-primary text-2xl font-bold">{jobCategory.name}</p>

        <DeleteButton
          onClick={() => onDeleteClick(jobCategory)}
          disabled={isDeleting}
          aria-label={`${jobCategory.name}を削除する`}
        />
      </div>

      {jobCategory.description && (
        <p className="mt-3">{jobCategory.description}</p>
      )}
    </div>

    <BasicButton
      href={Links.MEMBER_JOB_CATEGORY_DETAIL(jobCategory.id)}
      className="mt-6 justify-center"
    >
      詳細をみる
    </BasicButton>
  </BasicCard>
);
