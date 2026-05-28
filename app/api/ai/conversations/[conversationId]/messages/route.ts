import { requireAuthenticatedUser } from "@/lib/ai/auth";
import {
  loadStoredAiConversation,
  loadStoredAiMessages,
  toPublicAiConversation,
  toPublicAiMessage,
} from "@/lib/ai/conversations-server";
import { AiConfigError, toAiErrorMessage, toAiErrorStatus } from "@/lib/ai/openai-client";
import type { AiChatMessagesResponse } from "@/lib/ai/types";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ conversationId: string }> },
) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const { conversationId } = await context.params;
    const conversation = await loadStoredAiConversation(conversationId);

    if (!conversation) {
      throw new AiConfigError("对话不存在");
    }

    const messages = await loadStoredAiMessages(conversationId, 0);
    const publicConversation = toPublicAiConversation(conversation);

    if (!publicConversation) {
      throw new AiConfigError("对话不存在");
    }

    return Response.json({
      conversation: publicConversation,
      messages: messages.map(toPublicAiMessage),
    } satisfies AiChatMessagesResponse);
  } catch (error) {
    return Response.json({ error: toAiErrorMessage(error) }, { status: toAiErrorStatus(error) });
  }
}
