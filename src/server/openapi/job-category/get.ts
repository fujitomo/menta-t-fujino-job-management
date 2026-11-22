export const paths = {
  '/api/job-category': {
    get: {
      operationId: 'listJobCategories',
      summary: 'お仕事カテゴリ一覧を取得',
      description:
        'お仕事カテゴリを ID の昇順で取得します。アクセスには Bearer トークンを指定してください。',
      tags: ['Job Category（認証）'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'お仕事カテゴリの一覧を正常に取得しました。',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/JobCategory',
                },
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
