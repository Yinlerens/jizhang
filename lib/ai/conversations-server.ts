import { createClient } from "@/lib/supabase/server";
import { AiConfigError } from "@/lib/ai/openai-client";
import type {
  AiChatConversation,
  AiChatConversationRecord,
  AiChatMessage,
  AiChatMessageRecord,
  AiChatRole,
  AiDeepSeekMode,
} from "@/lib/ai/types";

const conversationColumns =
  "id,user_id,title,system_prompt,deepseek_mode,provider_config_id,model,last_message_at,created_at,updated_at";
const messageColumns =
  "id,conversation_id,user_id,role,content,reasoning_content,created_at,updated_at";
const DEFAULT_CONVERSATION_TITLE = "新对话";

export async function loadStoredAiConversations() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ai_chat_conversations")
    .select(conversationColumns)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new AiConfigError(toConversationTableError(error.message));
  }

  return (data ?? []) as AiChatConversationRecord[];
}

export async function loadStoredAiConversation(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ai_chat_conversations")
    .select(conversationColumns)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new AiConfigError(toConversationTableError(error.message));
  }

  return data as AiChatConversationRecord | null;
}

export async function createStoredAiConversation(input: {
  title?: string;
  systemPrompt?: string;
  deepSeekMode?: AiDeepSeekMode;
  providerConfigId?: string | null;
  model?: string;
}) {
  const supabase = await createClient();
  const userId = await getUserId(supabase);

  const { data, error } = await supabase
    .from("ai_chat_conversations")
    .insert({
      user_id: userId,
      title: normalizeConversationTitle(input.title || DEFAULT_CONVERSATION_TITLE),
      system_prompt: normalizeSystemPrompt(input.systemPrompt),
      deepseek_mode: normalizeDeepSeekMode(input.deepSeekMode),
      provider_config_id: input.providerConfigId || null,
      model: input.model?.trim() ?? "",
    })
    .select(conversationColumns)
    .single();

  if (error) {
    throw new AiConfigError(toConversationTableError(error.message));
  }

  return data as AiChatConversationRecord;
}

export async function updateStoredAiConversation(
  id: string,
  input: {
    title?: string;
    systemPrompt?: string;
    deepSeekMode?: AiDeepSeekMode;
    providerConfigId?: string | null;
    model?: string;
    lastMessageAt?: string | null;
  },
) {
  if (!id) {
    throw new AiConfigError("请选择对话");
  }

  const patch: Record<string, string | null> = {};

  if (input.title !== undefined) {
    patch.title = normalizeConversationTitle(input.title);
  }

  if (input.systemPrompt !== undefined) {
    patch.system_prompt = normalizeSystemPrompt(input.systemPrompt);
  }

  if (input.deepSeekMode !== undefined) {
    patch.deepseek_mode = normalizeDeepSeekMode(input.deepSeekMode);
  }

  if (input.providerConfigId !== undefined) {
    patch.provider_config_id = input.providerConfigId || null;
  }

  if (input.model !== undefined) {
    patch.model = input.model.trim();
  }

  if (input.lastMessageAt !== undefined) {
    patch.last_message_at = input.lastMessageAt;
  }

  if (Object.keys(patch).length === 0) {
    const existing = await loadStoredAiConversation(id);

    if (!existing) {
      throw new AiConfigError("对话不存在");
    }

    return existing;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ai_chat_conversations")
    .update(patch)
    .eq("id", id)
    .select(conversationColumns)
    .single();

  if (error) {
    throw new AiConfigError(toConversationTableError(error.message));
  }

  return data as AiChatConversationRecord;
}

export async function deleteStoredAiConversation(id: string) {
  if (!id) {
    throw new AiConfigError("请选择要删除的对话");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("ai_chat_conversations").delete().eq("id", id);

  if (error) {
    throw new AiConfigError(toConversationTableError(error.message));
  }
}

export async function loadStoredAiMessages(conversationId: string, limit = 200) {
  const supabase = await createClient();
  let query = supabase
    .from("ai_chat_messages")
    .select(messageColumns)
    .eq("conversation_id", conversationId);

  if (limit > 0) {
    query = query.order("created_at", { ascending: false }).limit(limit);
  } else {
    query = query.order("created_at", { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    throw new AiConfigError(toConversationTableError(error.message));
  }

  const records = (data ?? []) as AiChatMessageRecord[];

  if (limit > 0) {
    return records.reverse();
  }

  return records;
}

export async function insertStoredAiMessage(input: {
  conversationId: string;
  role: AiChatRole;
  content: string;
  reasoningContent?: string;
}) {
  const content = input.content;
  const reasoningContent = input.reasoningContent;

  if (!content.trim() && !reasoningContent?.trim()) {
    throw new AiConfigError("消息内容不能为空");
  }

  const supabase = await createClient();
  const userId = await getUserId(supabase);

  const { data, error } = await supabase
    .from("ai_chat_messages")
    .insert({
      conversation_id: input.conversationId,
      user_id: userId,
      role: input.role,
      content: content.trim() ? content : "",
      reasoning_content: reasoningContent?.trim() ? reasoningContent : null,
    })
    .select(messageColumns)
    .single();

  if (error) {
    throw new AiConfigError(toConversationTableError(error.message));
  }

  const record = data as AiChatMessageRecord;
  await updateStoredAiConversation(input.conversationId, {
    lastMessageAt: record.created_at,
  });

  return record;
}

export function toPublicAiConversation(
  record: AiChatConversationRecord | null,
): AiChatConversation | null {
  if (!record) {
    return null;
  }

  return {
    id: record.id,
    title: record.title,
    systemPrompt: record.system_prompt,
    deepSeekMode: normalizeDeepSeekMode(record.deepseek_mode),
    providerConfigId: record.provider_config_id,
    model: record.model,
    lastMessageAt: record.last_message_at,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

export function toPublicAiMessage(record: AiChatMessageRecord): AiChatMessage {
  return {
    id: record.id,
    role: record.role,
    content: record.content,
    reasoningContent: record.reasoning_content || undefined,
    createdAt: record.created_at,
  };
}

export function createConversationTitle(message: string) {
  const compact = message.trim().replace(/\s+/g, " ");

  if (!compact) {
    return DEFAULT_CONVERSATION_TITLE;
  }

  return compact.slice(0, 40);
}

export function isDefaultConversationTitle(title: string) {
  return title.trim() === DEFAULT_CONVERSATION_TITLE;
}

async function getUserId(supabase: Awaited<ReturnType<typeof createClient>>) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new AiConfigError("未登录");
  }

  return user.id;
}

function normalizeConversationTitle(title: string) {
  const normalized = title.trim();

  if (normalized.length < 1 || normalized.length > 80) {
    throw new AiConfigError("对话标题长度需要在 1 到 80 个字符之间");
  }

  return normalized;
}

function normalizeSystemPrompt(systemPrompt?: string) {
  const normalized = systemPrompt?.trim() ?? "";

  if (normalized.length > 20000) {
    throw new AiConfigError("系统提示词不能超过 20000 个字符");
  }

  return normalized;
}

function normalizeDeepSeekMode(mode?: AiDeepSeekMode | null): AiDeepSeekMode {
  if (mode === "inner_os" || mode === "no_inner_os") {
    return mode;
  }

  return "default";
}

function toConversationTableError(message: string) {
  if (
    (message.includes("ai_chat_conversations") || message.includes("ai_chat_messages")) &&
    (message.includes("does not exist") || message.includes("Could not find"))
  ) {
    return "对话历史表结构未更新，请先执行 Supabase migration";
  }

  return message;
}
