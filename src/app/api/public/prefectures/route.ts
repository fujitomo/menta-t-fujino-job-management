import { NextResponse } from 'next/server';

import { buildErrorResponse } from '@/app/api/jobs/utils';
import { supabaseServerClient } from '@/server/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    const { data, error } = await supabaseAny
      .from('prefectures')
      .select('id, name, "createdAt", "updatedAt"')
      .order('id', { ascending: true });

    if (error) {
      console.error('failed to fetch prefectures', error);

      return buildErrorResponse('failed to fetch prefectures', 500);
    }

    return NextResponse.json(data ?? [], {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error fetching prefectures', error);

    return buildErrorResponse('failed to fetch prefectures', 500);
  }
}
