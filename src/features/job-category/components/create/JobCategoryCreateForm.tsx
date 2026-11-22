'use client';

import { useId } from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { BasicTextField, FormSection } from '@/components/ui-parts';
import { type JobCategorySchemaType } from '../../validations/jobCategorySchema';

interface JobCategoryCreateFormProps {
  register: UseFormRegister<JobCategorySchemaType>;
  errors: FieldErrors<JobCategorySchemaType>;
  className?: string;
}

/** カテゴリー登録の入力欄。編集画面とは分けて持つ。 */
export const JobCategoryCreateForm = ({
  register,
  errors,
  className,
}: JobCategoryCreateFormProps) => {
  const nameId = useId();
  const descriptionId = useId();

  return (
    <div className={twMerge('space-y-8', className)}>
      <FormSection
        label="カテゴリー名"
        htmlFor={nameId}
        errorMessage={errors.name?.message}
        render={(ariaProps) => (
          <BasicTextField
            id={nameId}
            className="w-80"
            placeholder="カテゴリー名を入力してください。"
            {...register('name')}
            {...ariaProps}
          />
        )}
      />

      <FormSection
        label="説明"
        htmlFor={descriptionId}
        errorMessage={errors.description?.message}
        render={(ariaProps) => (
          <BasicTextField
            id={descriptionId}
            placeholder="説明を入力してください。"
            {...register('description')}
            {...ariaProps}
          />
        )}
      />
    </div>
  );
};
