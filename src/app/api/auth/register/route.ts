import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import type { Database } from '@/types/supabase';
import { supabaseServerClient } from '@/server/supabase';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALT_ROUNDS = 10;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RegisterRequestBody = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
};

type RegisterJson = Record<string, unknown> | null;

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
  let json: RegisterJson = null;

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
    email: rawEmail,
    password: rawPassword,
  } = json as RegisterRequestBody;

  if (typeof rawName !== 'string' || rawName.trim().length === 0) {
    return buildErrorResponse('name is required', 400);
  }

  if (typeof rawEmail !== 'string' || rawEmail.trim().length === 0) {
    return buildErrorResponse('email is required', 400);
  }

  if (!EMAIL_REGEX.test(rawEmail.trim().toLowerCase())) {
    return buildErrorResponse('email is invalid', 400);
  }

  if (typeof rawPassword !== 'string' || rawPassword.length < 8) {
    return buildErrorResponse('password must be at least 8 characters', 400);
  }

  const name = rawName.trim();
  const email = rawEmail.trim().toLowerCase();

  try {
    const { data: existingUser, error: fetchError } = await supabaseServerClient
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('failed to check existing user', fetchError);

      return buildErrorResponse('failed to register user', 500);
    }

    if (existingUser) {
      return buildErrorResponse('email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(rawPassword, SALT_ROUNDS);

    const insertPayload: Database['public']['Tables']['users']['Insert'] = {
      name,
      email,
      password: hashedPassword,
    };

    const supabaseAny = supabaseServerClient as unknown as {
      from: (...args: unknown[]) => any;
    };

    const { data: insertedUserRaw, error: insertError } = await supabaseAny
      .from('users')
      .insert([insertPayload])
      .select('id, name, email')
      .single();

    if (insertError || !insertedUserRaw) {
      console.error('failed to create user', insertError);

      return buildErrorResponse('failed to register user', 500);
    }

    const insertedUser = insertedUserRaw as Pick<
      Database['public']['Tables']['users']['Row'],
      'id' | 'name' | 'email'
    >;

    return NextResponse.json(insertedUser, {
      status: 201,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('unexpected error registering user', error);

    return buildErrorResponse('failed to register user', 500);
  }
}
