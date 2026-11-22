export const paths = {
  '/api/job-category/{id}': {
    put: {
      operationId: 'updateJobCategory',
      summary: 'お仕事カテゴリを更新',
      description:
        '既存のお仕事カテゴリを更新します。アクセスには Bearer トークンを指定してください。',
      tags: ['Job Category（認証）'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
          description: '更新対象のお仕事カテゴリ ID。',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/JobCategoryUpdateInput',
            },
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'お仕事カテゴリを正常に更新しました。',
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
        '401': {
          description:
            '認証に失敗しました。正しいアクセストークンを指定してください。',

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
          description: 'お仕事カテゴリの更新に失敗しました。',
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
