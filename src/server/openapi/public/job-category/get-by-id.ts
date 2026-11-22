export const paths = {
  '/api/public/job-category/{id}': {
    get: {
      operationId: 'getPublicJobCategory',
      summary: '公開お仕事カテゴリの詳細を取得',
      description: '認証不要で指定した ID のお仕事カテゴリ詳細を取得します。',
      tags: ['Public Job Category（公開）'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
          description: '取得対象のお仕事カテゴリ ID。',
        },
      ],
      responses: {
        '200': {
          description: 'お仕事カテゴリの詳細を正常に取得しました。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/JobCategory',
              },
            },
          },
        },
        '400': {
          description: 'ID の形式が不正です。',
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
          description: 'お仕事カテゴリの取得に失敗しました。',
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
