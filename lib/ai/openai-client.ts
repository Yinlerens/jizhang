import OpenAI from "openai";

import type { AiProviderConfig } from "@/lib/ai/types";

export class AiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AiConfigError";
  }
}

export function createOpenAIClient(config: Partial<AiProviderConfig>) {
  const apiKey = config.apiKey?.trim();
  const baseURL = normalizeBaseUrl(config.baseUrl);

  if (!apiKey) {
    throw new AiConfigError("请先填写 API Key");
  }

  return new OpenAI({
    apiKey,
    baseURL,
  });
}

export function normalizeBaseUrl(baseUrl?: string) {
  const raw = baseUrl?.trim();

  if (!raw) {
    return undefined;
  }

  let parsed: URL;

  try {
    parsed = new URL(raw);
  } catch {
    throw new AiConfigError("Base URL 格式不正确");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new AiConfigError("Base URL 仅支持 http 或 https");
  }

  return raw.replace(/\/+$/, "");
}

export function toAiErrorMessage(error: unknown) {
  if (error instanceof AiConfigError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message.replace(/Bearer\s+[A-Za-z0-9._-]+/g, "Bearer ****");
  }

  return "AI 服务请求失败";
}

export function toAiErrorStatus(error: unknown) {
  if (error instanceof AiConfigError) {
    return 400;
  }

  const status = Number((error as { status?: unknown })?.status);

  if (Number.isFinite(status) && status >= 400 && status < 500) {
    return 400;
  }

  return 502;
}

