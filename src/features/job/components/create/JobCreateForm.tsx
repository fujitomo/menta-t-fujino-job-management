'use client';

import { useId } from 'react';
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { type JobCategory } from '@/features/job-category/types/jobCategory';
import { type Prefecture } from '@/features/master/types/prefecture';
import {
  BasicDatepicker,
  BasicSelect,
  BasicTextArea,
  BasicTextField,
  FormSection,
} from '@/components/ui-parts';
import { type JobSchemaType } from '../../validations/jobSchema';

/** 都道府県・カテゴリー・日付の入力欄でそろえる幅。 */
const FIELD_WIDTH_CLASS = 'w-80';

type PrefectureOption = Pick<Prefecture, 'id' | 'name'>;
type CategoryOption = Pick<JobCategory, 'id' | 'name'>;

interface JobCreateFormProps {
  register: UseFormRegister<JobSchemaType>;
  /** 日付欄用。×ボタンで値を空に戻すため、register ではなく Controller でつなぐ。 */
  control: Control<JobSchemaType>;
  errors: FieldErrors<JobSchemaType>;
  prefectures: PrefectureOption[];
  categories: CategoryOption[];
  className?: string;
}

/** お仕事登録の入力欄。 */
export const JobCreateForm = ({
  register,
  control,
  errors,
  prefectures,
  categories,
  className,
}: JobCreateFormProps) => {
  const nameId = useId();
  // フォームの項目名（prefectureId / categoryId）と紛れないよう、Select を付けている
  const prefectureSelectId = useId();
  const categorySelectId = useId();
  const descriptionId = useId();
  const startDateId = useId();
  const endDateId = useId();

  return (
    <div className={twMerge('space-y-8', className)}>
      <FormSection
        label="お仕事名"
        htmlFor={nameId}
        errorMessage={errors.name?.message}
        render={(ariaProps) => (
          <BasicTextField
            id={nameId}
            className="w-150"
            placeholder="お仕事名を入力してください。"
            {...register('name')}
            {...ariaProps}
          />
        )}
      />

      <FormSection
        label="都道府県"
        htmlFor={prefectureSelectId}
        errorMessage={errors.prefectureId?.message}
        render={(ariaProps) => (
          <BasicSelect
            id={prefectureSelectId}
            className={FIELD_WIDTH_CLASS}
            {...register('prefectureId')}
            {...ariaProps}
          >
            {/* hidden で一覧には出さず、未選択のときの表示にだけ使う */}
            <option value="" hidden>
              都道府県を選択してください。
            </option>
            {prefectures.map((prefecture) => (
              <option key={prefecture.id} value={prefecture.id}>
                {prefecture.name}
              </option>
            ))}
          </BasicSelect>
        )}
      />

      <FormSection
        label="カテゴリー"
        htmlFor={categorySelectId}
        errorMessage={errors.categoryId?.message}
        render={(ariaProps) => (
          <BasicSelect
            id={categorySelectId}
            className={FIELD_WIDTH_CLASS}
            {...register('categoryId')}
            {...ariaProps}
          >
            <option value="" hidden>
              カテゴリーを選択してください。
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </BasicSelect>
        )}
      />

      <FormSection
        label="詳細"
        htmlFor={descriptionId}
        errorMessage={errors.description?.message}
        render={(ariaProps) => (
          <BasicTextArea
            id={descriptionId}
            placeholder="詳細を入力してください。"
            {...register('description')}
            {...ariaProps}
          />
        )}
      />

      <FormSection
        label="掲載開始日"
        htmlFor={startDateId}
        errorMessage={errors.startDate?.message}
        render={(ariaProps) => (
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <BasicDatepicker
                id={startDateId}
                className={FIELD_WIDTH_CLASS}
                placeholder="掲載開始日を選択してください。"
                {...field}
                onChange={(event) => field.onChange(event.target.value)}
                onClear={() => field.onChange('')}
                {...ariaProps}
              />
            )}
          />
        )}
      />

      <FormSection
        label="掲載終了日"
        htmlFor={endDateId}
        errorMessage={errors.endDate?.message}
        render={(ariaProps) => (
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <BasicDatepicker
                id={endDateId}
                className={FIELD_WIDTH_CLASS}
                placeholder="掲載終了日を選択してください。"
                {...field}
                onChange={(event) => field.onChange(event.target.value)}
                onClear={() => field.onChange('')}
                {...ariaProps}
              />
            )}
          />
        )}
      />
    </div>
  );
};
