"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createControlPlaneAdminClient } from "@/lib/control-plane/admin";
import { validateCampaignDraftInput } from "@/lib/control-plane/campaign";
import { parseUuid } from "@/lib/control-plane/input";

export type CampaignActionState = { error: string | null };

export async function createCampaignDraft(
  _previousState: CampaignActionState,
  formData: FormData,
): Promise<CampaignActionState> {
  const validated = validateCampaignForm(formData);
  if (!validated.ok) return { error: validated.message };

  const { context, supabase } = await createControlPlaneAdminClient("campaign:manage");
  const input = validated.value;
  const { error } = await supabase.schema("gacha").rpc("create_product_campaign_draft", {
    actor_id: context.user.id,
    banner_name: input.name,
    effective_from: input.effectiveFrom,
    effective_to: input.effectiveTo,
    featured_item_id: input.featuredItemId,
    target_environment_id: context.environment.id,
    target_project_id: context.project.id,
  });

  if (error) {
    console.error("Campaign draft creation failed", error);
    return { error: campaignMutationMessage(error.message) };
  }

  refreshCampaignPaths();
  redirect("/console/pools?created=1");
}

export async function updateCampaignDraft(
  _previousState: CampaignActionState,
  formData: FormData,
): Promise<CampaignActionState> {
  const versionId = parseUuid(formData.get("banner_version_id"));
  if (!versionId) return { error: "草稿不存在，请返回卡池列表重试。" };

  const validated = validateCampaignForm(formData);
  if (!validated.ok) return { error: validated.message };

  const { context, supabase } = await createControlPlaneAdminClient("campaign:manage");
  const input = validated.value;
  const { error } = await supabase.schema("gacha").rpc("update_product_campaign_draft", {
    actor_id: context.user.id,
    banner_name: input.name,
    effective_from: input.effectiveFrom,
    effective_to: input.effectiveTo,
    featured_item_id: input.featuredItemId,
    target_banner_version_id: versionId,
    target_environment_id: context.environment.id,
    target_project_id: context.project.id,
  });

  if (error) {
    console.error("Campaign draft update failed", error);
    return { error: campaignMutationMessage(error.message) };
  }

  refreshCampaignPaths();
  redirect("/console/pools?updated=1");
}

export async function publishCampaignDraft(
  _previousState: CampaignActionState,
  formData: FormData,
): Promise<CampaignActionState> {
  const versionId = parseUuid(formData.get("banner_version_id"));
  if (!versionId) return { error: "草稿不存在，请刷新后重试。" };

  const { context, supabase } = await createControlPlaneAdminClient("release:manage");
  const { error } = await supabase.schema("gacha").rpc("publish_banner_draft", {
    actor_id: context.user.id,
    release_notes: "Published from the operator campaign workflow",
    target_banner_version_id: versionId,
    target_environment_id: context.environment.id,
    target_project_id: context.project.id,
  });

  if (error) {
    console.error("Campaign publication failed", error);
    return { error: campaignMutationMessage(error.message) };
  }

  refreshCampaignPaths();
  revalidatePath("/console/releases");
  revalidatePath("/console/activity");
  revalidatePath("/");
  redirect("/console/pools?published=1");
}

function validateCampaignForm(formData: FormData) {
  return validateCampaignDraftInput({
    effectiveFrom: formData.get("effective_from"),
    effectiveTo: formData.get("effective_to"),
    featuredItemId: formData.get("featured_item_id"),
    name: formData.get("name"),
  });
}

function campaignMutationMessage(message: string) {
  if (message.includes("product campaign policy")) return "系统活动规则暂时不可用，请稍后重试。";
  if (message.includes("featured")) return "UP 角色选择无效，请重新选择。";
  if (message.includes("overlap") || message.includes("exclusion")) {
    return "该卡池与已有上线档期冲突，请调整开放时间。";
  }
  if (message.includes("only campaign drafts") || message.includes("not found")) {
    return "这个草稿已发生变化，请刷新列表后重试。";
  }
  return "操作没有完成，请稍后重试。";
}

function refreshCampaignPaths() {
  revalidatePath("/console/pools");
  revalidatePath("/console");
}
