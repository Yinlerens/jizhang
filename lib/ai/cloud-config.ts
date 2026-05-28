import type { AiApiErrorResponse, AiCloudConfigResponse, AiProviderConfig } from "@/lib/ai/types";

export async function createCloudAiConfig(config: AiProviderConfig, sourceId?: string) {
  const response = await fetch("/api/ai/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ config, sourceId }),
  });

  return readCloudResponse(response);
}

export async function updateCloudAiConfig(config: AiProviderConfig) {
  const response = await fetch("/api/ai/config", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ config }),
  });

  return readCloudResponse(response);
}

export async function loadCloudAiConfig(id?: string) {
  const response = await fetch(id ? `/api/ai/config?id=${encodeURIComponent(id)}` : "/api/ai/config", {
    method: "GET",
  });

  return readCloudResponse(response);
}

export async function deleteCloudAiConfig(id: string) {
  const response = await fetch(`/api/ai/config?id=${encodeURIComponent(id)}`, { method: "DELETE" });

  return readCloudResponse(response);
}

async function readCloudResponse(response: Response) {
  const data = (await response.json()) as AiCloudConfigResponse | AiApiErrorResponse;

  if (!response.ok || "error" in data) {
    throw new Error("error" in data ? data.error : "云端配置同步失败");
  }

  return data;
}
