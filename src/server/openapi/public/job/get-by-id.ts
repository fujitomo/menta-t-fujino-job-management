export const paths = {
  '/api/public/jobs/{id}': {
    get: {
      operationId: 'getPublicJob',
      summary: '公開お仕事管理の詳細を取得',
      description: '認証不要で指定した ID のお仕事管理詳細を取得します。',
      tags: ['Public Job（公開）'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
          description: '取得対象のお仕事管理 ID。',
        },
      ],
      responses: {
        '200': {
          description: 'お仕事管理の詳細を正常に取得しました。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Job',
              },
            },
          },
        },
        '400': {
          description: 'ID の形式が不正です。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '404': {
          description: '指定したお仕事管理が見つかりません。',
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
