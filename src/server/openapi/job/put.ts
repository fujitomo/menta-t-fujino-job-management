export const paths = {
  '/api/jobs/{id}': {
    put: {
      operationId: 'updateJob',
      summary: 'お仕事管理を更新',
      description:
        '既存のお仕事管理を更新します。カテゴリ ID を指定した場合は関連付けも再構成します。アクセスには Bearer トークンを指定してください。',
      tags: ['Job（認証）'],
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
      security: [
        {
          BearerAuth: [],
        },
      ],
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
