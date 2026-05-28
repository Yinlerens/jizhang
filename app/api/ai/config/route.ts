import { requireAuthenticatedUser } from "@/lib/ai/auth";
import {
  createStoredAiConfig,
  deleteStoredAiConfig,
  loadStoredAiConfig,
  loadStoredAiConfigs,
  toPublicAiConfig,
  updateStoredAiConfig,
} from "@/lib/ai/cloud-config-server";
import { toAiErrorMessage, toAiErrorStatus } from "@/lib/ai/openai-client";
import type { AiCloudConfigResponse, AiProviderConfig } from "@/lib/ai/types";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const id = new URL(request.url).searchParams.get("id") || undefined;
    const configs = await loadStoredAiConfigs();
    const config = id ? await loadStoredAiConfig(id) : configs[0] ?? null;

    return Response.json({
      config: toPublicAiConfig(config),
      configs: configs.map(toPublicAiConfig).filter((item): item is AiProviderConfig => Boolean(item)),
      updatedAt: config?.updated_at,
    } satisfies AiCloudConfigResponse);
  } catch (error) {
    return Response.json(
      { error: toAiErrorMessage(error) },
      { status: toAiErrorStatus(error) },
    );
  }
}

export async function POST(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const body = (await request.json()) as {
      config?: Partial<AiProviderConfig>;
      sourceId?: string;
    };
    const config = await createStoredAiConfig(body.config ?? {}, body.sourceId);
    const configs = await loadStoredAiConfigs();

    return Response.json({
      config: toPublicAiConfig(config),
      configs: configs.map(toPublicAiConfig).filter((item): item is AiProviderConfig => Boolean(item)),
      updatedAt: config.updated_at,
    } satisfies AiCloudConfigResponse);
  } catch (error) {
    return Response.json(
      { error: toAiErrorMessage(error) },
      { status: toAiErrorStatus(error) },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const body = (await request.json()) as { config?: Partial<AiProviderConfig> };
    const config = await updateStoredAiConfig(body.config ?? {});
    const configs = await loadStoredAiConfigs();

    return Response.json({
      config: toPublicAiConfig(config),
      configs: configs.map(toPublicAiConfig).filter((item): item is AiProviderConfig => Boolean(item)),
      updatedAt: config.updated_at,
    } satisfies AiCloudConfigResponse);
  } catch (error) {
    return Response.json(
      { error: toAiErrorMessage(error) },
      { status: toAiErrorStatus(error) },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const id = new URL(request.url).searchParams.get("id") || "";

    await deleteStoredAiConfig(id);

    const configs = await loadStoredAiConfigs();
    const config = configs[0] ?? null;

    return Response.json({
      config: toPublicAiConfig(config),
      configs: configs.map(toPublicAiConfig).filter((item): item is AiProviderConfig => Boolean(item)),
      updatedAt: config?.updated_at,
    } satisfies AiCloudConfigResponse);
  } catch (error) {
    return Response.json(
      { error: toAiErrorMessage(error) },
      { status: toAiErrorStatus(error) },
    );
  }
}
