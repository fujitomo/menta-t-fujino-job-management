export const paths = {
  '/api/auth/me': {
    get: {
      operationId: 'getAuthenticatedUser',
      summary: 'アクセストークンの検証',
      description:
        'Authorization ヘッダーで指定したアクセストークンを検証し、ペイロードを返却します。Authorize 済みのリクエストのみ成功します。',
      tags: ['Auth'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'アクセストークンを検証し、ペイロードを返却しました。',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthMePayload',
              },
            },
          },
        },
        '401': {
          description: 'アクセストークンの検証に失敗しました。',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '500': {
          description: 'アクセストークンの検証処理に失敗しました。',

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
