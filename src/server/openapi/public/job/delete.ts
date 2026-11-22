export const paths = {
  '/api/public/jobs/{id}': {
    delete: {
      operationId: 'deletePublicJob',
      summary: '公開 お仕事管理を削除',
      description: '認証不要で既存のお仕事管理を削除します。',
      tags: ['Public Job（公開）'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
          description: '削除対象のお仕事管理 ID。',
        },
      ],
      responses: {
        '200': {
          description: 'お仕事管理を正常に削除しました。',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DeleteResponse',
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
          description: 'お仕事管理の削除に失敗しました。',
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
