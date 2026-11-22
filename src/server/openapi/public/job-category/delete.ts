export const paths = {
  '/api/public/job-category/{id}': {
    delete: {
      operationId: 'deletePublicJobCategory',
      summary: '公開お仕事カテゴリを削除',
      description: '認証不要で既存のお仕事カテゴリを削除します。',
      tags: ['Public Job Category（公開）'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
          description: '削除対象のお仕事カテゴリ ID。',
        },
      ],
      responses: {
        '200': {
          description: 'お仕事カテゴリを正常に削除しました。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DeleteResponse',
              },
            },
          },
        },
        '400': {
          description: '入力値の検証に失敗しました。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '404': {
          description: '指定したお仕事カテゴリが見つかりません。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '500': {
          description: 'お仕事カテゴリの削除に失敗しました。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
  },
} as const;
