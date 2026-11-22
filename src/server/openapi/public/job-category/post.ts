export const paths = {
  '/api/public/job-category': {
    post: {
      operationId: 'createPublicJobCategory',
      summary: '公開お仕事カテゴリを作成',
      description: '認証不要で新しいお仕事カテゴリを作成します。',
      tags: ['Public Job Category（公開）'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/JobCategoryCreateInput',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'お仕事カテゴリを正常に作成しました。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/JobCategory',
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
        '500': {
          description: 'お仕事カテゴリの作成に失敗しました。',
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
