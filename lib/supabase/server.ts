import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";

export type AuthenticatedUser = {
  id: string;
  email: string | null;
};

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot write cookies; route handlers can.
          }
        },
      },
    },
  );
}

export const getAuthenticatedRequest = cache(async () => {
  const supabase = await createClient();
  const { data, error: userError } = await supabase.auth.getClaims();
  const subject = data?.claims.sub;
  const user: AuthenticatedUser | null =
    typeof subject === "string" && subject
      ? {
          id: subject,
          email: typeof data.claims.email === "string" ? data.claims.email : null,
        }
      : null;

  return { supabase, user, userError };
});

export const getAuthenticatedSession = cache(async () => {
  const request = await getAuthenticatedRequest();
  if (!request.user) {
    return { ...request, session: null, sessionError: null };
  }

  const {
    data: { session },
    error: sessionError,
  } = await request.supabase.auth.getSession();

  return { ...request, session, sessionError };
});
