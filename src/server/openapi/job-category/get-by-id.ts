export const paths = {
  '/api/job-category/{id}': {
    get: {
      operationId: 'getJobCategory',
      summary: 'お仕事カテゴリの詳細を取得',
      description:
        '指定した ID のお仕事カテゴリ詳細を取得します。アクセスには Bearer トークンを指定してください。',
      tags: ['Job Category（認証）'],
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
      security: [
        {
          BearerAuth: [],
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
