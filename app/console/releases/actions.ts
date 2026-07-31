"use server";

import { revalidatePath } from "next/cache";
import { createControlPlaneAdminClient } from "@/lib/control-plane/admin";
import { parseUuid } from "@/lib/control-plane/input";

export async function rollbackEnvironmentRelease(formData: FormData) {
  const { context, supabase } = await createControlPlaneAdminClient("release:manage");
  const releaseId = parseUuid(formData.get("release_id"));
  const notes = String(formData.get("rollback_notes") ?? "").trim().slice(0, 2000);
  if (!releaseId || !notes) {
    throw new Error("请选择有效发布并填写回滚原因。");
  }

  const { error } = await supabase.schema("gacha").rpc("rollback_environment_release", {
    actor_id: context.user.id,
    rollback_notes: notes,
    target_environment_id: context.environment.id,
    target_project_id: context.project.id,
    target_release_id: releaseId,
  });
  if (error) {
    console.error("Environment rollback failed", error);
    throw new Error("环境回滚失败，请确认目标发布仍属于当前环境。");
  }

  revalidatePath("/console/releases");
  revalidatePath("/console");
  revalidatePath("/");
}
