import "server-only";

import type { SupabaseClient, User } from "@supabase/supabase-js";

const AUTH_USERS_PER_PAGE = 1000;
const MAX_AUTH_USER_PAGES = 100;

export async function listAllAuthUsers(supabase: SupabaseClient) {
  const users: User[] = [];

  for (let page = 1; page <= MAX_AUTH_USER_PAGES; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: AUTH_USERS_PER_PAGE,
    });
    if (error) {
      throw new Error("无法读取身份目录。", { cause: error });
    }

    users.push(...data.users);
    if (data.users.length < AUTH_USERS_PER_PAGE || users.length >= data.total) {
      break;
    }
  }

  return users;
}

export async function findAuthUserByEmail(supabase: SupabaseClient, email: string) {
  const normalizedEmail = email.toLowerCase();
  const users = await listAllAuthUsers(supabase);
  return users.find((user) => user.email?.toLowerCase() === normalizedEmail) ?? null;
}
