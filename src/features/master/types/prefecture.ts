/** /api/public/prefectures のレスポンス1件に対応する型。 */
export interface Prefecture {
  /** 都道府県ID。フォーム送信時の prefectureId に使う。 */
  id: number;
  /** 画面に出す都道府県名。例: 東京都 */
  name: string;
  /** 登録日時。 */
  createdAt: Date | string;
  /** 更新日時。 */
  updatedAt: Date | string;
}
