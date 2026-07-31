"use server";

import { revalidatePath } from "next/cache";
import { createGachaAdminClient } from "@/app/admin/gacha/actionAuth";

export async function publishCurrentEnvironmentRelease(formData: FormData) {
  const { context, supabase } = await createGachaAdminClient("release:manage");
  const releaseNotes = String(formData.get("release_notes") ?? "").trim().slice(0, 2000);
  const { error } = await supabase.schema("gacha").rpc("publish_environment_release", {
    actor_id: context.user.id,
    release_notes: releaseNotes || "Manual release from GachaOps console",
    target_environment_id: context.environment.id,
    target_project_id: context.project.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/console");
  revalidatePath("/");
}
