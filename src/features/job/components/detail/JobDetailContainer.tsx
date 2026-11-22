import {
  BasicDescriptionList,
  BasicDescriptionListItem,
  BasicTag,
  BasicTitle,
  HorizontalButtons,
  WorkIcon,
} from '@/components/ui-parts';
import { Links } from '@/constants';
import { DateUtils } from '@/utils/date';
import { isNewJob } from '../../helpers/isNewJob';
import { type Job } from '../../types/job';
import { NewTag } from '../common';

interface JobDetailContainerProps {
  job: Job;
}

export const JobDetailContainer = ({ job }: JobDetailContainerProps) => (
  <>
    <BasicTitle>お仕事詳細</BasicTitle>

    <div className="bg-pj-white mt-7 rounded-xl">
      <JobDetailHeader job={job} />

      <BasicDescriptionList className="px-8 py-6">
        <BasicDescriptionListItem term="お仕事名">
          {job.name}
        </BasicDescriptionListItem>

        <BasicDescriptionListItem term="都道府県">
          <BasicTag variant="primary">{job.prefecture.name}</BasicTag>
        </BasicDescriptionListItem>

        <BasicDescriptionListItem term="カテゴリー">
          <ul className="flex flex-wrap gap-2">
            {job.categories.map((category) => (
              <li key={category.id}>
                <BasicTag>{category.name}</BasicTag>
              </li>
            ))}
          </ul>
        </BasicDescriptionListItem>

        <BasicDescriptionListItem term="詳細">
          {job.description}
        </BasicDescriptionListItem>

        <BasicDescriptionListItem term="掲載開始日">
          {DateUtils.formatDateToYearMonthDaySlashSeparated(job.startDate)}
        </BasicDescriptionListItem>

        <BasicDescriptionListItem term="掲載終了日">
          {DateUtils.formatDateToYearMonthDaySlashSeparated(job.endDate)}
        </BasicDescriptionListItem>
      </BasicDescriptionList>
    </div>

    <HorizontalButtons
      leftHref={Links.MEMBER_JOB_LIST}
      leftLabel="もどる"
      rightHref={Links.MEMBER_JOB_EDIT(job.id)}
      rightLabel="編集する"
    />
  </>
);

interface JobDetailHeaderProps {
  job: Job;
}

const JobDetailHeader = ({ job }: JobDetailHeaderProps) => (
  <div className="border-primary flex items-center justify-between border-b px-8 py-5">
    <div className="flex items-center gap-x-3">
      <BasicTitle as="h2" fontSize="2xl">
        お仕事情報
      </BasicTitle>
      {isNewJob(job.startDate) && <NewTag />}
    </div>

    <p className="text-pj-gray flex items-center gap-x-2 text-base">
      <WorkIcon size="base" />
      JOB ID : {job.id}
    </p>
  </div>
);
