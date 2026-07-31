"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import type { GachaBannerRow } from "@/lib/supabase/database.gacha.types";
import { createGachaAdminClient } from "../actionAuth";
import { normalizeBulkTextValues } from "../bulkDelete";

const bannerTypes = new Set<GachaBannerRow["banner_type"]>(["limited-character", "standard"]);
const bannerImageFields = new Set(["cover_image_url", "background_image_url"]);
const bannerImageExtensions: Record<string, string> = {
  "image/avif": "avif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const maxBannerImageBytes = 8 * 1024 * 1024;

export async function deleteBanner(id: string) {
  const { context, supabase } = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("banners")
    .delete()
    .eq("project_id", context.project.id)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/banners");
}

export async function deleteBanners(ids: string[]) {
  const bannerIds = normalizeBulkTextValues(ids, "卡池");
  const { context, supabase } = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("banners")
    .delete()
    .eq("project_id", context.project.id)
    .in("id", bannerIds);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/banners");
}

export async function uploadBannerImage(formData: FormData) {
  const { context, supabase } = await createGachaAdminClient();
  const field = getString(formData, "field", 80);
  const file = formData.get("file");

  if (!bannerImageFields.has(field)) {
    throw new Error("图片字段不合法");
  }

  if (!(file instanceof File)) {
    throw new Error("请选择图片文件");
  }

  if (file.size <= 0) {
    throw new Error("图片文件为空");
  }

  if (file.size > maxBannerImageBytes) {
    throw new Error("图片不能超过 8MB");
  }

  const contentType = file.type.toLowerCase();
  const extension = bannerImageExtensions[contentType];

  if (!extension) {
    throw new Error("仅支持 JPG、PNG、WebP、AVIF 图片");
  }

  const bucket = process.env.GACHA_ASSET_BUCKET ?? process.env.SUPABASE_STORAGE_BUCKET ?? "gacha-assets";
  const folder = field === "cover_image_url" ? "covers" : "backgrounds";
  const path = `gacha/projects/${context.project.id}/banners/${folder}/${randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(bucket).upload(path, bytes, {
    cacheControl: "31536000",
    contentType,
    upsert: false,
  });

  if (error) {
    throw new Error(`图片上传失败：${error.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (!data.publicUrl) {
    throw new Error("图片上传成功，但未获取到公开访问地址");
  }

  return data.publicUrl;
}

export async function upsertBanner(formData: FormData) {
  const { context, supabase } = await createGachaAdminClient();

  const existingId = getString(formData, "id", 100);
  const name = getString(formData, "name", 120);
  const bannerType = getString(formData, "banner_type", 40) as GachaBannerRow["banner_type"];

  if (!name) {
    throw new Error("卡池名称必填");
  }

  if (!bannerTypes.has(bannerType)) {
    throw new Error("卡池类型不合法");
  }

  const payload = {
    project_id: context.project.id,
    id: existingId || createBannerId(bannerType),
    name,
    short_name: getString(formData, "short_name", 80),
    banner_type: bannerType,
    description: getString(formData, "description", 1000),
    cover_image_url: getOptionalAssetUrl(formData, "cover_image_url", "卡池入口图"),
    background_image_url: getOptionalAssetUrl(formData, "background_image_url", "主视觉背景图"),
    sort_order: parseInt(getString(formData, "sort_order", 8) || "0", 10),
    is_enabled: formData.get("is_enabled") === "true",
  };

  if (existingId) {
    const { error } = await supabase.schema("gacha").from("banners").upsert(payload);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/gacha/banners");
    return;
  }

  let lastError: string | null = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { error } = await supabase
      .schema("gacha")
      .from("banners")
      .insert(attempt === 0 ? payload : { ...payload, id: createBannerId(bannerType) });

    if (!error) {
      revalidatePath("/admin/gacha/banners");
      return;
    }

    lastError = error.message;
    if (error.code !== "23505") {
      throw new Error(error.message);
    }
  }

  throw new Error(lastError ?? "卡池 ID 自动生成失败，请重试");
}

function getString(formData: FormData, key: string, maxLength: number) {
  return String(formData.get(key) ?? "").trim().slice(0, maxLength);
}

function getOptionalAssetUrl(formData: FormData, key: string, fieldName: string) {
  const value = getString(formData, key, 1000);
  if (!value) {
    return "";
  }

  if (!value.startsWith("https://") && !value.startsWith("/")) {
    throw new Error(`${fieldName}必须是 https URL 或以 / 开头的站内路径`);
  }

  return value;
}

function createBannerId(bannerType: GachaBannerRow["banner_type"]) {
  return `${bannerType}-${randomUUID().slice(0, 8)}`;
}
