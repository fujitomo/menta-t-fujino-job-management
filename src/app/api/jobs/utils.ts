import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';
import {
  PUBLIC_USER_ID,
  applyPrivateScope,
  applyPublicScope,
} from '@/app/api/_utils/user-scope';
import { supabaseServerClient } from '@/server/supabase';

type JobRow = Database['public']['Tables']['jobs']['Row'];
type JobCategoryRow = Database['public']['Tables']['jobCategories']['Row'];
type PrefectureRow = Database['public']['Tables']['prefectures']['Row'];

type PrefectureRef = Pick<PrefectureRow, 'id' | 'name'>;

export type JobWithCategories = Omit<JobRow, 'prefectureId'> & {
  prefecture: PrefectureRef | null;
  categories: Array<Pick<JobCategoryRow, 'id' | 'name'>>;
};

export type JobRowWithRelations = JobRow & {
  jobCategoryRelations: Array<{
    categoryId: number;
    category: Pick<JobCategoryRow, 'id' | 'name'> | null;
  }> | null;
  prefecture: PrefectureRef | null;
};

export const JOB_SELECT_COLUMNS = `
  id,
  name,
  description,
  "prefectureId",
  "startDate",
  "endDate",
  "createdAt",
  "updatedAt",
  prefecture:prefectures(
    id,
    name
  ),
  jobCategoryRelations:jobCategoryRelations(
    categoryId,
    category:jobCategories(
      id,
      name
    )
  )
`.trim();

function buildJobCategories(
  row: JobRowWithRelations,
): Array<Pick<JobCategoryRow, 'id' | 'name'>> {
  return (
    row.jobCategoryRelations
      ?.map((relation) => relation.category)
      .filter((category): category is Pick<JobCategoryRow, 'id' | 'name'> =>
        Boolean(category),
      ) ?? []
  );
}

export function mapJobRow(row: JobRowWithRelations): JobWithCategories {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    startDate: row.startDate,
    endDate: row.endDate,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    prefecture: row.prefecture
      ? {
          id: row.prefecture.id,
          name: row.prefecture.name,
        }
      : null,
    categories: buildJobCategories(row),
  };
}

export function jobMatchesEveryCategory(
  job: JobWithCategories,
  categoryIds: number[],
) {
  if (categoryIds.length === 0) {
    return true;
  }

  const categorySet = new Set(job.categories.map((category) => category.id));

  return categoryIds.every((categoryId) => categorySet.has(categoryId));
}

export type NormalizeResult<T> = {
  value: T | undefined;
  error?: string;
};

export function buildErrorResponse(message: string, status: number) {
  return NextResponse.json(
    { message },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}

export function normalizeDescription(
  description: unknown,
): NormalizeResult<string | null> {
  if (description === undefined) {
    return { value: undefined };
  }

  if (description === null) {
    return { value: null };
  }

  if (typeof description === 'string') {
    return { value: description };
  }

  return { value: undefined, error: 'description must be a string or null' };
}

export function normalizeDate(
  value: unknown,
  field: 'startDate' | 'endDate',
): NormalizeResult<string | null> {
  if (value === undefined) {
    return { value: undefined };
  }

  if (value === null) {
    return { value: null };
  }

  if (typeof value !== 'string') {
    return { value: undefined, error: `${field} must be a string or null` };
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { value: null };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return {
      value: undefined,
      error: `${field} must be in YYYY-MM-DD format`,
    };
  }

  return { value: trimmed };
}

export function normalizeCategoryIds(value: unknown): {
  value?: number[];
  error?: string;
} {
  if (value === undefined) {
    return { value: undefined };
  }

  if (!Array.isArray(value)) {
    return { error: 'categoryIds must be an array of numbers' };
  }

  const ids: number[] = [];

  for (const item of value) {
    if (typeof item !== 'number' || !Number.isInteger(item) || item <= 0) {
      return { error: 'categoryIds must contain positive integers' };
    }

    ids.push(item);
  }

  const uniqueIds = Array.from(new Set(ids));

  return { value: uniqueIds };
}

export function normalizePrefectureId(
  value: unknown,
): NormalizeResult<number | null> {
  if (value === undefined) {
    return { value: undefined };
  }

  if (value === null) {
    return { value: null };
  }

  if (typeof value !== 'number') {
    return {
      value: undefined,
      error: 'prefectureId must be a positive integer or null',
    };
  }

  if (!Number.isInteger(value) || value <= 0) {
    return {
      value: undefined,
      error: 'prefectureId must be a positive integer or null',
    };
  }

  return { value };
}

export function parseId(rawId: string): number | null {
  const id = Number.parseInt(rawId, 10);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

export async function fetchJobById(id: number) {
  return fetchJobByIdWithScope(id, PUBLIC_USER_ID);
}

export async function fetchJobByIdWithScope(id: number, userId: number | null) {
  const supabaseAny = supabaseServerClient as unknown as {
    from: (...args: unknown[]) => any;
  };

  let query = supabaseAny.from('jobs').select(JOB_SELECT_COLUMNS).eq('id', id);

  query =
    userId === PUBLIC_USER_ID
      ? applyPublicScope(query)
      : applyPrivateScope(query, userId);

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error('failed to fetch job by id', error);

    return { data: null, error };
  }

  if (!data) {
    return { data: null, error: null };
  }

  return {
    data: mapJobRow(data as JobRowWithRelations),
    error: null,
  };
}
