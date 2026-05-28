import { requireAuthenticatedUser } from "@/lib/ai/auth";
import {
  createStoredAiConversation,
  deleteStoredAiConversation,
  loadStoredAiConversations,
  toPublicAiConversation,
  updateStoredAiConversation,
} from "@/lib/ai/conversations-server";
import { toAiErrorMessage, toAiErrorStatus } from "@/lib/ai/openai-client";
import type {
  AiChatConversation,
  AiChatConversationListResponse,
  AiChatConversationResponse,
} from "@/lib/ai/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const conversations = await loadStoredAiConversations();

    return Response.json({
      conversations: toPublicAiConversations(conversations),
    } satisfies AiChatConversationListResponse);
  } catch (error) {
    return Response.json({ error: toAiErrorMessage(error) }, { status: toAiErrorStatus(error) });
  }
}

export async function POST(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const body = (await request.json()) as {
      title?: string;
      systemPrompt?: string;
      providerConfigId?: string | null;
      model?: string;
    };
    const conversation = await createStoredAiConversation(body);
    const conversations = await loadStoredAiConversations();

    return Response.json({
      conversation: toPublicAiConversation(conversation),
      conversations: toPublicAiConversations(conversations),
    } satisfies AiChatConversationResponse);
  } catch (error) {
    return Response.json({ error: toAiErrorMessage(error) }, { status: toAiErrorStatus(error) });
  }
}

export async function PATCH(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const body = (await request.json()) as {
      id?: string;
      title?: string;
      systemPrompt?: string;
      providerConfigId?: string | null;
      model?: string;
    };
    const conversation = await updateStoredAiConversation(body.id || "", body);
    const conversations = await loadStoredAiConversations();

    return Response.json({
      conversation: toPublicAiConversation(conversation),
      conversations: toPublicAiConversations(conversations),
    } satisfies AiChatConversationResponse);
  } catch (error) {
    return Response.json({ error: toAiErrorMessage(error) }, { status: toAiErrorStatus(error) });
  }
}

export async function DELETE(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const id = new URL(request.url).searchParams.get("id") || "";

    await deleteStoredAiConversation(id);

    const conversations = await loadStoredAiConversations();

    return Response.json({
      conversation: conversations[0] ? toPublicAiConversation(conversations[0]) : null,
      conversations: toPublicAiConversations(conversations),
    } satisfies AiChatConversationResponse);
  } catch (error) {
    return Response.json({ error: toAiErrorMessage(error) }, { status: toAiErrorStatus(error) });
  }
}

function toPublicAiConversations(records: unknown[]) {
  return records
    .map((record) => toPublicAiConversation(record as Parameters<typeof toPublicAiConversation>[0]))
    .filter((item): item is AiChatConversation => Boolean(item));
}
