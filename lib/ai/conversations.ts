import type {
  AiApiErrorResponse,
  AiChatConversation,
  AiChatConversationListResponse,
  AiChatConversationResponse,
  AiChatMessagesResponse,
} from "@/lib/ai/types";

export async function loadAiConversations() {
  const response = await fetch("/api/ai/conversations", {
    method: "GET",
  });

  return readAiJson<AiChatConversationListResponse>(response);
}

export async function createAiConversation(input?: {
  title?: string;
  systemPrompt?: string;
  providerConfigId?: string | null;
  model?: string;
}) {
  const response = await fetch("/api/ai/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input ?? {}),
  });

  return readAiJson<AiChatConversationResponse>(response);
}

export async function updateAiConversation(
  id: string,
  input: {
    title?: string;
    systemPrompt?: string;
    providerConfigId?: string | null;
    model?: string;
  },
) {
  const response = await fetch("/api/ai/conversations", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...input }),
  });

  return readAiJson<AiChatConversationResponse>(response);
}

export async function deleteAiConversation(id: string) {
  const response = await fetch(`/api/ai/conversations?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  return readAiJson<AiChatConversationResponse>(response);
}

export async function loadAiConversationMessages(conversationId: string) {
  const response = await fetch(
    `/api/ai/conversations/${encodeURIComponent(conversationId)}/messages`,
    {
      method: "GET",
    },
  );

  return readAiJson<AiChatMessagesResponse>(response);
}

export function upsertConversation(
  conversations: AiChatConversation[],
  conversation: AiChatConversation,
) {
  const next = conversations.filter((item) => item.id !== conversation.id);

  return [conversation, ...next].sort(compareConversationsByActivity);
}

export function compareConversationsByActivity(
  left: AiChatConversation,
  right: AiChatConversation,
) {
  return getConversationTime(right) - getConversationTime(left);
}

async function readAiJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T | AiApiErrorResponse;

  if (!response.ok) {
    const errorData = data as Partial<AiApiErrorResponse>;

    throw new Error(errorData.error || "请求失败");
  }

  return data as T;
}

function getConversationTime(conversation: AiChatConversation) {
  return new Date(
    conversation.lastMessageAt || conversation.updatedAt || conversation.createdAt,
  ).getTime();
}
