export const paths = {
  '/api/auth/login': {
    post: {
      operationId: 'loginUser',
      summary: 'ログイン',
      description:
        '登録済みユーザーのメールアドレスとパスワードを検証し、アクセストークンを払い出します。成功後、右上の【Authorize】ボタンから Bearer <取得したトークン> を設定してください。',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AuthLoginInput',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'ログインに成功し、アクセストークンを返却しました。',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthAccessToken',
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
          description: 'メールアドレスまたはパスワードが一致しません。',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '500': {
          description: 'ログイン処理に失敗しました。',

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
