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
import { JobCategoryEditForm } from './JobCategoryEditForm';
import { type JobCategory } from '../../types/jobCategory';
import {
  type JobCategorySchemaType,
  jobCategorySchema,
} from '../../validations/jobCategorySchema';

interface JobCategoryEditContainerProps {
  jobCategory: JobCategory;
}

export const JobCategoryEditContainer = ({
  jobCategory,
}: JobCategoryEditContainerProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobCategorySchemaType>({
    resolver: zodResolver(jobCategorySchema),
    defaultValues: {
      name: jobCategory.name,
      description: jobCategory.description ?? '',
    },
  });

  // TODO: 更新API連携の未実装
  const onSubmit = () => {
    triggerToast('カテゴリーを更新しました。');
    router.push(Links.MEMBER_JOB_CATEGORY_DETAIL(jobCategory.id));
  };

  return (
    <>
      <BasicTitle>カテゴリー編集</BasicTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <JobCategoryEditForm
          register={register}
          errors={errors}
          className="mt-7"
        />

        <HorizontalButtons
          leftHref={Links.MEMBER_JOB_CATEGORY_DETAIL(jobCategory.id)}
          leftLabel="もどる"
          rightLabel="更新する"
          rightType="submit"
          className="mt-15"
        />
      </form>
    </>
  );
};
