export const paths = {
  '/api/job-category/{id}': {
    delete: {
      operationId: 'deleteJobCategory',
      summary: 'お仕事カテゴリを削除',
      description:
        '指定したお仕事カテゴリを削除します。アクセスには Bearer トークンを指定してください。',
      tags: ['Job Category（認証）'],
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
      security: [
        {
          BearerAuth: [],
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
