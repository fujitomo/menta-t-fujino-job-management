import { type JobCategory } from '@/features/job-category/types/jobCategory';
import { type Prefecture } from '@/features/master/types/prefecture';

/** /api/public/jobs のレスポンス1件に対応する型。 */
export interface Job {
  /** お仕事ID。詳細ページのURLに使う。 */
  id: number;
  /** カードの見出しになるお仕事名。 */
  name: string;
  /** カード本文。未入力のときは null。 */
  description: string | null;
  /** 掲載開始日。NEW 判定と掲載期間の表示に使う。 */
  startDate: Date | string;
  /** 掲載終了日。 */
  endDate: Date | string;
  /** 登録日時。 */
  createdAt: Date | string;
  /** 更新日時。 */
  updatedAt: Date | string;
  /** 勤務地の都道府県。id と name だけを使う。 */
  prefecture: Pick<Prefecture, 'id' | 'name'>;
  /** 紐づくカテゴリー。0件のこともある。 */
  categories: Pick<JobCategory, 'id' | 'name'>[];
}
