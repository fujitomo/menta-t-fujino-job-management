export const paths = {
  '/api/public/jobs': {
    post: {
      operationId: 'createPublicJob',
      summary: '公開 お仕事管理を作成',
      description: '認証不要でお仕事管理を新規作成し、カテゴリを関連付けます。',
      tags: ['Public Job（公開）'],
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
