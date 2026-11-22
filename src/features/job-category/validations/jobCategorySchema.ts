import { z } from 'zod';

export const jobCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'カテゴリー名は必須項目です。')
    .max(255, 'カテゴリー名は255文字以内で入力してください。'),
  description: z.string().max(255, '説明は255文字以内で入力してください。'),
});

/** カテゴリー作成・編集フォームの入力値。 */
export type JobCategorySchemaType = z.infer<typeof jobCategorySchema>;
