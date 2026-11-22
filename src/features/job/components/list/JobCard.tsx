'use client';

import {
  BasicButton,
  BasicCard,
  BasicTag,
  DeleteButton,
} from '@/components/ui-parts';
import { Links } from '@/constants';
import { DateUtils } from '@/utils/date';
import { isNewJob } from '../../helpers/isNewJob';
import { type Job } from '../../types/job';
import { NewTag } from '../common';

interface JobCardProps {
  job: Job;
  isDeleting: boolean;
  onDeleteClick: (job: Job) => void;
}

export const JobCard = ({ job, isDeleting, onDeleteClick }: JobCardProps) => (
  <BasicCard className="flex flex-col">
    <div className="flex flex-col gap-y-2">
      {isNewJob(job.startDate) && <NewTag className="self-start" />}

      <div className="flex justify-between gap-x-4">
        <p className="text-primary text-2xl font-bold">{job.name}</p>

        <DeleteButton
          onClick={() => onDeleteClick(job)}
          disabled={isDeleting}
          aria-label={`${job.name}を削除する`}
        />
      </div>
    </div>

    <ul className="mt-3 flex flex-wrap gap-2">
      <li>
        <BasicTag variant="primary">{job.prefecture.name}</BasicTag>
      </li>
      {job.categories.map((category) => (
        <li key={category.id}>
          <BasicTag>{category.name}</BasicTag>
        </li>
      ))}
    </ul>

    {job.description && <p className="mt-4">{job.description}</p>}

    <div className="text-pj-gray mt-4 flex gap-x-4 text-sm">
      <p>
        掲載開始日：
        {DateUtils.formatDateToYearMonthDaySlashSeparated(job.startDate)}
      </p>
      <p>
        掲載終了日：
        {DateUtils.formatDateToYearMonthDaySlashSeparated(job.endDate)}
      </p>
    </div>

    <BasicButton
      href={Links.MEMBER_JOB_DETAIL(job.id)}
      className="mt-6 justify-center"
    >
      詳細をみる
    </BasicButton>
  </BasicCard>
);
