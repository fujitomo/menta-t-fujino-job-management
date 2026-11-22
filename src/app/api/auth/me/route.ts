import { NextResponse } from 'next/server';

import { requireAuth } from '@/server/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type AccessTokenPayload = {
  sub?: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
};

export async function GET(request: Request) {
  const auth = await requireAuth<AccessTokenPayload>(request);

  if (!auth.success) {
    return auth.response;
  }

  return NextResponse.json(auth.payload, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
