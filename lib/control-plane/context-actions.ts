"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthenticatedRequest } from "@/lib/supabase/server";
import { parseUuid } from "./input";
import {
  controlPlaneContextIsPinned,
  type EnvironmentRow,
  type ProjectRow,
} from "./access";
import { writeControlContextSelection } from "./context-cookie";

export async function switchControlPlaneContext(formData: FormData) {
  if (controlPlaneContextIsPinned()) {
    throw new Error("当前部署已通过环境变量固定工作区。");
  }

  const environmentId = parseUuid(formData.get("environment_id"));
  if (!environmentId) {
    throw new Error("工作区环境无效。");
  }

  const { supabase, user, userError } = await getAuthenticatedRequest();
  if (userError || !user) {
    redirect("/login?next=/console");
  }

  const { data: environmentData, error: environmentError } = await supabase
    .schema("control")
    .from("environments")
    .select("id, project_id")
    .eq("id", environmentId)
    .eq("status", "active")
    .maybeSingle();
  if (environmentError || !environmentData) {
    throw new Error("当前账号无法访问所选环境。");
  }

  const environment = environmentData as Pick<EnvironmentRow, "id" | "project_id">;
  const { data: projectData, error: projectError } = await supabase
    .schema("control")
    .from("projects")
    .select("id, organization_id")
    .eq("id", environment.project_id)
    .eq("status", "active")
    .maybeSingle();
  if (projectError || !projectData) {
    throw new Error("当前账号无法访问所选项目。");
  }

  const project = projectData as Pick<ProjectRow, "id" | "organization_id">;
  const { data: membership, error: membershipError } = await supabase
    .schema("control")
    .from("organization_members")
    .select("user_id")
    .eq("organization_id", project.organization_id)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();
  if (membershipError || !membership) {
    throw new Error("当前账号不属于所选组织。");
  }

  await writeControlContextSelection({
    organizationId: project.organization_id,
    projectId: project.id,
    environmentId: environment.id,
  });

  revalidatePath("/", "layout");
  redirect(safeReturnPath(formData.get("return_to")));
}

function safeReturnPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/console";
  }

  return value.startsWith("/console") || value.startsWith("/admin/gacha") || value.startsWith("/sandbox")
    ? value
    : "/console";
}
