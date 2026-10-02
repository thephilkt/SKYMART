"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export function createBrowserSupabaseClient() {
  const env = getSupabasePublicEnv();
  if (!env) return null;

  return createBrowserClient<Database>(env.url, env.publishableKey);
}
