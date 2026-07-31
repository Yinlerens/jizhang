"use server";

import { redirect } from "next/navigation";
import { createControlPlaneAdminClient } from "@/lib/control-plane/admin";
import { writeControlContextSelection } from "@/lib/control-plane/context-cookie";
import {
  parseDisplayName,
  parseEnvironmentKind,
  parseSlug,
  parseUuid,
} from "@/lib/control-plane/input";

export async function createProject(formData: FormData) {
  const { context, supabase } = await createControlPlaneAdminClient("organization:manage");
  const name = parseDisplayName(formData.get("name"));
  const slug = parseSlug(formData.get("slug"));
  if (!name || !slug) {
    throw new Error("项目名称或标识无效。");
  }

  const { data, error } = await supabase.schema("control").rpc(
    "create_project_with_environment",
    {
      actor_id: context.user.id,
      project_name: name,
      project_slug: slug,
      target_organization_id: context.organization.id,
    },
  );
  if (error || !isWorkspaceResult(data)) {
    console.error("Project creation failed", error);
    throw new Error(error?.code === "23505" ? "项目标识已存在。" : "项目创建失败。");
  }

  await writeControlContextSelection({
    organizationId: context.organization.id,
    projectId: data.project_id,
    environmentId: data.environment_id,
  });
  redirect("/console");
}

export async function createEnvironment(formData: FormData) {
  const { context, supabase } = await createControlPlaneAdminClient("organization:manage");
  const name = parseDisplayName(formData.get("name"));
  const slug = parseSlug(formData.get("slug"));
  const kind = parseEnvironmentKind(formData.get("kind"));
  if (!name || !slug || !kind) {
    throw new Error("环境名称、标识或类型无效。");
  }

  const { data, error } = await supabase.schema("control").rpc("create_environment", {
    actor_id: context.user.id,
    environment_kind: kind,
    environment_name: name,
    environment_slug: slug,
    target_project_id: context.project.id,
  });
  const environmentId = parseUuid(data);
  if (error || !environmentId) {
    console.error("Environment creation failed", error);
    throw new Error(error?.code === "23505" ? "环境标识已存在。" : "环境创建失败。");
  }

  await writeControlContextSelection({
    organizationId: context.organization.id,
    projectId: context.project.id,
    environmentId,
  });
  redirect("/console");
}

function isWorkspaceResult(value: unknown): value is { project_id: string; environment_id: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return Boolean(parseUuid(record.project_id) && parseUuid(record.environment_id));
}
