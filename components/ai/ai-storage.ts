import {
  AI_CONFIG_STORAGE_KEY,
  type AiChatMessage,
  type AiProviderConfig,
} from "@/lib/ai/types";

export const defaultAiConfig: AiProviderConfig = {
  name: "默认配置",
  baseUrl: "https://api.openai.com/v1",
  apiKey: "",
  model: "",
  hasCloudApiKey: false,
};

export function readAiConfig(): AiProviderConfig {
  if (typeof window === "undefined") {
    return defaultAiConfig;
  }

  const raw = window.localStorage.getItem(AI_CONFIG_STORAGE_KEY);

  if (!raw) {
    return defaultAiConfig;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AiProviderConfig>;

    return {
      id: parsed.id,
      name: parsed.name || defaultAiConfig.name,
      baseUrl: parsed.baseUrl || defaultAiConfig.baseUrl,
      apiKey: parsed.apiKey || "",
      model: parsed.model || "",
      hasCloudApiKey: parsed.hasCloudApiKey || false,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return defaultAiConfig;
  }
}

export function writeAiConfig(config: AiProviderConfig) {
  window.localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify({ ...config, apiKey: "" }));
}

export function makeLocalMessage(
  role: AiChatMessage["role"],
  content: string,
  reasoningContent?: string,
): AiChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    reasoningContent,
    createdAt: new Date().toISOString(),
  };
}

export function maskApiKey(apiKey: string) {
  if (!apiKey) {
    return "";
  }

  if (apiKey.length <= 10) {
    return "****";
  }

  return `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
}
