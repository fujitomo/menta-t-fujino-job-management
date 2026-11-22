'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BasicTitle,
  HorizontalButtons,
  triggerToast,
} from '@/components/ui-parts';
import { Links } from '@/constants';
import { JobCreateForm } from './JobCreateForm';
import { JOB_CATEGORY_SUMMARY_MOCKS } from '../../mocks/jobCategorySummaries';
import { PREFECTURE_MOCKS } from '../../mocks/prefectures';
import { type JobSchemaType, jobSchema } from '../../validations/jobSchema';

export const JobCreateContainer = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JobSchemaType>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      name: '',
      prefectureId: '',
      categoryId: '',
      description: '',
      startDate: '',
      endDate: '',
    },
  });

  // TODO: 登録API連携の未実装
  const onSubmit = () => {
    triggerToast('お仕事を登録しました。');
    router.push(Links.MEMBER_JOB_LIST);
  };

  return (
    <>
      <BasicTitle>お仕事登録</BasicTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: 都道府県・カテゴリー一覧APIの未連携（現在はテストデータを表示） */}
        <JobCreateForm
          register={register}
          control={control}
          errors={errors}
          prefectures={PREFECTURE_MOCKS}
          categories={JOB_CATEGORY_SUMMARY_MOCKS}
          className="mt-7"
        />

        <HorizontalButtons
          leftHref={Links.MEMBER_JOB_LIST}
          leftLabel="もどる"
          rightLabel="登録する"
          rightType="submit"
          className="mt-15"
        />
      </form>
    </>
  );
};
