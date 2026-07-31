import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { getControlPlaneAccess, type ControlPlaneContext } from "./access";
import type { ControlCapability } from "./roles";

export type ControlPlaneAdminClientResult =
  | {
      ok: true;
      context: ControlPlaneContext;
      supabase: SupabaseClient;
    }
  | {
      ok: false;
      reason: "config" | "unauthenticated" | "forbidden";
      message: string;
    };

const missingAdminKeyMessage =
  "缺少服务端 Supabase admin key。请配置 SUPABASE_SERVICE_ROLE_KEY（或 SUPABASE_SECRET_KEY），且不要使用 NEXT_PUBLIC_ 前缀。";

export async function createControlPlaneAdminClientResult(
  capability: ControlCapability = "configuration:read",
): Promise<ControlPlaneAdminClientResult> {
  const access = await getControlPlaneAccess(capability);
  if (!access.ok) {
    return access;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !adminKey) {
    return { ok: false, reason: "config", message: missingAdminKeyMessage };
  }

  return {
    ok: true,
    context: access.context,
    supabase: createSupabaseClient(supabaseUrl, adminKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    }),
  };
}

export async function createControlPlaneAdminPageClient(
  nextPath: string,
  capability: ControlCapability = "configuration:read",
) {
  const result = await createControlPlaneAdminClientResult(capability);
  if (!result.ok && result.reason === "unauthenticated") {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return result;
}

export async function createControlPlaneAdminClient(
  capability: ControlCapability = "configuration:write",
) {
  const result = await createControlPlaneAdminClientResult(capability);
  if (!result.ok) {
    throw new Error(result.message);
  }
  return { context: result.context, supabase: result.supabase };
}
