import { type SupabaseClient, createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not set in environment variables');
}

if (!supabaseAnonKey) {
  throw new Error('SUPABASE_ANON_KEY is not set in environment variables');
}

const globalForSupabase = globalThis as unknown as {
  supabaseServerClient?: SupabaseClient<Database>;
};

export const supabaseServerClient =
  globalForSupabase.supabaseServerClient ??
  createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabaseServerClient = supabaseServerClient;
}
