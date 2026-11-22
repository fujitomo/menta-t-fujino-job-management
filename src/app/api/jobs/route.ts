import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';
import {
  applyPrivateScope,
  getPrivateScopeUserIdFromRequest,
} from '@/app/api/_utils/user-scope';
import { supabaseServerClient } from '@/server/supabase';
import type { JobRowWithRelations, JobWithCategories } from './utils';
import {
  JOB_SELECT_COLUMNS,
  buildErrorResponse,
  fetchJobByIdWithScope,
  jobMatchesEveryCategory,
  mapJobRow,
  normalizeCategoryIds,
  normalizeDate,
  normalizeDescription,
  normalizePrefectureId,
} from './utils';

type CreateJobRequestJson = Record<string, unknown> | null;

type CreateJobPayload = {
  name?: unknown;
  description?: unknown;
  startDate?: unknown;
  endDate?: unknown;
  categoryIds?: unknown;
  prefectureId?: unknown;
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ensurePrivateCategoriesExist = async (
  categoryIds: number[],
  userId: number,
  supabaseAny: { from: (...args: unknown[]) => any },
) => {
  const { data, error } = await supabaseAny
    .from('jobCategories')
    .select('id, userId')
    .in('id', categoryIds)
    .eq('userId', userId);

  if (error) {
    console.error('failed to fetch job categories', error);

    return {
      ok: false,
      response: buildErrorResponse('failed to create job', 500),
    };
  }

  if (!data || data.length !== categoryIds.length) {
    return {
      ok: false,
      response: buildErrorResponse('invalid categoryId', 400),
    };
  }

  return { ok: true };
};

export async function GET(request: Request) {
  const auth = await getPrivateScopeUserIdFromRequest(request);

  if (!auth.ok) {
    return auth.response;
  }

  const userId = auth.userId;

  try {
    const { searchParams } = new URL(request.url);
    const rawName = searchParams.get('name');
    const rawCategoryIds = searchParams.get('categoryId');
    const rawPrefectureId = searchParams.get('prefectureId');

    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    let query = supabaseAny
      .from('jobs')
      .select(JOB_SELECT_COLUMNS)
      .order('createdAt', { ascending: false });

    query = applyPrivateScope(query, userId);

    if (rawName && rawName.trim().length > 0) {
      query = query.ilike('name', `%${rawName.trim()}%`);
    }

    if (rawPrefectureId) {
      const trimmed = rawPrefectureId.trim();
      const prefectureId = Number.parseInt(trimmed, 10);

      if (!Number.isInteger(prefectureId) || prefectureId <= 0) {
        return buildErrorResponse('invalid prefectureId', 400);
      }

      query = query.eq('prefectureId', prefectureId);
    }

    let categoryFilterIds: number[] | null = null;

    if (rawCategoryIds) {
      const idStrings = rawCategoryIds
        .split(',')
        .map((value) => value.trim())
        .filter((value) => value.length > 0);

      const numericIds: number[] = [];

      for (const value of idStrings) {
        const id = Number.parseInt(value, 10);

        if (!Number.isInteger(id) || id <= 0) {
          return buildErrorResponse('invalid categoryId', 400);
        }

        numericIds.push(id);
      }

      const uniqueIds = Array.from(new Set(numericIds));

      if (uniqueIds.length === 0) {
        return buildErrorResponse('invalid categoryId', 400);
      }

      categoryFilterIds = uniqueIds;

      query = query
        .in('jobCategoryRelations.categoryId', uniqueIds)
        .eq('jobCategoryRelations.userId', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('failed to fetch jobs', error);

      return buildErrorResponse('failed to fetch jobs', 500);
    }

    let jobs: JobWithCategories[] = ((data ?? []) as JobRowWithRelations[]).map(
      mapJobRow,
    );

    if (categoryFilterIds?.length) {
      const requiredCategoryIds = categoryFilterIds;

      jobs = jobs.filter((job) =>
        jobMatchesEveryCategory(job, requiredCategoryIds),
      );
    }

    return NextResponse.json(jobs, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error fetching jobs', error);

    return buildErrorResponse('failed to fetch jobs', 500);
  }
}

export async function POST(request: Request) {
  const auth = await getPrivateScopeUserIdFromRequest(request);

  if (!auth.ok) {
    return auth.response;
  }

  const userId = auth.userId;

  try {
    let json: CreateJobRequestJson = null;

    try {
      json = (await request.json()) as Record<string, unknown>;
    } catch {
      json = null;
    }

    if (!json || typeof json !== 'object') {
      return buildErrorResponse('invalid request body', 400);
    }

    const {
      name: rawName,
      description,
      startDate,
      endDate,
      categoryIds,
      prefectureId,
    } = json as CreateJobPayload;

    if (typeof rawName !== 'string' || rawName.trim().length === 0) {
      return buildErrorResponse('name is required', 400);
    }

    const normalizedDescription = normalizeDescription(description);

    if (normalizedDescription.error) {
      return buildErrorResponse(normalizedDescription.error, 400);
    }

    const normalizedStartDate = normalizeDate(startDate, 'startDate');

    if (normalizedStartDate.error) {
      return buildErrorResponse(normalizedStartDate.error, 400);
    }

    const normalizedEndDate = normalizeDate(endDate, 'endDate');

    if (normalizedEndDate.error) {
      return buildErrorResponse(normalizedEndDate.error, 400);
    }

    const normalizedCategoryIds = normalizeCategoryIds(categoryIds);

    if (normalizedCategoryIds.error) {
      return buildErrorResponse(normalizedCategoryIds.error, 400);
    }

    const normalizedPrefectureId = normalizePrefectureId(prefectureId);

    if (normalizedPrefectureId.error) {
      return buildErrorResponse(normalizedPrefectureId.error, 400);
    }

    const insertPayload: Database['public']['Tables']['jobs']['Insert'] & {
      userId: number;
    } = {
      name: rawName.trim(),
      userId,
    };

    if (description !== undefined) {
      insertPayload.description = normalizedDescription.value ?? null;
    }

    if (startDate !== undefined) {
      insertPayload.startDate = normalizedStartDate.value ?? null;
    }

    if (endDate !== undefined) {
      insertPayload.endDate = normalizedEndDate.value ?? null;
    }

    if (prefectureId !== undefined) {
      insertPayload.prefectureId = normalizedPrefectureId.value ?? null;
    }

    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    const { data: insertedJob, error: insertJobError } = await supabaseAny
      .from('jobs')
      .insert([insertPayload])
      .select('id')
      .single();

    if (insertJobError || !insertedJob) {
      console.error('failed to create job', insertJobError);

      return buildErrorResponse('failed to create job', 500);
    }

    const jobId = insertedJob.id;

    if (normalizedCategoryIds.value && normalizedCategoryIds.value.length > 0) {
      const categoryCheck = await ensurePrivateCategoriesExist(
        normalizedCategoryIds.value,
        userId,
        supabaseAny,
      );

      if (!categoryCheck.ok) {
        return categoryCheck.response;
      }

      const linkRows: Database['public']['Tables']['jobCategoryRelations']['Insert'][] =
        normalizedCategoryIds.value.map((categoryId) => ({
          jobId: jobId,
          categoryId,
          userId,
        }));

      const { error: linkError } = await supabaseAny
        .from('jobCategoryRelations')
        .upsert(linkRows, {
          onConflict: 'jobId,categoryId',
          ignoreDuplicates: true,
        });

      if (linkError) {
        console.error('failed to link job categories', linkError);

        return buildErrorResponse('failed to create job', 500);
      }
    }

    const { data: job, error: fetchError } = await fetchJobByIdWithScope(
      jobId,
      userId,
    );

    if (fetchError || !job) {
      return buildErrorResponse('failed to create job', 500);
    }

    return NextResponse.json(job, {
      status: 201,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error creating job', error);

    return buildErrorResponse('failed to create job', 500);
  }
}
