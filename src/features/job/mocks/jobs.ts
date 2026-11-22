import { addDays, format, subMonths } from 'date-fns';
import { findJobCategorySummaryMocks } from './jobCategorySummaries';
import { findPrefectureMock } from './prefectures';
import { type Job } from '../types/job';

const DATE_FORMAT = 'yyyy-MM-dd';

/** 実行日から days 日ずらした日付（YYYY-MM-DD）。NEW 表示を日付が変わっても保つために使う。 */
const daysFromToday = (days: number) =>
  format(addDays(new Date(), days), DATE_FORMAT);

/** ちょうど1か月前の日付（YYYY-MM-DD）。NEW の境界値の確認用。 */
const oneMonthAgo = () => format(subMonths(new Date(), 1), DATE_FORMAT);

/** 説明文の長さを確認するためのダミー文。 */
const DUMMY_DESCRIPTION = 'ここにお仕事の詳細情報が表示されます。';

/**
 * UI 作成用のテストデータ。API 接続時に差し替える。
 * 掲載開始日は実行日基準なので、日付が変わっても NEW の表示パターンが変わらない。
 * 各データがどの表示パターンの確認用かは、データ上のコメントに書いている。
 */
export const JOB_MOCKS: Job[] = [
  {
    // NEW なし（掲載開始日が1年以上前）
    id: 1,
    name: '仕様書を作成する',
    description: 'API ドキュメントの初稿を作成します。',
    prefecture: findPrefectureMock('東京都'),
    startDate: '2025-01-01',
    endDate: '2025-01-02',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T12:00:00Z',
    categories: findJobCategorySummaryMocks('設計'),
  },
  {
    // NEW なし（掲載開始日が2か月前）・説明が長い・カテゴリー2件
    id: 2,
    name: '【有名大手企業】経理事務 時給¥1,900〜 高待遇！',
    description: DUMMY_DESCRIPTION.repeat(5),
    prefecture: findPrefectureMock('東京都'),
    startDate: daysFromToday(-60),
    endDate: daysFromToday(30),
    createdAt: '2026-02-25T11:13:57.153141+00:00',
    updatedAt: '2026-02-25T11:13:57.153141+00:00',
    categories: findJobCategorySummaryMocks('日払い', '週払い'),
  },
  {
    // NEW あり（3日前に掲載開始）
    id: 3,
    name: '単発アルバイト 緊急募集！ 未経験歓迎 + 接客業務',
    description: DUMMY_DESCRIPTION.repeat(4),
    prefecture: findPrefectureMock('東京都'),
    startDate: daysFromToday(-3),
    endDate: daysFromToday(60),
    createdAt: '2026-03-01T09:00:00.000000+00:00',
    updatedAt: '2026-03-01T09:00:00.000000+00:00',
    categories: findJobCategorySummaryMocks('日払い', '在宅ワーク'),
  },
  {
    // NEW あり（掲載開始日が未来でも対象）・カテゴリー3件
    id: 4,
    name: '夏のフェスティバル',
    description: '今年の夏に開催されるフェスティバル2026のお仕事です。',
    prefecture: findPrefectureMock('鹿児島県'),
    startDate: daysFromToday(10),
    endDate: daysFromToday(25),
    createdAt: '2026-02-25T11:13:57.153141+00:00',
    updatedAt: '2026-02-25T11:13:57.153141+00:00',
    categories: findJobCategorySummaryMocks('日払い', '週払い', '在宅ワーク'),
  },
  {
    // NEW あり（ちょうど1か月前は含む＝境界値）・説明に改行あり
    id: 5,
    name: '在宅でできるデータ入力スタッフ',
    description: '自宅で完結するデータ入力のお仕事です。\n初心者歓迎です。',
    prefecture: findPrefectureMock('神奈川県'),
    startDate: oneMonthAgo(),
    endDate: daysFromToday(90),
    createdAt: '2026-03-05T09:00:00.000000+00:00',
    updatedAt: '2026-03-05T09:00:00.000000+00:00',
    categories: findJobCategorySummaryMocks('在宅ワーク'),
  },
  {
    // NEW なし・説明なし・カテゴリーなし・掲載終了済み
    id: 6,
    name: 'イベント設営スタッフ（説明・カテゴリーなし）',
    description: '',
    prefecture: findPrefectureMock('大阪府'),
    startDate: daysFromToday(-90),
    endDate: daysFromToday(-30),
    createdAt: '2026-03-10T09:00:00.000000+00:00',
    updatedAt: '2026-03-10T09:00:00.000000+00:00',
    categories: [],
  },
];

/**
 * ID からテストデータを取得する。
 * API 未接続のため、見つからない場合は先頭を返す。
 */
export const findJobMock = (jobId: number): Job =>
  JOB_MOCKS.find(({ id }) => id === jobId) ?? JOB_MOCKS[0];
