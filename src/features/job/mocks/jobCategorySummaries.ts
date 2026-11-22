import { JOB_CATEGORY_MOCKS } from '@/features/job-category/mocks/jobCategories';
import { type JobCategory } from '@/features/job-category/types/jobCategory';

type JobCategorySummary = Pick<JobCategory, 'id' | 'name'>;

/**
 * UI 作成用のテストデータ。API 接続時に差し替える。
 * カテゴリー一覧のテストデータ（id: 1〜3）を流用し、お仕事用に「設計」を足している。
 * 「設計」の id は、カテゴリー一覧のテストデータと重複しないよう 4 にしている。
 */
export const JOB_CATEGORY_SUMMARY_MOCKS: JobCategorySummary[] = [
  ...JOB_CATEGORY_MOCKS.map(({ id, name }) => ({ id, name })),
  { id: 4, name: '設計' },
];

/**
 * 名前からカテゴリーのテストデータを取得する。
 * お仕事のテストデータ作成用。見つからないときは書き間違いに気づけるようエラーにする。
 */
export const findJobCategorySummaryMocks = (
  ...names: string[]
): JobCategorySummary[] =>
  names.map((name) => {
    const category = JOB_CATEGORY_SUMMARY_MOCKS.find(
      (mock) => mock.name === name,
    );

    if (!category) {
      throw new Error(`job category mock not found: ${name}`);
    }

    return category;
  });
