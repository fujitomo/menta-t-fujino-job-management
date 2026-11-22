/** /api/public/job-category のレスポンス1件に対応する型。 */
export interface JobCategory {
  /** カテゴリーID。詳細・編集ページのURLに使う。 */
  id: number;
  /** カードの見出しになるカテゴリー名。例: 日払い */
  name: string;
  /** カテゴリーの説明文。 */
  description: string | null;
  /** 登録日時。 */
  createdAt: Date | string;
  /** 更新日時。 */
  updatedAt: Date | string;
}
