import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import type { Database } from '@/types/supabase';
import { signAccess } from '@/server/auth';
import { supabaseServerClient } from '@/server/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type LoginRequestBody = {
  email?: unknown;
  password?: unknown;
};

type LoginJson = Record<string, unknown> | null;

const buildErrorResponse = (message: string, status: number) =>
  NextResponse.json(
    { message },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );

export async function POST(request: Request) {
  let json: LoginJson = null;

  try {
    json = (await request.json()) as Record<string, unknown>;
  } catch {
    json = null;
  }

  if (!json || typeof json !== 'object') {
    return buildErrorResponse('invalid request body', 400);
  }

  const { email: rawEmail, password: rawPassword } = json as LoginRequestBody;

  if (typeof rawEmail !== 'string' || rawEmail.trim().length === 0) {
    return buildErrorResponse('email is required', 400);
  }

  if (typeof rawPassword !== 'string' || rawPassword.length === 0) {
    return buildErrorResponse('password is required', 400);
  }

  const email = rawEmail.trim().toLowerCase();

  try {
    const { data: user, error: fetchError } = await supabaseServerClient
      .from('users')
      .select('id, name, email, password')
      .eq('email', email)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('failed to fetch user', fetchError);

      return buildErrorResponse('failed to login', 500);
    }

    if (!user) {
      return buildErrorResponse('invalid credentials', 401);
    }

    const typedUser = user as Database['public']['Tables']['users']['Row'];
    const passwordMatches = await bcrypt.compare(
      rawPassword,
      typedUser.password,
    );

    if (!passwordMatches) {
      return buildErrorResponse('invalid credentials', 401);
    }

    const accessToken = await signAccess({
      sub: String(typedUser.id),
      email: typedUser.email,
      name: typedUser.name,
    });

    return NextResponse.json(
      { accessToken },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (error) {
    console.error('unexpected error logging in', error);

    return buildErrorResponse('failed to login', 500);
  }
}
