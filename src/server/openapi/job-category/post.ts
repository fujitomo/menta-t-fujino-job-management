export const paths = {
  '/api/job-category': {
    post: {
      operationId: 'createJobCategory',
      summary: 'お仕事カテゴリを作成',
      description:
        '新しいお仕事カテゴリを作成します。アクセスには Bearer トークンを指定してください。',
      tags: ['Job Category（認証）'],
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
      security: [
        {
          BearerAuth: [],
        },
      ],
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
