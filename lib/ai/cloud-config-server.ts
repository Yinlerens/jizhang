import { createClient } from "@/lib/supabase/server";
import { AiConfigError, normalizeBaseUrl } from "@/lib/ai/openai-client";
import { decryptApiKey, encryptApiKey } from "@/lib/ai/server-encryption";
import type { AiCloudConfigRecord, AiProviderConfig } from "@/lib/ai/types";

const configColumns = "id,name,base_url,model,encrypted_api_key,created_at,updated_at";

export async function loadStoredAiConfigs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ai_provider_configs")
    .select(configColumns)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new AiConfigError(toCloudTableError(error.message));
  }

  return (data ?? []) as AiCloudConfigRecord[];
}

export async function loadStoredAiConfig(id?: string) {
  const supabase = await createClient();
  let query = supabase.from("ai_provider_configs").select(configColumns);

  if (id) {
    query = query.eq("id", id);
  } else {
    query = query.order("updated_at", { ascending: false }).limit(1);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new AiConfigError(toCloudTableError(error.message));
  }

  return data as AiCloudConfigRecord | null;
}

export async function createStoredAiConfig(config: Partial<AiProviderConfig>, sourceId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new AiConfigError("未登录");
  }

  const source = sourceId ? await loadStoredAiConfig(sourceId) : null;
  const apiKey = config.apiKey?.trim();
  const encryptedApiKey = apiKey
    ? encryptApiKey(apiKey)
    : source?.encrypted_api_key;

  if (!encryptedApiKey) {
    throw new AiConfigError("新增配置需要填写 API Key");
  }

  const { data, error } = await supabase
    .from("ai_provider_configs")
    .insert({
      name: normalizeConfigName(config.name || createConfigName(config)),
      user_id: user.id,
      base_url: normalizeBaseUrl(config.baseUrl) || "https://api.openai.com/v1",
      model: config.model?.trim() ?? "",
      encrypted_api_key: encryptedApiKey,
    })
    .select(configColumns)
    .single();

  if (error) {
    throw new AiConfigError(toCloudTableError(error.message));
  }

  return data as AiCloudConfigRecord;
}

export async function updateStoredAiConfig(config: Partial<AiProviderConfig>) {
  if (!config.id) {
    throw new AiConfigError("请选择要更新的配置");
  }

  const supabase = await createClient();
  const existing = await loadStoredAiConfig(config.id);

  if (!existing) {
    throw new AiConfigError("云端配置不存在");
  }

  const apiKey = config.apiKey?.trim();
  const encryptedApiKey = apiKey ? encryptApiKey(apiKey) : existing.encrypted_api_key;

  const { data, error } = await supabase
    .from("ai_provider_configs")
    .update({
      name: normalizeConfigName(config.name || existing.name),
      base_url: normalizeBaseUrl(config.baseUrl || existing.base_url) || "https://api.openai.com/v1",
      model: config.model?.trim() ?? existing.model ?? "",
      encrypted_api_key: encryptedApiKey,
    })
    .eq("id", config.id)
    .select(configColumns)
    .single();

  if (error) {
    throw new AiConfigError(toCloudTableError(error.message));
  }

  return data as AiCloudConfigRecord;
}

export async function deleteStoredAiConfig(id: string) {
  if (!id) {
    throw new AiConfigError("请选择要删除的配置");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("ai_provider_configs").delete().eq("id", id);

  if (error) {
    throw new AiConfigError(toCloudTableError(error.message));
  }
}

export async function resolveAiProviderConfig(config: Partial<AiProviderConfig>) {
  const inlineApiKey = config.apiKey?.trim();

  if (inlineApiKey) {
    return {
      baseUrl: config.baseUrl,
      model: config.model,
      apiKey: inlineApiKey,
    };
  }

  const stored = await loadStoredAiConfig(config.id);

  if (!stored) {
    throw new AiConfigError(config.id ? "云端配置不存在" : "请先保存云端 AI 配置");
  }

  return {
    baseUrl: config.baseUrl || stored.base_url,
    model: config.model || stored.model,
    apiKey: decryptApiKey(stored.encrypted_api_key),
  };
}

export function toPublicAiConfig(record: AiCloudConfigRecord | null): AiProviderConfig | null {
  if (!record) {
    return null;
  }

  return {
    id: record.id,
    name: record.name,
    baseUrl: record.base_url,
    model: record.model,
    apiKey: "",
    hasCloudApiKey: true,
    updatedAt: record.updated_at,
  };
}

function normalizeConfigName(name: string) {
  const normalized = name.trim();

  if (normalized.length < 1 || normalized.length > 64) {
    throw new AiConfigError("配置名称长度需要在 1 到 64 个字符之间");
  }

  return normalized;
}

function createConfigName(config: Partial<AiProviderConfig>) {
  const model = config.model?.trim();

  if (model) {
    return model.slice(0, 64);
  }

  return "新配置";
}

function toCloudTableError(message: string) {
  if (
    message.includes("ai_provider_configs") &&
    (message.includes("does not exist") || message.includes("Could not find"))
  ) {
    return "云端表不存在，请先执行 Supabase migration";
  }

  if (
    message.includes("ai_provider_configs_user_id_name_key") ||
    message.includes("duplicate key value")
  ) {
    return "配置名称已存在，请换一个名称或先选择已有配置编辑";
  }

  return message;
}
