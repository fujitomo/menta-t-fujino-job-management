import {
  BasicDescriptionList,
  BasicDescriptionListItem,
  BasicTitle,
  HorizontalButtons,
} from '@/components/ui-parts';
import { Links } from '@/constants';
import { type JobCategory } from '../../types/jobCategory';

interface JobCategoryDetailContainerProps {
  jobCategory: JobCategory;
}

export const JobCategoryDetailContainer = ({
  jobCategory,
}: JobCategoryDetailContainerProps) => (
  <>
    <BasicTitle>カテゴリー詳細</BasicTitle>

    <div className="bg-pj-white mt-7 rounded-xl">
      <BasicTitle
        as="h1"
        fontSize="2xl"
        className="border-primary border-b px-8 py-5"
      >
        カテゴリー情報
      </BasicTitle>

      <BasicDescriptionList className="px-8 py-6">
        <BasicDescriptionListItem term="カテゴリー名">
          {jobCategory.name}
        </BasicDescriptionListItem>

        <BasicDescriptionListItem term="詳細">
          {jobCategory.description}
        </BasicDescriptionListItem>
      </BasicDescriptionList>
    </div>

    <HorizontalButtons
      leftHref={Links.MEMBER_JOB_CATEGORY_LIST}
      leftLabel="もどる"
      rightHref={Links.MEMBER_JOB_CATEGORY_EDIT(jobCategory.id)}
      rightLabel="編集する"
    />
  </>
);
