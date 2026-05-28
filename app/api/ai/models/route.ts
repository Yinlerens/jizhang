import { requireAuthenticatedUser } from "@/lib/ai/auth";
import { resolveAiProviderConfig } from "@/lib/ai/cloud-config-server";
import { createOpenAIClient, toAiErrorMessage, toAiErrorStatus } from "@/lib/ai/openai-client";
import type { AiModelsResponse, AiProviderConfig } from "@/lib/ai/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const body = (await request.json()) as { config?: Partial<AiProviderConfig> };
    const config = await resolveAiProviderConfig(body.config ?? {});
    const client = createOpenAIClient(config);
    const modelsPage = await client.models.list();

    const models = modelsPage.data
      .map((model) => ({
        id: model.id,
        ownedBy: model.owned_by,
        created: model.created,
      }))
      .sort((a, b) => a.id.localeCompare(b.id));

    return Response.json({ models } satisfies AiModelsResponse);
  } catch (error) {
    return Response.json(
      { error: toAiErrorMessage(error) },
      { status: toAiErrorStatus(error) },
    );
  }
}
