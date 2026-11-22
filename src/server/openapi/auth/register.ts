export const paths = {
  '/api/auth/register': {
    post: {
      operationId: 'registerUser',
      summary: 'ユーザー登録',
      description:
        '新しいユーザーを登録します。アクセストークンは発行されません。',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AuthRegisterInput',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'ユーザーを正常に登録しました。',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthUser',
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
        '409': {
          description: 'メールアドレスの重複により登録できませんでした。',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '500': {
          description: 'ユーザー登録に失敗しました。',

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
