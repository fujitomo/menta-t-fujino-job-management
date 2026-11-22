import { z } from 'zod';

/**
 * お仕事登録フォームの入力ルール。
 * <select> と <input type="date"> の値は文字列で届くので、すべて文字列で検証する。
 * 未選択・未入力のときは空文字になる。
 */
export const jobSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'お仕事名は必須項目です。')
    .max(255, 'お仕事名は255文字以内で入力してください。'),
  prefectureId: z.string().min(1, '都道府県は必須項目です。'),
  categoryId: z.string().min(1, 'カテゴリーは必須項目です。'),
  description: z.string().max(255, '詳細は255文字以内で入力してください。'),
  startDate: z.string().min(1, '掲載開始日は必須項目です。'),
  endDate: z.string().min(1, '掲載終了日は必須項目です。'),
});

/** お仕事登録フォームの入力値。 */
export type JobSchemaType = z.infer<typeof jobSchema>;
