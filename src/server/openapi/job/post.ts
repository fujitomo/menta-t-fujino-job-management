export const paths = {
  '/api/jobs': {
    post: {
      operationId: 'createJob',
      summary: 'お仕事管理を作成',
      description:
        '新しいお仕事管理を作成し、指定したカテゴリと関連付けます。アクセスには Bearer トークンを指定してください。',
      tags: ['Job（認証）'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/JobCreateInput',
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
          description: 'お仕事管理を正常に作成しました。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Job',
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
          description: 'お仕事管理の作成に失敗しました。',
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
