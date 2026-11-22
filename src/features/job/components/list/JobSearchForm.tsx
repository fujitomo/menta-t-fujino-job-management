'use client';

import { type FormEvent } from 'react';
import { type JobCategory } from '@/features/job-category/types/jobCategory';
import { type Prefecture } from '@/features/master/types/prefecture';
import {
  BasicButton,
  BasicSelect,
  BasicTextField,
} from '@/components/ui-parts';

const SELECT_WIDTH_CLASS = 'w-60';

type PrefectureOption = Pick<Prefecture, 'id' | 'name'>;
type CategoryOption = Pick<JobCategory, 'id' | 'name'>;

interface JobSearchFormProps {
  prefectures: PrefectureOption[];
  categories: CategoryOption[];
  className?: string;
}

export const JobSearchForm = ({
  prefectures,
  categories,
  className,
}: JobSearchFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 検索処理の未実装（API連携時に対応する）
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex items-start gap-x-4">
        <div className="min-w-0 flex-1">
          <BasicTextField
            name="name"
            placeholder="お仕事名"
            aria-label="お仕事名"
            fontSize="base"
          />
        </div>
        <BasicSelect
          name="prefectureId"
          aria-label="都道府県"
          defaultValue=""
          fontSize="base"
          className={SELECT_WIDTH_CLASS}
        >
          <option value="">都道府県</option>
          {prefectures.map((prefecture: PrefectureOption) => (
            <option key={prefecture.id} value={prefecture.id}>
              {prefecture.name}
            </option>
          ))}
        </BasicSelect>
        <BasicSelect
          name="categoryId"
          aria-label="カテゴリー"
          defaultValue=""
          fontSize="base"
          className={SELECT_WIDTH_CLASS}
        >
          <option value="">カテゴリー</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </BasicSelect>
      </div>
      <div className="mt-5 flex items-center justify-end gap-x-4">
        {/* TODO: リセット処理の未実装 */}
        <button type="button" className="text-primary text-base font-bold">
          リセット
        </button>
        <BasicButton type="submit" paddingX={15} paddingY={4}>
          検索
        </BasicButton>
      </div>
    </form>
  );
};
