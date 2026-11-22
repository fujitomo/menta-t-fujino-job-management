import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';
import { getPrivateScopeUserIdFromRequest } from '@/app/api/_utils/user-scope';
import { supabaseServerClient } from '@/server/supabase';
import {
  buildErrorResponse,
  fetchJobByIdWithScope,
  normalizeCategoryIds,
  normalizeDate,
  normalizeDescription,
  normalizePrefectureId,
  parseId,
} from '../utils';

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
      response: buildErrorResponse('failed to update job', 500),
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

type UpdateJobRequestJson = Record<string, unknown> | null;

type UpdateJobPayload = {
  name?: unknown;
  description?: unknown;
  startDate?: unknown;
  endDate?: unknown;
  categoryIds?: unknown;
  prefectureId?: unknown;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const auth = await getPrivateScopeUserIdFromRequest(request);

  if (!auth.ok) {
    return auth.response;
  }

  const userId = auth.userId;

  const id = parseId(params.id);

  if (id === null) {
    return buildErrorResponse('invalid id', 400);
  }

  try {
    const { data, error } = await fetchJobByIdWithScope(id, userId);

    if (error) {
      return buildErrorResponse('failed to fetch job', 500);
    }

    if (!data) {
      return buildErrorResponse('job not found', 404);
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error fetching job', error);

    return buildErrorResponse('failed to fetch job', 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const auth = await getPrivateScopeUserIdFromRequest(request);

  if (!auth.ok) {
    return auth.response;
  }

  const userId = auth.userId;

  const id = parseId(params.id);

  if (id === null) {
    return buildErrorResponse('invalid id', 400);
  }

  try {
    let json: UpdateJobRequestJson = null;

    try {
      json = (await request.json()) as Record<string, unknown>;
    } catch {
      json = null;
    }

    if (!json || typeof json !== 'object') {
      return buildErrorResponse('invalid request body', 400);
    }

    const { name, description, startDate, endDate, categoryIds, prefectureId } =
      json as UpdateJobPayload;

    const updates: Database['public']['Tables']['jobs']['Update'] = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return buildErrorResponse('name must be a non-empty string', 400);
      }

      updates.name = name.trim();
    }

    const normalizedDescription = normalizeDescription(description);

    if (description !== undefined) {
      if (normalizedDescription.error) {
        return buildErrorResponse(normalizedDescription.error, 400);
      }

      updates.description = normalizedDescription.value ?? null;
    }

    const normalizedStartDate = normalizeDate(startDate, 'startDate');

    if (startDate !== undefined) {
      if (normalizedStartDate.error) {
        return buildErrorResponse(normalizedStartDate.error, 400);
      }

      updates.startDate = normalizedStartDate.value ?? null;
    }

    const normalizedEndDate = normalizeDate(endDate, 'endDate');

    if (endDate !== undefined) {
      if (normalizedEndDate.error) {
        return buildErrorResponse(normalizedEndDate.error, 400);
      }

      updates.endDate = normalizedEndDate.value ?? null;
    }

    const categoryIdsProvided = categoryIds !== undefined;
    const normalizedCategoryIds = normalizeCategoryIds(categoryIds);
    const prefectureProvided = prefectureId !== undefined;
    const normalizedPrefectureId = normalizePrefectureId(prefectureId);

    if (prefectureProvided && normalizedPrefectureId.error) {
      return buildErrorResponse(normalizedPrefectureId.error, 400);
    }

    if (prefectureProvided) {
      updates.prefectureId = normalizedPrefectureId.value ?? null;
    }

    if (categoryIdsProvided && normalizedCategoryIds.error) {
      return buildErrorResponse(normalizedCategoryIds.error, 400);
    }

    const hasUpdateFields = Object.keys(updates).length > 0;

    if (!hasUpdateFields && !categoryIdsProvided) {
      return buildErrorResponse('no fields provided to update', 400);
    }

    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    if (hasUpdateFields) {
      const { data: updated, error: updateError } = await supabaseAny
        .from('jobs')
        .update(updates)
        .eq('id', id)
        .eq('userId', userId)
        .select('id')
        .single();

      if (updateError) {
        const code = (updateError as { code?: string }).code;

        if (code === 'PGRST116') {
          return buildErrorResponse('job not found', 404);
        }

        console.error('failed to update job', updateError);

        return buildErrorResponse('failed to update job', 500);
      }

      if (!updated) {
        return buildErrorResponse('job not found', 404);
      }
    }

    if (categoryIdsProvided) {
      const targetCategoryIds = normalizedCategoryIds.value ?? [];

      const { data: scopedJob, error: scopedJobError } = await supabaseAny
        .from('jobs')
        .select('id')
        .eq('id', id)
        .eq('userId', userId)
        .maybeSingle();

      if (scopedJobError) {
        console.error(
          'failed to fetch job for category update',
          scopedJobError,
        );

        return buildErrorResponse('failed to update job', 500);
      }

      if (!scopedJob) {
        return buildErrorResponse('job not found', 404);
      }

      if (targetCategoryIds.length > 0) {
        const categoryCheck = await ensurePrivateCategoriesExist(
          targetCategoryIds,
          userId,
          supabaseAny,
        );

        if (!categoryCheck.ok) {
          return categoryCheck.response;
        }
      }

      const { error: unlinkError } = await supabaseAny
        .from('jobCategoryRelations')
        .delete()
        .eq('jobId', id)
        .eq('userId', userId);

      if (unlinkError) {
        console.error('failed to unlink job categories', unlinkError);

        return buildErrorResponse('failed to update job', 500);
      }

      if (targetCategoryIds.length > 0) {
        const linkRows: Database['public']['Tables']['jobCategoryRelations']['Insert'][] =
          targetCategoryIds.map((categoryId) => ({
            jobId: id,
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
          console.error('failed to relink job categories', linkError);

          return buildErrorResponse('failed to update job', 500);
        }
      }
    }

    const { data: job, error: fetchError } = await fetchJobByIdWithScope(
      id,
      userId,
    );

    if (fetchError) {
      return buildErrorResponse('failed to update job', 500);
    }

    if (!job) {
      return buildErrorResponse('job not found', 404);
    }

    return NextResponse.json(job, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error updating job', error);

    return buildErrorResponse('failed to update job', 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const auth = await getPrivateScopeUserIdFromRequest(request);

  if (!auth.ok) {
    return auth.response;
  }

  const userId = auth.userId;

  const id = parseId(params.id);

  if (id === null) {
    return buildErrorResponse('invalid id', 400);
  }

  try {
    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    const { data: deleted, error: deleteError } = await supabaseAny
      .from('jobs')
      .delete()
      .eq('id', id)
      .eq('userId', userId)
      .select('id')
      .single();

    if (deleteError) {
      const code = (deleteError as { code?: string }).code;

      if (code === 'PGRST116') {
        return buildErrorResponse('job not found', 404);
      }

      console.error('failed to delete job', deleteError);

      return buildErrorResponse('failed to delete job', 500);
    }

    if (!deleted) {
      return buildErrorResponse('job not found', 404);
    }

    return NextResponse.json(
      { ok: true },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (error) {
    console.error('unexpected error deleting job', error);

    return buildErrorResponse('failed to delete job', 500);
  }
}
