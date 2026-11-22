export const baseDocument = {
  openapi: '3.0.0',
  info: {
    title: 'MENTA お仕事管理APP API ドキュメント',
    version: '1.0.0',
    description:
      'MENTA Next TS お仕事管理アプリケーションの API 仕様です。認証が必要なエンドポイントと公開エンドポイントの両方を掲載しています。',
  },
  servers: [],
  tags: [
    {
      name: 'Auth',
      description: '認証・アクセストークンの操作',
    },
    {
      name: 'Job（認証）',
      description: 'ログイン済みユーザー向けの お仕事 操作',
    },
    {
      name: 'Job Category（認証）',
      description: 'ログイン済みユーザー向けのお仕事カテゴリ操作',
    },
    {
      name: 'Public Job（公開）',
      description: '認証不要の お仕事 操作',
    },
    {
      name: 'Public Job Category（公開）',
      description: '認証不要のお仕事カテゴリ操作',
    },
    {
      name: 'Public Prefecture（公開）',
      description: '認証不要の都道府県マスタ取得',
    },
  ],
  paths: {},
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Authorization ヘッダーに Bearer <token> を設定',
      },
    },
    schemas: {
      JobCategory: {
        type: 'object',
        description: 'お仕事カテゴリ情報。お仕事 に紐づく分類を表します。',
        properties: {
          id: {
            type: 'integer',
            description: 'お仕事カテゴリの識別子。',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'お仕事カテゴリ名。',
            example: '設計',
          },
          description: {
            type: ['string', 'null'],
            nullable: true,
            description: 'お仕事カテゴリの説明。未入力の場合は null。',
            example: '設計に関するタスクを管理します。',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'お仕事カテゴリが作成された日時 (ISO8601)。',
            example: '2024-01-01T00:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'お仕事カテゴリが更新された日時 (ISO8601)。',
            example: '2024-01-02T00:00:00Z',
          },
        },
        required: ['id', 'name', 'createdAt', 'updatedAt'],
        additionalProperties: false,
      },
      JobCategoryRef: {
        type: 'object',
        description: 'お仕事 に紐づくお仕事カテゴリの参照情報。',
        properties: {
          id: {
            type: 'integer',
            description: 'お仕事カテゴリの識別子。',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'お仕事カテゴリ名。',
            example: '設計',
          },
        },
        required: ['id', 'name'],
        additionalProperties: false,
      },
      Job: {
        type: 'object',
        description: 'お仕事 の詳細情報。紐づくカテゴリの一覧を含みます。',
        properties: {
          id: {
            type: 'integer',
            description: 'お仕事 の識別子。',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'お仕事 の名称。',
            example: '仕様書を作成する',
          },
          description: {
            type: ['string', 'null'],
            nullable: true,
            description: 'お仕事 の詳細説明。未入力の場合は null。',
            example: 'API ドキュメントの初稿を作成します。',
          },
          prefecture: {
            description: '紐づく都道府県情報。未設定の場合は null。',
            anyOf: [
              {
                $ref: '#/components/schemas/PrefectureRef',
              },
              {
                type: 'null',
              },
            ],
          },
          startDate: {
            type: ['string', 'null'],
            nullable: true,
            format: 'date',
            description: 'お仕事 の開始日 (YYYY-MM-DD)。',
            example: '2025-01-01',
          },
          endDate: {
            type: ['string', 'null'],
            nullable: true,
            format: 'date',
            description: 'お仕事 の終了予定日 (YYYY-MM-DD)。',
            example: '2025-01-02',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'お仕事 が作成された日時 (ISO8601)。',
            example: '2025-01-01T00:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'お仕事 が更新された日時 (ISO8601)。',
            example: '2025-01-01T12:00:00Z',
          },
          categories: {
            type: 'array',
            description:
              '[{ id, name }] 形式の JobCategoryRef 配列。お仕事 に紐づくお仕事カテゴリを表します。',
            items: {
              $ref: '#/components/schemas/JobCategoryRef',
            },
          },
        },
        required: ['id', 'name', 'createdAt', 'updatedAt', 'categories'],
        additionalProperties: false,
      },
      Prefecture: {
        type: 'object',
        description: '都道府県マスタ情報。お仕事 の所在地などに利用します。',
        properties: {
          id: {
            type: 'integer',
            description: '都道府県の識別子。',
            example: 13,
          },
          name: {
            type: 'string',
            description: '都道府県名。',
            example: '東京都',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'レコードが作成された日時 (ISO8601)。',
            example: '2024-01-01T00:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'レコードが更新された日時 (ISO8601)。',
            example: '2024-01-02T00:00:00Z',
          },
        },
        required: ['id', 'name', 'createdAt', 'updatedAt'],
        additionalProperties: false,
      },
      JobCategoryCreateInput: {
        type: 'object',
        description: 'お仕事カテゴリ新規作成時の入力パラメーター。',
        properties: {
          name: {
            type: 'string',
            description: 'お仕事カテゴリ名。1 文字以上で入力してください。',
            example: '新しいお仕事カテゴリ',
          },
          description: {
            type: ['string', 'null'],
            nullable: true,
            description: 'お仕事カテゴリの説明。省略可能です。',
            example: '備考などを記載できます。',
          },
        },
        required: ['name'],
        additionalProperties: false,
      },
      JobCategoryUpdateInput: {
        type: 'object',
        description:
          'お仕事カテゴリ更新時の入力パラメーター。更新したい項目のみ指定します。',
        properties: {
          name: {
            type: 'string',
            description: 'お仕事カテゴリ名。',
            example: '更新したお仕事カテゴリ',
          },
          description: {
            type: ['string', 'null'],
            nullable: true,
            description:
              'お仕事カテゴリの説明。null を指定すると説明を削除します。',
            example: '説明を更新しました。',
          },
        },
        additionalProperties: false,
        minProperties: 1,
      },
      JobCreateInput: {
        type: 'object',
        description: 'お仕事 新規作成時の入力パラメーター。',
        properties: {
          name: {
            type: 'string',
            description: 'お仕事 の名称。1 文字以上で入力してください。',
            example: '資料作成を開始する',
          },
          description: {
            type: ['string', 'null'],
            nullable: true,
            description: 'お仕事 の詳細説明。省略可能です。',
            example: '必要な資料を整理して着手します。',
          },
          prefectureId: {
            type: ['integer', 'null'],
            nullable: true,
            description: '紐づける都道府県 ID。省略や null を指定可能です。',
            example: 13,
          },
          startDate: {
            type: ['string', 'null'],
            nullable: true,
            format: 'date',
            description: 'お仕事 の開始日 (YYYY-MM-DD)。',
            example: '2025-01-01',
          },
          endDate: {
            type: ['string', 'null'],
            nullable: true,
            format: 'date',
            description: 'お仕事 の終了予定日 (YYYY-MM-DD)。',
            example: '2025-01-05',
          },
          categoryIds: {
            type: 'array',
            description: '紐づけるカテゴリの ID 配列。空配列も指定可能です。',
            items: {
              type: 'integer',
            },
            example: [1, 2],
          },
        },
        required: ['name'],
        additionalProperties: false,
      },
      PrefectureRef: {
        type: 'object',
        description: '都道府県の簡易情報（ID と名称）。',
        properties: {
          id: {
            type: 'integer',
            description: '都道府県 ID。',
            example: 13,
          },
          name: {
            type: 'string',
            description: '都道府県名。',
            example: '東京都',
          },
        },
        required: ['id', 'name'],
        additionalProperties: false,
      },
      JobUpdateInput: {
        type: 'object',
        description:
          'お仕事 更新時の入力パラメーター。更新したい項目のみ指定します。',
        properties: {
          name: {
            type: 'string',
            description: 'お仕事 の名称。',
            example: 'タイトルを更新する',
          },
          description: {
            type: ['string', 'null'],
            nullable: true,
            description:
              'お仕事 の詳細説明。null を指定すると説明を削除します。',
            example: '説明を最新情報に更新します。',
          },
          prefectureId: {
            type: ['integer', 'null'],
            nullable: true,
            description:
              '紐づける都道府県 ID。null を指定すると未設定になります。',
            example: 27,
          },
          startDate: {
            type: ['string', 'null'],
            nullable: true,
            format: 'date',
            description: 'お仕事 の開始日 (YYYY-MM-DD)。',
            example: '2025-01-03',
          },
          endDate: {
            type: ['string', 'null'],
            nullable: true,
            format: 'date',
            description: 'お仕事 の終了予定日 (YYYY-MM-DD)。',
            example: '2025-01-04',
          },
          categoryIds: {
            type: 'array',
            description:
              '紐づけるカテゴリの ID 配列。null や空配列を指定すると関連付けを更新します。',
            items: {
              type: 'integer',
            },
            example: [3],
          },
        },
        additionalProperties: false,
        minProperties: 1,
      },
      ErrorResponse: {
        type: 'object',
        description: 'エラー時の共通レスポンス。',
        properties: {
          message: {
            type: 'string',
            description: 'エラーメッセージ。',
            example: 'カテゴリ一覧の取得に失敗しました。',
          },
        },
        required: ['message'],
        additionalProperties: false,
      },
      DeleteResponse: {
        type: 'object',
        description: '削除成功時のレスポンス。',
        properties: {
          ok: {
            type: 'boolean',
            description: '削除が成功した場合は true。',
            example: true,
          },
        },
        required: ['ok'],
        additionalProperties: false,
      },
      AuthRegisterInput: {
        type: 'object',
        description: 'ユーザー登録時の入力パラメーター。',
        properties: {
          name: {
            type: 'string',
            description: 'ユーザー名。1 文字以上で入力してください。',
            example: 'テスト ユーザー',
          },
          email: {
            type: 'string',
            description: 'メールアドレス。',
            example: 'test@example.com',
          },
          password: {
            type: 'string',
            description:
              'パスワード。8 文字以上で、英数字の組み合わせを推奨します。',
            example: 'test1234',
          },
        },
        required: ['name', 'email', 'password'],
        additionalProperties: false,
      },
      AuthLoginInput: {
        type: 'object',
        description: 'ログイン時の入力パラメーター。',
        properties: {
          email: {
            type: 'string',
            description: 'メールアドレス。',
            example: 'test@example.com',
          },
          password: {
            type: 'string',
            description: 'パスワード。',
            example: 'test1234',
          },
        },
        required: ['email', 'password'],
        additionalProperties: false,
      },
      AuthUser: {
        type: 'object',
        description: 'ユーザー情報。アクセス制御に利用します。',
        properties: {
          id: {
            type: 'integer',
            description: 'ユーザー ID。',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'ユーザー名。',
            example: 'テスト ユーザー',
          },
          email: {
            type: 'string',
            description: 'メールアドレス。',
            example: 'test@example.com',
          },
        },
        required: ['id', 'name', 'email'],
        additionalProperties: false,
      },
      AuthAccessToken: {
        type: 'object',
        description: 'アクセストークンのレスポンス。',
        properties: {
          accessToken: {
            type: 'string',
            description: 'JWT 形式のアクセストークン。',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
        required: ['accessToken'],
        additionalProperties: false,
      },
      AuthMePayload: {
        type: 'object',
        description: 'アクセストークンから復元できるペイロード。',
        properties: {
          sub: {
            type: 'string',
            description: 'ユーザー ID（文字列）。',
            example: '1',
          },
          email: {
            type: 'string',
            description: 'メールアドレス。',
            example: 'test@example.com',
          },
          name: {
            type: 'string',
            description: 'ユーザー名。',
            example: 'テスト ユーザー',
          },
        },
        required: ['sub', 'email', 'name'],
        additionalProperties: true,
      },
    },
  },
} as const;
