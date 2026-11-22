import { NextResponse } from 'next/server';
import { PUBLIC_USER_ID } from '@/app/api/_utils/user-scope';
import { supabaseServerClient } from '@/server/supabase';

import {
  buildJobCategoryErrorResponse,
  fetchJobCategoryByIdWithScope,
  normalizeJobCategoryDescription,
  parseJobCategoryId,
} from '../utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface JobCategory {
  id: number;
  name: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

type UpdateJobCategoryRequestJson = Record<string, unknown> | null;
type UpdateJobCategoryPayload = {
  name?: unknown;
  description?: unknown;
};

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = parseJobCategoryId(params.id);

  if (id === null) {
    return buildJobCategoryErrorResponse('invalid id', 400);
  }

  try {
    const { data, error } = await fetchJobCategoryByIdWithScope(
      id,
      PUBLIC_USER_ID,
    );

    if (error) {
      return buildJobCategoryErrorResponse('failed to fetch job category', 500);
    }

    if (!data) {
      return buildJobCategoryErrorResponse('job category not found', 404);
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error fetching job category', error);

    return buildJobCategoryErrorResponse('failed to fetch job category', 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = parseJobCategoryId(params.id);

  if (id === null) {
    return buildJobCategoryErrorResponse('invalid id', 400);
  }

  try {
    let json: UpdateJobCategoryRequestJson = null;

    try {
      json = (await request.json()) as Record<string, unknown>;
    } catch {
      json = null;
    }

    if (!json || typeof json !== 'object') {
      return buildJobCategoryErrorResponse('invalid request body', 400);
    }

    const { name, description } = json as UpdateJobCategoryPayload;

    const updates: {
      name?: string;
      description?: string | null;
    } = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return buildJobCategoryErrorResponse(
          'name must be a non-empty string',
          400,
        );
      }

      updates.name = name.trim();
    }

    if (description !== undefined) {
      const normalizedDescription =
        normalizeJobCategoryDescription(description);

      if (normalizedDescription === undefined) {
        return buildJobCategoryErrorResponse(
          'description must be a string or null',
          400,
        );
      }

      updates.description = normalizedDescription;
    }

    if (Object.keys(updates).length === 0) {
      return buildJobCategoryErrorResponse('no fields provided to update', 400);
    }

    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    const { data, error } = await supabaseAny
      .from('jobCategories')
      .update(updates)
      .eq('id', id)
      .is('userId', PUBLIC_USER_ID)
      .select('id, name, description, "createdAt", "updatedAt"')
      .single();

    if (error) {
      const code = (error as { code?: string }).code;

      if (code === 'PGRST116') {
        return buildJobCategoryErrorResponse('job category not found', 404);
      }

      console.error('failed to update job category', error);

      return buildJobCategoryErrorResponse(
        'failed to update job category',
        500,
      );
    }

    if (!data) {
      return buildJobCategoryErrorResponse('job category not found', 404);
    }

    return NextResponse.json(data as JobCategory, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error updating job category', error);

    return buildJobCategoryErrorResponse('failed to update job category', 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = parseJobCategoryId(params.id);

  if (id === null) {
    return buildJobCategoryErrorResponse('invalid id', 400);
  }

  try {
    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    const { data, error } = await supabaseAny
      .from('jobCategories')
      .delete()
      .eq('id', id)
      .is('userId', PUBLIC_USER_ID)
      .select('id')
      .maybeSingle();

    if (error) {
      const code = (error as { code?: string }).code;

      if (code === '23503') {
        return buildJobCategoryErrorResponse(
          'job category is linked to existing jobs and cannot be deleted',
          400,
        );
      }

      console.error('failed to delete job category', error);

      return buildJobCategoryErrorResponse(
        'failed to delete job category',
        500,
      );
    }

    if (!data) {
      return buildJobCategoryErrorResponse('job category not found', 404);
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
    console.error('unexpected error deleting job category', error);

    return buildJobCategoryErrorResponse('failed to delete job category', 500);
  }
}
