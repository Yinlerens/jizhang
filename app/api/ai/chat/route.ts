import type {
  ChatCompletionChunk,
  ChatCompletionCreateParamsStreaming,
  ChatCompletionMessageParam,
} from "openai/resources/chat/completions";

import { requireAuthenticatedUser } from "@/lib/ai/auth";
import { resolveAiProviderConfig } from "@/lib/ai/cloud-config-server";
import {
  createConversationTitle,
  createStoredAiConversation,
  insertStoredAiMessage,
  isDefaultConversationTitle,
  loadStoredAiConversation,
  loadStoredAiMessages,
  toPublicAiConversation,
  toPublicAiMessage,
  updateStoredAiConversation,
} from "@/lib/ai/conversations-server";
import {
  AiConfigError,
  createOpenAIClient,
  toAiErrorMessage,
  toAiErrorStatus,
} from "@/lib/ai/openai-client";
import type {
  AiChatMessage,
  AiChatStreamEvent,
  AiDeepSeekMode,
  AiProviderConfig,
} from "@/lib/ai/types";

export const runtime = "nodejs";

interface ChatRequestBody {
  config?: Partial<AiProviderConfig>;
  conversationId?: string;
  message?: string;
  model?: string;
  systemPrompt?: string;
  deepSeekMode?: AiDeepSeekMode;
}

export async function POST(request: Request) {
  try {
    const unauthorized = await requireAuthenticatedUser();

    if (unauthorized) {
      return unauthorized;
    }

    const body = (await request.json()) as ChatRequestBody;
    const config = await resolveAiProviderConfig(body.config ?? {});
    const client = createOpenAIClient(config);
    const model = body.model?.trim() || config.model?.trim();

    if (!model) {
      return Response.json({ error: "请先选择模型" }, { status: 400 });
    }

    const userContent = body.message?.trim() ?? "";

    if (!userContent) {
      return Response.json({ error: "请输入消息内容" }, { status: 400 });
    }

    const conversationContext = await prepareConversation(body, model, userContent);
    const userMessage = await insertStoredAiMessage({
      conversationId: conversationContext.conversation.id,
      role: "user",
      content: userContent,
    });
    const storedConversation =
      (await loadStoredAiConversation(conversationContext.conversation.id)) ??
      conversationContext.conversation;
    const publicConversation = toPublicAiConversation(storedConversation);

    if (!publicConversation) {
      throw new AiConfigError("对话不存在");
    }

    const chatMessages = withDeepSeekModeMarker(
      sanitizeMessages([
        ...conversationContext.messages.map(toPublicAiMessage),
        toPublicAiMessage(userMessage),
      ]),
      model,
      storedConversation.deepseek_mode,
    );
    const messages = withSystemPrompt(chatMessages, storedConversation.system_prompt);

    const completion = await client.chat.completions.create(
      createChatCompletionParams(model, messages),
      {
        signal: request.signal,
      },
    );

    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          const enqueueEvent = (event: AiChatStreamEvent) => {
            controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
          };
          let assistantContent = "";
          let reasoningContent = "";
          const enqueueReasoning = (delta: string) => {
            reasoningContent += delta;
            enqueueEvent({ type: "reasoning", delta });
          };
          const enqueueContent = (delta: string) => {
            assistantContent += delta;
            enqueueEvent({ type: "content", delta });
          };
          const thinkTagSplitter = createThinkTagSplitter(
            enqueueReasoning,
            enqueueContent,
          );

          try {
            enqueueEvent({ type: "conversation", conversation: publicConversation });

            for await (const chunk of completion) {
              const delta = chunk.choices[0]?.delta;

              if (!delta) {
                continue;
              }

              const reasoningDelta = extractReasoningDelta(delta);

              if (reasoningDelta) {
                enqueueReasoning(reasoningDelta);
              }

              if (delta.content) {
                thinkTagSplitter.push(delta.content);
              }
            }

            thinkTagSplitter.flush();

            if (assistantContent.trim() || reasoningContent.trim()) {
              await insertStoredAiMessage({
                conversationId: publicConversation.id,
                role: "assistant",
                content: assistantContent.trim() ? assistantContent : "模型没有返回正文。",
                reasoningContent,
              });
            }

            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
        cancel() {
          completion.controller.abort();
        },
      }),
      {
        headers: {
          "Cache-Control": "no-cache, no-transform",
          "Content-Type": "application/x-ndjson; charset=utf-8",
        },
      },
    );
  } catch (error) {
    return Response.json({ error: toAiErrorMessage(error) }, { status: toAiErrorStatus(error) });
  }
}

type ChatCompletionDelta = ChatCompletionChunk.Choice.Delta;

type DeepSeekChatCompletionParams = Omit<
  ChatCompletionCreateParamsStreaming,
  "reasoning_effort"
> & {
  reasoning_effort: "max";
};

interface ReasoningDelta extends ChatCompletionDelta {
  reasoning?: unknown;
  reasoning_content?: unknown;
  reasoningContent?: unknown;
  reasoning_details?: unknown;
}

const THINK_OPEN_TAG = "<think>";
const THINK_CLOSE_TAG = "</think>";
const THINK_TAG_KEEP_CHARS = Math.max(THINK_OPEN_TAG.length, THINK_CLOSE_TAG.length) - 1;

async function prepareConversation(body: ChatRequestBody, model: string, userContent: string) {
  if (!body.conversationId) {
    const conversation = await createStoredAiConversation({
      title: createConversationTitle(userContent),
      systemPrompt: body.systemPrompt,
      deepSeekMode: body.deepSeekMode,
      providerConfigId: body.config?.id ?? null,
      model,
    });

    return {
      conversation,
      messages: [],
    };
  }

  const existing = await loadStoredAiConversation(body.conversationId);

  if (!existing) {
    throw new AiConfigError("对话不存在");
  }

  const messages = await loadStoredAiMessages(existing.id, 24);
  const shouldRename = messages.length === 0 && isDefaultConversationTitle(existing.title);
  const conversation = await updateStoredAiConversation(existing.id, {
    title: shouldRename ? createConversationTitle(userContent) : undefined,
    systemPrompt: body.systemPrompt ?? existing.system_prompt,
    deepSeekMode: body.deepSeekMode ?? existing.deepseek_mode ?? "default",
    providerConfigId: body.config?.id ?? existing.provider_config_id ?? null,
    model,
  });

  return {
    conversation,
    messages,
  };
}

function createChatCompletionParams(
  model: string,
  messages: ChatCompletionMessageParam[],
): ChatCompletionCreateParamsStreaming {
  const params = {
    model,
    messages,
    stream: true,
  } satisfies ChatCompletionCreateParamsStreaming;

  if (!isDeepSeekModel(model)) {
    return params;
  }

  const deepSeekParams: DeepSeekChatCompletionParams = {
    ...params,
    reasoning_effort: "max",
  };

  return deepSeekParams as unknown as ChatCompletionCreateParamsStreaming;
}

function isDeepSeekModel(model: string) {
  return model.toLowerCase().includes("deepseek");
}

const DEEPSEEK_MODE_MARKERS: Record<Exclude<AiDeepSeekMode, "default">, string> = {
  inner_os:
    "\n\n【角色沉浸要求】在你的思考过程（<think>标签内）中，请遵守以下规则：\n" +
    '1. 请以角色第一人称进行内心独白，用括号包裹内心活动，例如"（心想：……）"或"(内心OS：……)"\n' +
    '2. 用第一人称描写角色的内心感受，例如"我心想""我觉得""我暗自"等\n' +
    "3. 思考内容应沉浸在角色中，通过内心独白分析剧情和规划回复",
  no_inner_os:
    "\n\n【思维模式要求】在你的思考过程（<think>标签内）中，请遵守以下规则：\n" +
    '1. 禁止使用圆括号包裹内心独白，例如"（心想：……）"或"(内心OS：……)"，所有分析内容直接陈述即可\n' +
    '2. 禁止以角色第一人称描写内心活动，例如"我心想""我觉得""我暗自"等，请用分析性语言替代\n' +
    "3. 思考内容应聚焦于剧情走向分析和回复内容规划，不要在思考中进行角色扮演式的内心戏表演",
};

function withDeepSeekModeMarker(
  messages: ChatCompletionMessageParam[],
  model: string,
  mode?: AiDeepSeekMode | null,
) {
  if (!isDeepSeekModel(model) || !mode || mode === "default") {
    return messages;
  }

  const marker = DEEPSEEK_MODE_MARKERS[mode];
  let didApplyMarker = false;

  return messages.map((message) => {
    if (didApplyMarker || message.role !== "user" || typeof message.content !== "string") {
      return message;
    }

    didApplyMarker = true;

    return {
      ...message,
      content: `${message.content}${marker}`,
    };
  });
}

function extractReasoningDelta(delta: ChatCompletionDelta) {
  const maybeReasoning = delta as ReasoningDelta;

  return toReasoningText(
    maybeReasoning.reasoning_content ??
      maybeReasoning.reasoningContent ??
      maybeReasoning.reasoning ??
      maybeReasoning.reasoning_details,
  );
}

function toReasoningText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(toReasoningText).join("");
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    return toReasoningText(record.text ?? record.content ?? record.summary ?? record.delta);
  }

  return "";
}

function createThinkTagSplitter(
  onReasoningDelta: (delta: string) => void,
  onContentDelta: (delta: string) => void,
) {
  let buffer = "";
  let isInsideThinkTag = false;

  const emit = (delta: string) => {
    if (!delta) {
      return;
    }

    if (isInsideThinkTag) {
      onReasoningDelta(delta);
    } else {
      onContentDelta(delta);
    }
  };

  const takeBufferedText = (isFinal: boolean) => {
    if (isFinal) {
      const text = buffer;
      buffer = "";
      return text;
    }

    if (buffer.length <= THINK_TAG_KEEP_CHARS) {
      return "";
    }

    const text = buffer.slice(0, -THINK_TAG_KEEP_CHARS);
    buffer = buffer.slice(-THINK_TAG_KEEP_CHARS);
    return text;
  };

  const drain = (isFinal: boolean) => {
    while (buffer.length > 0) {
      if (isInsideThinkTag) {
        const closeIndex = buffer.indexOf(THINK_CLOSE_TAG);

        if (closeIndex >= 0) {
          emit(buffer.slice(0, closeIndex));
          buffer = buffer.slice(closeIndex + THINK_CLOSE_TAG.length);
          isInsideThinkTag = false;
          continue;
        }

        const text = takeBufferedText(isFinal);

        if (!text) {
          break;
        }

        emit(text);
        continue;
      }

      const openIndex = buffer.indexOf(THINK_OPEN_TAG);

      if (openIndex >= 0) {
        emit(buffer.slice(0, openIndex));
        buffer = buffer.slice(openIndex + THINK_OPEN_TAG.length);
        isInsideThinkTag = true;
        continue;
      }

      const text = takeBufferedText(isFinal);

      if (!text) {
        break;
      }

      emit(text);
    }
  };

  return {
    push(delta: string) {
      buffer += delta;
      drain(false);
    },
    flush() {
      drain(true);
    },
  };
}

function sanitizeMessages(messages: AiChatMessage[]): ChatCompletionMessageParam[] {
  return messages
    .filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    )
    .slice(-20)
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }));
}

function withSystemPrompt(
  messages: ChatCompletionMessageParam[],
  systemPrompt?: string,
): ChatCompletionMessageParam[] {
  const content = systemPrompt?.trim();

  if (!content) {
    return messages;
  }

  return [
    {
      role: "system",
      content,
    },
    ...messages,
  ];
}
