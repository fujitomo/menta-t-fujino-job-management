'use client';

/**
 * 都道府県情報の型
 */
interface Prefecture {
  /** 都道府県ID */
  id: number;
  /** 都道府県名 */
  name: string;
  /** 登録日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

/**
 * 都道府県カードコンポーネントのProps型
 */
interface ExamplePrefectureCardProps {
  /** 都道府県情報 */
  prefecture: Prefecture;
  /** クラス名 */
  className?: string;
}

/**
 * サンプル都道府県カードコンポーネント
 * @param prefecture 都道府県情報
 * @param className クラス名
 * @return サンプル都道府県カードコンポーネント
 */
export const ExamplePrefectureCard = ({
  prefecture,
  className = '',
}: ExamplePrefectureCardProps) => {
  return (
    <div className={className}>
      <div className="w-120 bg-primary text-pj-white rounded-xl p-6">
        <p className="text-lg font-bold">{prefecture.name}</p>

        <div className="mt-3 flex gap-x-3 text-sm">
          {/* Challenge: createdAtを表示してみよう！ */}
          <p>登録日：</p>
          {/* Challenge: updatedAtを表示してみよう！ */}
          <p>更新日：</p>
        </div>
      </div>
    </div>
  );
};
