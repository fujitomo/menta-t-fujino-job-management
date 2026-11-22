export const paths = {
  '/api/jobs': {
    get: {
      operationId: 'listJobs',
      summary: 'お仕事管理一覧を取得',
      description:
        'お仕事管理を作成日時の昇順で取得します。name で件名の部分一致検索、categoryId でカテゴリによる絞り込みが可能です。アクセスには Bearer トークンを指定してください。',
      tags: ['Job（認証）'],
      parameters: [
        {
          name: 'name',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
          description:
            'お仕事管理名称の部分一致検索に利用します (大文字小文字は区別しません)。',
        },
        {
          name: 'categoryId',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            pattern: '^\\d+(,\\d+)*$',
          },
          description:
            'カテゴリ ID をカンマ区切りで指定します。指定したすべてのカテゴリに紐づくお仕事管理のみを返します。',
        },
        {
          name: 'prefectureId',
          in: 'query',
          required: false,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description:
            '都道府県 ID で絞り込みます。正の整数を指定してください。',
        },
      ],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'お仕事管理の一覧を正常に取得できました。',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Job',
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
          description: 'お仕事管理の取得に失敗しました。',
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
