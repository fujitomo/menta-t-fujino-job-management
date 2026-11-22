import { NextResponse } from 'next/server';
import {
  applyPrivateScope,
  getPrivateScopeUserIdFromRequest,
} from '@/app/api/_utils/user-scope';
import { supabaseServerClient } from '@/server/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface JobCategory {
  id: number;
  name: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export async function GET(request: Request) {
  const auth = await getPrivateScopeUserIdFromRequest(request);

  if (!auth.ok) {
    return auth.response;
  }

  const userId = auth.userId;

  try {
    let query = supabaseServerClient
      .from('jobCategories')
      .select('id, name, description, "createdAt", "updatedAt"')
      .order('createdAt', { ascending: false });

    query = applyPrivateScope(query, userId);

    const { data, error } = await query;

    if (error) {
      console.error('failed to fetch job categories', error);

      return NextResponse.json(
        { message: 'failed to fetch job categories' },
        { status: 500 },
      );
    }

    const jobCategories: JobCategory[] = (data ?? []) as JobCategory[];

    return NextResponse.json(jobCategories, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error fetching job categories', error);

    return NextResponse.json(
      { message: 'failed to fetch job categories' },
      { status: 500 },
    );
  }
}

type CreateJobCategoryPayload = {
  name?: unknown;
  description?: unknown;
};

type CreateJobCategoryRequestJson = Record<string, unknown> | null;

function buildJobCategoryErrorResponse(message: string, status: number) {
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

function normalizeJobCategoryDescription(
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

export async function POST(request: Request) {
  const auth = await getPrivateScopeUserIdFromRequest(request);

  if (!auth.ok) {
    return auth.response;
  }

  const userId = auth.userId;

  try {
    let json: CreateJobCategoryRequestJson = null;

    try {
      json = (await request.json()) as Record<string, unknown>;
    } catch {
      json = null;
    }

    if (!json || typeof json !== 'object') {
      return buildJobCategoryErrorResponse('invalid request body', 400);
    }

    const { name: rawName, description } = json as CreateJobCategoryPayload;

    if (typeof rawName !== 'string' || rawName.trim().length === 0) {
      return buildJobCategoryErrorResponse('name is required', 400);
    }

    const name = rawName.trim();
    const normalizedDescription = normalizeJobCategoryDescription(description);

    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    const { data, error } = await supabaseAny
      .from('jobCategories')
      .insert([
        {
          name,
          description:
            normalizedDescription === undefined ? null : normalizedDescription,
          userId,
        },
      ])
      .select('id, name, description, "createdAt", "updatedAt"')
      .single();

    if (error || !data) {
      console.error('failed to insert job categories', error);

      return buildJobCategoryErrorResponse(
        'failed to create job categories',
        500,
      );
    }

    return NextResponse.json(data as JobCategory, {
      status: 201,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error creating job categories', error);

    return buildJobCategoryErrorResponse(
      'failed to create job categories',
      500,
    );
  }
}
