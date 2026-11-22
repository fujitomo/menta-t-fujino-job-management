import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';
import {
  PUBLIC_USER_ID,
  applyPrivateScope,
  applyPublicScope,
} from '@/app/api/_utils/user-scope';
import { supabaseServerClient } from '@/server/supabase';

type JobCategory = Pick<
  Database['public']['Tables']['jobCategories']['Row'],
  'id' | 'name' | 'description' | 'createdAt' | 'updatedAt'
>;

export function buildJobCategoryErrorResponse(message: string, status: number) {
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

export function normalizeJobCategoryDescription(
  description: unknown,
): string | null | undefined {
  if (description === undefined) {
    return undefined;
  }

  if (description === null) {
    return null;
  }

  if (typeof description === 'string') {
    return description;
  }

  return undefined;
}

export function parseJobCategoryId(rawId: string): number | null {
  const id = Number.parseInt(rawId, 10);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

export async function fetchJobCategoryById(id: number) {
  return fetchJobCategoryByIdWithScope(id, PUBLIC_USER_ID);
}

export async function fetchJobCategoryByIdWithScope(
  id: number,
  userId: number | null,
) {
  const supabaseAny = supabaseServerClient as unknown as {
    from: (...args: unknown[]) => any;
  };

  let query = supabaseAny
    .from('jobCategories')
    .select('id, name, description, "createdAt", "updatedAt", "userId"')
    .eq('id', id);

  query =
    userId === PUBLIC_USER_ID
      ? applyPublicScope(query)
      : applyPrivateScope(query, userId);

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error('failed to fetch job category by id', error);

    return { data: null, error } as const;
  }

  if (!data) {
    return { data: null, error: null } as const;
  }

  return { data: data as JobCategory, error: null } as const;
}
