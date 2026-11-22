export const paths = {
  '/api/public/job-category': {
    get: {
      operationId: 'listPublicJobCategories',
      summary: '公開お仕事カテゴリ一覧を取得',
      description: '認証不要でお仕事カテゴリを ID の昇順に取得します。',
      tags: ['Public Job Category（公開）'],
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
