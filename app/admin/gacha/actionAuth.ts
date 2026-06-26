import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient as createSessionClient } from "@/lib/supabase/server";

type GachaAdminClientResult =
  | {
      ok: true;
      supabase: SupabaseClient;
      user: User;
    }
  | {
      ok: false;
      reason: "config";
      message: string;
    }
  | {
      ok: false;
      reason: "unauthorized";
      message: string;
    };

const missingAdminKeyMessage =
  "缺少服务端 Supabase admin key。请在 .env.local 配置 SUPABASE_SERVICE_ROLE_KEY（或 SUPABASE_SECRET_KEY），不要使用 NEXT_PUBLIC_ 前缀。";

export async function getGachaAdminUser() {
  const sessionClient = await createSessionClient();
  const {
    data: { user },
    error,
  } = await sessionClient.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function createGachaAdminClientResult(): Promise<GachaAdminClientResult> {
  const user = await getGachaAdminUser();

  if (!user) {
    return {
      ok: false,
      reason: "unauthorized",
      message: "请先登录后再访问抽卡配置。",
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !adminKey) {
    return {
      ok: false,
      reason: "config",
      message: missingAdminKeyMessage,
    };
  }

  return {
    ok: true,
    supabase: createSupabaseClient(supabaseUrl, adminKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }),
    user,
  };
}

export async function createGachaAdminPageClient(nextPath: string) {
  const result = await createGachaAdminClientResult();

  if (!result.ok && result.reason === "unauthorized") {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return result;
}

export async function createGachaAdminClient() {
  const result = await createGachaAdminClientResult();

  if (!result.ok) {
    throw new Error(result.message);
  }

  return result.supabase;
}
