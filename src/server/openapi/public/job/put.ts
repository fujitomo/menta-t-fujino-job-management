export const paths = {
  '/api/public/jobs/{id}': {
    put: {
      operationId: 'updatePublicJob',
      summary: '公開 お仕事管理を更新',
      description:
        '認証不要で既存のお仕事管理を更新します。カテゴリ設定も再構成できます。',
      tags: ['Public Job（公開）'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
          description: '更新対象のお仕事管理 ID。',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/JobUpdateInput',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'お仕事管理を正常に更新しました。',
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
          description: 'お仕事管理の更新に失敗しました。',
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
