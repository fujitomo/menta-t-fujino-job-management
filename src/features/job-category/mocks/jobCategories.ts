import { type JobCategory } from '../types/jobCategory';

/** UI 作成用のテストデータ。API 接続時に差し替える。 */
export const JOB_CATEGORY_MOCKS: JobCategory[] = [
  {
    id: 1,
    name: '日払い',
    description:
      'ここにカテゴリーの説明が存在する場合は表示されます（メモ的な役割として働きます。）',
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-01T10:00:00.000Z',
  },
  {
    id: 2,
    name: '週払い',
    description: '',
    createdAt: '2026-09-02T10:00:00.000Z',
    updatedAt: '2026-09-02T10:00:00.000Z',
  },
  {
    id: 3,
    name: '在宅ワーク',
    description: '自宅で完結するお仕事です。\n初心者歓迎の案件が中心です。',
    createdAt: '2026-09-03T10:00:00.000Z',
    updatedAt: '2026-09-03T10:00:00.000Z',
  },
];

/**
 * ID からテストデータを取得する。
 * API 未接続で一覧の ID と一致しないため、見つからない場合は先頭を返す。
 */
export const findJobCategoryMock = (jobCategoryId: number): JobCategory =>
  JOB_CATEGORY_MOCKS.find(({ id }) => id === jobCategoryId) ??
  JOB_CATEGORY_MOCKS[0];
