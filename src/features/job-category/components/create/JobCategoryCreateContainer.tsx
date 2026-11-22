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
import { JobCategoryCreateForm } from './JobCategoryCreateForm';
import {
  type JobCategorySchemaType,
  jobCategorySchema,
} from '../../validations/jobCategorySchema';

export const JobCategoryCreateContainer = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobCategorySchemaType>({
    resolver: zodResolver(jobCategorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // TODO: 登録API連携の未実装
  const onSubmit = () => {
    triggerToast('カテゴリーを登録しました。');
    router.push(Links.MEMBER_JOB_CATEGORY_LIST);
  };

  return (
    <>
      <BasicTitle>カテゴリー登録</BasicTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <JobCategoryCreateForm
          register={register}
          errors={errors}
          className="mt-7"
        />

        <HorizontalButtons
          leftHref={Links.MEMBER_JOB_CATEGORY_LIST}
          leftLabel="もどる"
          rightLabel="登録する"
          rightType="submit"
          className="mt-15"
        />
      </form>
    </>
  );
};
