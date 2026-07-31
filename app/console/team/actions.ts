"use server";

import { revalidatePath } from "next/cache";
import { createControlPlaneAdminClient } from "@/lib/control-plane/admin";
import { findAuthUserByEmail } from "@/lib/control-plane/auth-users";
import {
  normalizeEmail,
  parseControlRole,
  parseMemberStatus,
  parseUuid,
} from "@/lib/control-plane/input";

export async function inviteOrganizationMember(formData: FormData) {
  const { context, supabase } = await createControlPlaneAdminClient("organization:manage");
  const email = normalizeEmail(formData.get("email"));
  const role = parseControlRole(formData.get("role"));
  if (!email || !role) {
    throw new Error("成员邮箱或角色无效。");
  }
  if (role === "owner" && context.role !== "owner") {
    throw new Error("只有组织所有者可以添加其他所有者。");
  }

  let authUser = await findAuthUserByEmail(supabase, email);
  if (!authUser) {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error || !data.user) {
      console.error("Supabase organization invitation failed", error);
      throw new Error("邀请邮件发送失败，请检查 Auth 邮件配置或稍后重试。");
    }
    authUser = data.user;
  }

  const { error } = await supabase.schema("control").rpc("manage_organization_member", {
    actor_id: context.user.id,
    target_organization_id: context.organization.id,
    target_role: role,
    target_status: "active",
    target_user_id: authUser.id,
  });
  if (error) {
    console.error("Organization member grant failed", error);
    throw new Error("成员权限写入失败。");
  }

  revalidatePath("/console/team");
  revalidatePath("/console", "layout");
}

export async function updateOrganizationMember(formData: FormData) {
  const { context, supabase } = await createControlPlaneAdminClient("organization:manage");
  const userId = parseUuid(formData.get("user_id"));
  const role = parseControlRole(formData.get("role"));
  const status = parseMemberStatus(formData.get("status"));
  if (!userId || !role || !status) {
    throw new Error("成员权限参数无效。");
  }
  if (role === "owner" && context.role !== "owner") {
    throw new Error("只有组织所有者可以管理所有者角色。");
  }

  const { error } = await supabase.schema("control").rpc("manage_organization_member", {
    actor_id: context.user.id,
    target_organization_id: context.organization.id,
    target_role: role,
    target_status: status,
    target_user_id: userId,
  });
  if (error) {
    console.error("Organization member update failed", error);
    throw new Error("成员权限更新失败，请确认组织至少保留一名有效所有者。");
  }

  revalidatePath("/console/team");
  revalidatePath("/console", "layout");
}
