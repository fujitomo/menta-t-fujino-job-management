export type Database = {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          prefectureId: number | null;
          startDate: string | null;
          endDate: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          prefectureId?: number | null;
          startDate?: string | null;
          endDate?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          prefectureId?: number | null;
          startDate?: string | null;
          endDate?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobs_prefectureId_fkey';
            columns: ['prefectureId'];
            referencedRelation: 'prefectures';
            referencedColumns: ['id'];
          },
        ];
      };
      jobCategories: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      jobCategoryRelations: {
        Row: {
          id: number;
          jobId: number;
          categoryId: number;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: number;
          jobId: number;
          categoryId: number;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: number;
          jobId?: number;
          categoryId?: number;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobCategoryRelations_categoryId_fkey';
            columns: ['categoryId'];
            referencedRelation: 'jobCategories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'jobCategoryRelations_jobId_fkey';
            columns: ['jobId'];
            referencedRelation: 'jobs';
            referencedColumns: ['id'];
          },
        ];
      };
      prefectures: {
        Row: {
          id: number;
          name: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: number;
          name: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: number;
          name?: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: number;
          name: string;
          email: string;
          password: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          password: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          password?: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
