export const paths = {
  '/api/public/prefectures': {
    get: {
      operationId: 'listPublicPrefectures',
      summary: '公開都道府県マスタ一覧を取得',
      description: '認証不要で都道府県マスタを ID 昇順に取得します。',
      tags: ['Public Prefecture（公開）'],
      responses: {
        '200': {
          description: '都道府県マスタの一覧を正常に取得しました。',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Prefecture',
                },
              },
            },
          },
        },
        '500': {
          description: '都道府県マスタの取得に失敗しました。',
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
