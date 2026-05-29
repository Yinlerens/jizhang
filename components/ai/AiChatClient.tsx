"use client";

import Link from "next/link";
import { FormEvent, startTransition, useEffect, useMemo, useRef, useState } from "react";
import {
  BrainCircuit,
  BotMessageSquare,
  ChevronDown,
  Cloud,
  FileText,
  History,
  Loader2,
  MessageSquareText,
  Plus,
  RefreshCw,
  Send,
  Settings2,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  defaultAiConfig,
  makeLocalMessage,
  readAiConfig,
  writeAiConfig,
} from "@/components/ai/ai-storage";
import { loadCloudAiConfig } from "@/lib/ai/cloud-config";
import {
  compareConversationsByActivity,
  createAiConversation,
  deleteAiConversation,
  loadAiConversationMessages,
  loadAiConversations,
  updateAiConversation,
  upsertConversation,
} from "@/lib/ai/conversations";
import type {
  AiApiErrorResponse,
  AiChatConversation,
  AiChatMessage,
  AiChatStreamEvent,
  AiDeepSeekMode,
  AiProviderConfig,
} from "@/lib/ai/types";

const DEEPSEEK_MODE_OPTIONS: Array<{
  value: AiDeepSeekMode;
  label: string;
  code: string;
}> = [
  { value: "default", label: "默认对话", code: "auto" },
  { value: "inner_os", label: "角色沉浸", code: "inner_os" },
  { value: "no_inner_os", label: "纯分析", code: "no_inner_os" },
];

const DEEPSEEK_MODE_SAVE_DELAY_MS = 350;

type MobileAiPanelView = "history" | "settings";

export default function AiChatClient() {
  const [config, setConfig] = useState<AiProviderConfig>(defaultAiConfig);
  const [cloudConfigs, setCloudConfigs] = useState<AiProviderConfig[]>([]);
  const [conversations, setConversations] = useState<AiChatConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<AiChatConversation | null>(null);
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [deepSeekMode, setDeepSeekMode] = useState<AiDeepSeekMode>("default");
  const [mobilePanelView, setMobilePanelView] = useState<MobileAiPanelView>("history");
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [conversationPendingDelete, setConversationPendingDelete] =
    useState<AiChatConversation | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingConfigs, setIsLoadingConfigs] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [isDeletingConversation, setIsDeletingConversation] = useState(false);
  const [isSavingSystemPrompt, setIsSavingSystemPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const deepSeekSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deepSeekSaveSeqRef = useRef(0);
  const currentConversationRef = useRef<AiChatConversation | null>(null);
  const deepSeekModeRef = useRef<AiDeepSeekMode>("default");

  useEffect(() => {
    const localConfig = readAiConfig();

    setConfig(localConfig);
    void loadCloudAiConfig(localConfig.id)
      .then((data) => {
        const configs = data.configs ?? [];
        const nextConfig =
          configs.find((item) => item.id === localConfig.id) ?? data.config ?? configs[0];

        setCloudConfigs(configs);

        if (nextConfig) {
          setConfig(nextConfig);
          writeAiConfig(nextConfig);
        }
      })
      .catch(() => undefined);
    void refreshConversationList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  useEffect(() => {
    currentConversationRef.current = currentConversation;
    deepSeekModeRef.current = deepSeekMode;
  }, [currentConversation, deepSeekMode]);

  useEffect(() => {
    return () => {
      if (deepSeekSaveTimerRef.current) {
        clearTimeout(deepSeekSaveTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!currentConversation || cloudConfigs.length === 0) {
      return;
    }

    const nextConfig = findConversationProviderConfig(currentConversation, cloudConfigs);

    if (!nextConfig || nextConfig.id === config.id) {
      return;
    }

    setConfig(nextConfig);
    writeAiConfig(nextConfig);
  }, [cloudConfigs, config.id, currentConversation]);

  const hasConfig = config.apiKey.trim().length > 0 || Boolean(config.hasCloudApiKey);
  const activeModel = config.model || "";
  const isDeepSeekSelected = isDeepSeekModelName(activeModel);
  const canSend = Boolean(hasConfig && activeModel && draft.trim().length > 0 && !isSending);
  const selectedConfigValue = config.id || "";

  const openMobilePanel = (view: MobileAiPanelView) => {
    setMobilePanelView(view);
    setIsMobilePanelOpen(true);
  };

  const visibleMessages = useMemo<AiChatMessage[]>(() => {
    if (isLoadingMessages) {
      return [
        {
          id: "loading-history",
          role: "assistant",
          content: "正在读取云端对话历史。",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    if (messages.length > 0) {
      return messages;
    }

    return [
      {
        id: "welcome",
        role: "assistant" as const,
        content: currentConversation
          ? "这条频道还没有消息。把第一句话发出来，我会把后续对话都同步到云端。"
          : "选择一个历史对话，或者新建对话后开始聊天。历史会跟随账号保存在云端。",
        createdAt: new Date().toISOString(),
      },
    ];
  }, [currentConversation, isLoadingMessages, messages]);

  async function refreshConversationList(preferredId?: string, shouldLoadMessages = true) {
    setIsLoadingConversations(true);

    try {
      const data = await loadAiConversations();
      const sorted = data.conversations.sort(compareConversationsByActivity);
      const selected =
        sorted.find((item) => item.id === preferredId) ??
        sorted.find((item) => item.id === currentConversation?.id) ??
        sorted[0] ??
        null;

      setConversations(sorted);

      if (!selected) {
        setCurrentConversation(null);
        setMessages([]);
        setSystemPrompt("");
        setDeepSeekMode("default");
        return;
      }

      setCurrentConversation(selected);
      setSystemPrompt(selected.systemPrompt);
      setDeepSeekMode(selected.deepSeekMode);

      if (shouldLoadMessages) {
        await loadConversationMessages(selected);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "对话历史读取失败");
    } finally {
      setIsLoadingConversations(false);
    }
  }

  async function loadConversationMessages(conversation: AiChatConversation) {
    setIsLoadingMessages(true);

    try {
      const data = await loadAiConversationMessages(conversation.id);

      setCurrentConversation(data.conversation);
      setSystemPrompt(data.conversation.systemPrompt);
      setDeepSeekMode(data.conversation.deepSeekMode);
      setMessages(data.messages);
      setConversations((items) => upsertConversation(items, data.conversation));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "对话消息读取失败");
    } finally {
      setIsLoadingMessages(false);
    }
  }

  const selectConversation = async (conversation: AiChatConversation, shouldClosePanel = false) => {
    if (isSending) {
      return;
    }

    if (shouldClosePanel) {
      setIsMobilePanelOpen(false);
    }

    await loadConversationMessages(conversation);
  };

  const refreshConfiguredModels = async () => {
    setIsLoadingConfigs(true);

    try {
      const data = await loadCloudAiConfig(config.id);
      const configs = data.configs ?? [];
      const nextConfig =
        (currentConversation
          ? findConversationProviderConfig(currentConversation, configs)
          : undefined) ??
        configs.find((item) => item.id === config.id) ??
        data.config ??
        configs[0];

      setCloudConfigs(configs);

      if (nextConfig) {
        setConfig(nextConfig);
        writeAiConfig(nextConfig);
      }

      toast.success(`已加载 ${configs.length} 个已配置模型`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "配置读取失败");
    } finally {
      setIsLoadingConfigs(false);
    }
  };

  const selectConfiguredModel = async (id: string) => {
    const nextConfig = cloudConfigs.find((item) => item.id === id);

    if (!nextConfig) {
      return;
    }

    setConfig(nextConfig);
    writeAiConfig(nextConfig);

    if (currentConversation) {
      const optimisticConversation = withConversationConfig(currentConversation, nextConfig);

      setCurrentConversation(optimisticConversation);
      setConversations((items) => upsertConversation(items, optimisticConversation));

      try {
        const data = await updateAiConversation(currentConversation.id, {
          providerConfigId: nextConfig.id ?? null,
          model: nextConfig.model,
          systemPrompt,
          deepSeekMode,
        });
        const conversation = data.conversation;

        if (conversation) {
          setCurrentConversation(conversation);
          setConversations((items) => upsertConversation(items, conversation));
        }

        if (data.conversations) {
          setConversations(data.conversations.sort(compareConversationsByActivity));
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "对话模型保存失败");
      }
    }

    toast.success("已切换模型配置");
  };

  const updateSystemPromptDraft = (value: string) => {
    setSystemPrompt(value);
  };

  const scheduleDeepSeekModeSave = (
    conversationId: string,
    mode: AiDeepSeekMode,
    payload: {
      systemPrompt: string;
      providerConfigId: string | null;
      model: string;
    },
  ) => {
    deepSeekSaveSeqRef.current += 1;
    const saveSeq = deepSeekSaveSeqRef.current;

    if (deepSeekSaveTimerRef.current) {
      clearTimeout(deepSeekSaveTimerRef.current);
    }

    deepSeekSaveTimerRef.current = setTimeout(() => {
      deepSeekSaveTimerRef.current = null;

      void updateAiConversation(conversationId, {
        ...payload,
        deepSeekMode: mode,
      })
        .then((data) => {
          if (
            saveSeq !== deepSeekSaveSeqRef.current ||
            deepSeekModeRef.current !== mode ||
            currentConversationRef.current?.id !== conversationId
          ) {
            return;
          }

          const conversation = data.conversation;

          if (conversation) {
            startTransition(() => {
              setCurrentConversation(conversation);
              setConversations((items) => upsertConversation(items, conversation));
            });
          }

          const conversations = data.conversations;

          if (conversations) {
            startTransition(() => {
              setConversations(conversations.sort(compareConversationsByActivity));
            });
          }
        })
        .catch((error) => {
          if (saveSeq !== deepSeekSaveSeqRef.current) {
            return;
          }

          toast.error(error instanceof Error ? error.message : "DeepSeek 模式保存失败");
        });
    }, DEEPSEEK_MODE_SAVE_DELAY_MS);
  };

  const selectDeepSeekMode = (mode: AiDeepSeekMode) => {
    if (deepSeekModeRef.current === mode) {
      return;
    }

    setDeepSeekMode(mode);
    deepSeekModeRef.current = mode;

    if (!currentConversation) {
      return;
    }

    const optimisticConversation = withConversationDeepSeekMode(currentConversation, mode);

    currentConversationRef.current = optimisticConversation;
    startTransition(() => {
      setCurrentConversation(optimisticConversation);
      setConversations((items) => upsertConversation(items, optimisticConversation));
    });
    scheduleDeepSeekModeSave(currentConversation.id, mode, {
      systemPrompt,
      providerConfigId: config.id ?? null,
      model: activeModel,
    });
  };

  const saveCurrentSystemPrompt = async () => {
    if (!currentConversation || currentConversation.systemPrompt === systemPrompt) {
      return;
    }

    setIsSavingSystemPrompt(true);

    try {
      const data = await updateAiConversation(currentConversation.id, {
        systemPrompt,
        deepSeekMode,
        providerConfigId: config.id ?? null,
        model: activeModel,
      });

      const conversation = data.conversation;

      if (conversation) {
        setCurrentConversation(conversation);
        setConversations((items) => upsertConversation(items, conversation));
      }

      if (data.conversations) {
        setConversations(data.conversations.sort(compareConversationsByActivity));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "系统提示词保存失败");
    } finally {
      setIsSavingSystemPrompt(false);
    }
  };

  const createConversation = async () => {
    setIsCreatingConversation(true);

    try {
      const data = await createAiConversation({
        systemPrompt,
        deepSeekMode,
        providerConfigId: config.id ?? null,
        model: activeModel,
      });

      if (data.conversations) {
        setConversations(data.conversations.sort(compareConversationsByActivity));
      }

      if (data.conversation) {
        setCurrentConversation(data.conversation);
        setSystemPrompt(data.conversation.systemPrompt);
        setMessages([]);
      }

      setIsMobilePanelOpen(false);
      toast.success("新对话已创建");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "新建对话失败");
    } finally {
      setIsCreatingConversation(false);
    }
  };

  const deleteCurrentConversation = async () => {
    const target = conversationPendingDelete ?? currentConversation;

    if (!target || isDeletingConversation) {
      return;
    }

    setIsDeletingConversation(true);

    try {
      const data = await deleteAiConversation(target.id);
      const sorted = (data.conversations ?? []).sort(compareConversationsByActivity);

      setConversations(sorted);

      if (data.conversation) {
        await loadConversationMessages(data.conversation);
      } else {
        setCurrentConversation(null);
        setMessages([]);
        setSystemPrompt("");
        setDeepSeekMode("default");
      }

      toast.success("对话已删除");
      setConversationPendingDelete(null);
      setIsMobilePanelOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "删除对话失败");
    } finally {
      setIsDeletingConversation(false);
    }
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSend) {
      return;
    }

    const userMessage = makeLocalMessage("user", draft.trim());
    const nextMessages = [...messages, userMessage];

    setDraft("");
    setMessages(nextMessages);
    setIsSending(true);

    try {
      let activeConversationId = currentConversation?.id;
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config,
          conversationId: currentConversation?.id,
          message: userMessage.content,
          model: activeModel,
          systemPrompt,
          deepSeekMode,
        }),
      });

      if (!response.ok) {
        throw new Error(await readChatError(response));
      }

      if (!response.body) {
        throw new Error("当前浏览器不支持流式响应");
      }

      const assistantMessage = makeLocalMessage("assistant", "");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let reasoningContent = "";
      let streamBuffer = "";

      setMessages([...nextMessages, assistantMessage]);

      const applyStreamEvent = (event: AiChatStreamEvent) => {
        if (event.type === "conversation") {
          activeConversationId = event.conversation.id;
          setCurrentConversation(event.conversation);
          setSystemPrompt(event.conversation.systemPrompt);
          setDeepSeekMode(event.conversation.deepSeekMode);
          setConversations((items) => upsertConversation(items, event.conversation));
          return;
        }

        if (event.type === "reasoning") {
          reasoningContent += event.delta;
        } else {
          assistantContent += event.delta;
        }

        setMessages([
          ...nextMessages,
          {
            ...assistantMessage,
            content: assistantContent,
            reasoningContent: reasoningContent || undefined,
          },
        ]);
      };

      const consumeStreamText = (text: string) => {
        streamBuffer += text;

        const lines = streamBuffer.split("\n");
        streamBuffer = lines.pop() ?? "";

        for (const line of lines) {
          const event = parseChatStreamEvent(line);

          if (event) {
            applyStreamEvent(event);
          }
        }
      };

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        consumeStreamText(decoder.decode(value, { stream: true }));
      }

      const tail = decoder.decode();

      if (tail) {
        consumeStreamText(tail);
      }

      if (streamBuffer.trim()) {
        const event = parseChatStreamEvent(streamBuffer);

        if (event) {
          applyStreamEvent(event);
        }
      }

      if (assistantContent.trim().length === 0 && reasoningContent.trim().length === 0) {
        throw new Error("模型没有返回内容");
      }

      const withAssistant = [
        ...nextMessages,
        {
          ...assistantMessage,
          content: assistantContent || "模型没有返回正文。",
          reasoningContent: reasoningContent || undefined,
        },
      ];

      setMessages(withAssistant);
      void refreshConversationList(activeConversationId, false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "发送失败");
      setMessages(nextMessages);
      void refreshConversationList(currentConversation?.id, false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative h-[calc(100dvh-7rem)] min-h-[420px] overflow-hidden rounded-2xl border-2 border-[#26223a] bg-[#fff9ec] text-[#26223a] shadow-[4px_4px_0_#ff7aa8] dark:border-cyan-300/30 dark:bg-[#10131f] dark:text-cyan-50 dark:shadow-[4px_4px_0_rgba(103,232,249,0.14)] md:h-auto md:min-h-[calc(100vh-4rem)] md:rounded-md md:shadow-[8px_8px_0_#ff7aa8] md:dark:shadow-[8px_8px_0_rgba(103,232,249,0.14)]">
      <AnimeBackdrop />

      <div className="relative z-10 grid h-full gap-4 md:min-h-[calc(100vh-4rem)] md:p-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="flex min-h-0 min-w-0 flex-col bg-white/92 backdrop-blur dark:bg-white/5 md:min-h-[680px] md:rounded-md md:border-2 md:border-[#26223a] md:shadow-[6px_6px_0_#7dd3fc] md:dark:border-cyan-300/25 md:dark:shadow-[6px_6px_0_rgba(244,114,182,0.16)]">
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b-2 border-[#26223a] bg-[#fff9ec]/95 px-2.5 backdrop-blur-xl dark:border-cyan-300/15 dark:bg-[#10131f]/95 md:hidden">
            <button
              type="button"
              onClick={() => openMobilePanel("history")}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#22263a] bg-white text-[#22263a] shadow-[2px_2px_0_#7dd3fc] active:translate-y-px dark:border-cyan-300/25 dark:bg-white/10 dark:text-cyan-50 dark:shadow-none"
              aria-label="打开对话历史"
            >
              <History size={18} />
            </button>
            <div className="min-w-0 flex-1 text-center">
              <h1 className="truncate text-[15px] font-black leading-5 text-[#22263a] dark:text-cyan-50">
                {currentConversation?.title || "星环对话"}
              </h1>
              <p className="truncate font-mono text-[10px] font-bold leading-4 text-[#6c5a68] dark:text-cyan-50/60">
                {activeModel || "未选择模型"}
              </p>
            </div>
            <button
              type="button"
              onClick={createConversation}
              disabled={isCreatingConversation}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#22263a] bg-[#ffcf56] text-[#22263a] shadow-[2px_2px_0_#22263a] active:translate-y-px disabled:opacity-60 dark:border-cyan-300/25 dark:bg-cyan-300 dark:shadow-none"
              aria-label="新建对话"
            >
              {isCreatingConversation ? <Loader2 size={17} className="animate-spin" /> : <Plus size={18} />}
            </button>
            <button
              type="button"
              onClick={() => openMobilePanel("settings")}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#22263a] bg-[#ff7aa8] text-white shadow-[2px_2px_0_#22263a] active:translate-y-px dark:border-cyan-300/25 dark:bg-fuchsia-500 dark:shadow-none"
              aria-label="打开对话设置"
            >
              <Settings2 size={18} />
            </button>
          </header>

          <header className="hidden flex-col gap-3 border-b-2 border-[#26223a] bg-[#fff1f6]/75 p-4 dark:border-cyan-300/15 dark:bg-white/5 md:flex lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="inline-flex h-8 items-center gap-2 rounded-md border-2 border-[#26223a] bg-[#ffcf56] px-3 text-xs font-black uppercase text-[#26223a] shadow-[3px_3px_0_#ff7aa8]">
                <Sparkles size={14} />
                Chat Stage
              </div>
              <h1 className="anime-display mt-3 truncate text-3xl font-black text-[#26223a] dark:text-cyan-50 md:text-4xl">
                星环对话
              </h1>
              <p className="mt-1 truncate text-xs font-bold text-[#6c5a68] dark:text-cyan-50/60">
                {currentConversation?.title || "云端多对话历史"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedConfigValue}
                onChange={(event) => void selectConfiguredModel(event.target.value)}
                className="h-10 w-full rounded-md border-2 border-[#26223a] bg-[#f8fcff] px-3 font-mono text-xs font-black text-[#26223a] shadow-[3px_3px_0_#7dd3fc] outline-none dark:border-cyan-300/30 dark:bg-[#151a2c] dark:text-cyan-50 dark:shadow-none sm:w-auto sm:min-w-64"
              >
                {!selectedConfigValue && (
                  <option value="">
                    {activeModel ? `${config.name || "本地配置"} / ${activeModel}` : "选择已配置模型"}
                  </option>
                )}
                {cloudConfigs.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name || "未命名配置"} / {item.model || "未选择模型"}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={refreshConfiguredModels}
                disabled={isLoadingConfigs}
                className="grid h-10 w-10 place-items-center rounded-md border-2 border-[#26223a] bg-cyan-200 text-[#26223a] shadow-[3px_3px_0_#26223a] transition hover:-translate-y-0.5 disabled:opacity-60 dark:border-cyan-300/30 dark:bg-cyan-300 dark:shadow-none"
                aria-label="刷新已配置模型"
              >
                {isLoadingConfigs ? <Loader2 size={17} className="animate-spin" /> : <RefreshCw size={17} />}
              </button>
              <Link
                href="/dashboard/ai/settings"
                className="grid h-10 w-10 place-items-center rounded-md border-2 border-[#26223a] bg-[#ff7aa8] text-white shadow-[3px_3px_0_#26223a] transition hover:-translate-y-0.5 dark:border-cyan-300/30 dark:bg-fuchsia-500 dark:shadow-none"
                aria-label="AI 配置"
              >
                <Settings2 size={17} />
              </Link>
            </div>
          </header>

          {!hasConfig && (
            <div className="m-3 rounded-xl border-2 border-[#26223a] bg-[#fff4c8] p-3 text-sm font-black text-[#5d4a1f] shadow-[3px_3px_0_#26223a] dark:border-cyan-300/20 dark:bg-yellow-300/10 dark:text-yellow-100 dark:shadow-none md:m-4 md:rounded-md md:p-4 md:shadow-[4px_4px_0_#26223a]">
              需要先配置 API Key
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-3 py-4 md:p-4">
            <div className="mx-auto flex max-w-4xl flex-col gap-3 md:gap-4">
              {visibleMessages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <form
            onSubmit={sendMessage}
            className="shrink-0 border-t-2 border-[#26223a] bg-[#fff9ec]/92 p-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-xl dark:border-cyan-300/15 dark:bg-[#10131f]/92 md:bg-[#fff9ec]/70 md:p-4 md:backdrop-blur-none md:dark:bg-white/5"
          >
            <div className="mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-[24px] border-2 border-[#26223a] bg-[#f8fcff] shadow-[3px_3px_0_#7dd3fc] dark:border-cyan-300/25 dark:bg-[#151a2c] dark:shadow-[3px_3px_0_rgba(34,211,238,0.13)] md:rounded-md md:shadow-[5px_5px_0_#7dd3fc] md:dark:shadow-[5px_5px_0_rgba(34,211,238,0.13)]">
                <div className="flex items-end gap-2 p-2 md:block md:p-0">
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    }}
                    className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2 text-sm font-semibold leading-6 text-[#22263a] outline-none placeholder:text-[#8b7280] dark:text-cyan-50 dark:placeholder:text-cyan-50/40 md:min-h-28 md:w-full md:px-4 md:py-3"
                    placeholder="输入消息"
                    rows={1}
                  />
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#22263a] bg-[#ff7aa8] text-white shadow-[2px_2px_0_#22263a] transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 dark:border-cyan-300/25 dark:bg-cyan-300 dark:text-[#10131f] dark:shadow-none md:hidden"
                    aria-label="发送消息"
                  >
                    {isSending ? <Loader2 size={17} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
                <div className="hidden flex-col gap-3 border-t-2 border-[#26223a]/15 bg-white/60 p-3 dark:border-cyan-300/10 dark:bg-white/5 md:flex sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 flex-wrap items-center gap-3 text-xs font-black text-[#6c5a68] dark:text-cyan-50/60">
                    <span className="font-mono">{activeModel || "no-model"}</span>
                    <span>流式开启</span>
                    <span>思考开启</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={createConversation}
                      disabled={isCreatingConversation}
                      className="inline-flex h-10 items-center gap-2 rounded-md border border-[#22263a] bg-white px-3 text-sm font-black text-[#22263a] transition hover:-translate-y-0.5 disabled:opacity-60 dark:border-cyan-300/25 dark:bg-white/5 dark:text-cyan-50"
                    >
                      {isCreatingConversation ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                      新对话
                    </button>
                    <button
                      type="submit"
                      disabled={!canSend}
                      className="inline-flex h-10 items-center gap-2 rounded-md border border-[#22263a] bg-[#ff7aa8] px-4 text-sm font-black text-white shadow-[3px_3px_0_#22263a] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-cyan-300/25 dark:bg-cyan-300 dark:text-[#10131f] dark:shadow-none"
                    >
                      {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      发送
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>

        <aside className="hidden space-y-4 md:block">
          <section className="rounded-md border-2 border-[#26223a] bg-white/90 p-4 shadow-[6px_6px_0_#ffcf56] dark:border-cyan-300/20 dark:bg-white/5 dark:shadow-[6px_6px_0_rgba(34,211,238,0.14)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-sm font-black uppercase text-[#22263a] dark:text-cyan-100">
                <History size={16} />
                对话历史
              </h2>
              <div className="flex items-center gap-2">
                {currentConversation && (
                  <button
                    type="button"
                    onClick={() => setConversationPendingDelete(currentConversation)}
                    disabled={isDeletingConversation || isSending}
                    className="grid h-8 w-8 place-items-center rounded-md border border-[#22263a] bg-white text-[#22263a] transition hover:-translate-y-0.5 disabled:opacity-50 dark:border-cyan-300/20 dark:bg-white/5 dark:text-cyan-50"
                    aria-label="删除当前对话"
                  >
                    {isDeletingConversation ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={createConversation}
                  disabled={isCreatingConversation}
                  className="grid h-8 w-8 place-items-center rounded-md border border-[#22263a] bg-[#ff7aa8] text-white shadow-[2px_2px_0_#22263a] transition hover:-translate-y-0.5 disabled:opacity-50 dark:border-cyan-300/20 dark:bg-cyan-300 dark:text-[#10131f] dark:shadow-none"
                  aria-label="新建对话"
                >
                  {isCreatingConversation ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                </button>
              </div>
            </div>

            <div className="mt-4 grid max-h-72 gap-2 overflow-y-auto pr-1">
              {isLoadingConversations ? (
                <div className="rounded-md border border-dashed border-cyan-200 bg-cyan-50/70 p-4 text-center text-xs font-black text-[#6c5a68] dark:border-cyan-300/20 dark:bg-cyan-300/5 dark:text-cyan-50/60">
                  云端同步中
                </div>
              ) : conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === currentConversation?.id}
                    onSelect={() => void selectConversation(conversation)}
                  />
                ))
              ) : (
                <div className="rounded-md border border-dashed border-cyan-200 bg-cyan-50/70 p-4 text-center text-xs font-black text-[#6c5a68] dark:border-cyan-300/20 dark:bg-cyan-300/5 dark:text-cyan-50/60">
                  暂无云端历史
                </div>
              )}
            </div>
          </section>

          <section className="rounded-md border-2 border-[#26223a] bg-white/90 p-4 shadow-[6px_6px_0_#ffcf56] dark:border-cyan-300/20 dark:bg-white/5 dark:shadow-[6px_6px_0_rgba(34,211,238,0.14)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-sm font-black uppercase text-[#22263a] dark:text-cyan-100">
                <FileText size={16} />
                系统提示词
              </h2>
              {isSavingSystemPrompt && <Loader2 size={14} className="animate-spin text-cyan-500" />}
            </div>
            <textarea
              value={systemPrompt}
              onChange={(event) => updateSystemPromptDraft(event.target.value)}
              onBlur={saveCurrentSystemPrompt}
              className="mt-3 min-h-36 w-full resize-none rounded-md border border-[#22263a] bg-[#fffaf1] px-3 py-2 text-xs font-bold leading-5 text-[#22263a] outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:border-cyan-300/20 dark:bg-[#151a2c] dark:text-cyan-50 dark:focus:ring-cyan-400/20"
              placeholder="你是..."
            />
          </section>

          <section className="rounded-md border-2 border-[#26223a] bg-white/90 p-4 shadow-[6px_6px_0_#7dd3fc] dark:border-cyan-300/20 dark:bg-white/5 dark:shadow-[6px_6px_0_rgba(34,211,238,0.14)]">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase text-[#22263a] dark:text-cyan-100">
              <BrainCircuit size={16} />
              DeepSeek 模式
            </h2>
            <div className="mt-3 grid gap-2">
              {DEEPSEEK_MODE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => void selectDeepSeekMode(option.value)}
                  disabled={!isDeepSeekSelected || isSending}
                  className={`flex min-h-12 items-center justify-between gap-3 rounded-md border px-3 text-left transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${
                    deepSeekMode === option.value
                      ? "border-[#22263a] bg-[#ffcf56] text-[#22263a] shadow-[3px_3px_0_#22263a] dark:border-cyan-200 dark:bg-cyan-300 dark:shadow-none"
                      : "border-cyan-100 bg-[#f8fcff] text-[#22263a] hover:border-[#22263a] dark:border-cyan-300/15 dark:bg-[#151a2c] dark:text-cyan-50"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-black">{option.label}</span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] font-bold opacity-70">
                      {option.code}
                    </span>
                  </span>
                  {deepSeekMode === option.value && (
                    <Sparkles size={15} className="shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-md border-2 border-[#26223a] bg-[#26223a] p-4 text-white shadow-[6px_6px_0_#ff7aa8] dark:border-cyan-300/20 dark:bg-[#0c1020] dark:shadow-[6px_6px_0_rgba(244,114,182,0.14)]">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase text-cyan-100">
              <Cloud size={16} />
              当前配置
            </h2>
            <div className="mt-4 space-y-2">
              <InfoRow label="Name" value={config.name || "Unset"} />
              <InfoRow label="Model" value={activeModel || "Unset"} />
              <InfoRow label="Key" value={hasConfig ? "Ready" : "Unset"} />
            </div>
          </section>

          <section className="rounded-md border-2 border-[#26223a] bg-white/90 p-4 shadow-[6px_6px_0_#7dd3fc] dark:border-cyan-300/20 dark:bg-white/5 dark:shadow-[6px_6px_0_rgba(244,114,182,0.14)]">
            <div className="grid aspect-square place-items-center rounded-md border-2 border-[#26223a] bg-[repeating-linear-gradient(0deg,rgba(125,211,252,0.22)_0_6px,transparent_6px_12px),repeating-linear-gradient(90deg,rgba(255,122,168,0.18)_0_5px,transparent_5px_14px),linear-gradient(135deg,rgba(255,207,86,0.62),rgba(255,122,168,0.42))] dark:border-cyan-300/20">
              <div className="w-[74%] -rotate-3 rounded-md border-2 border-[#26223a] bg-white/85 p-4 shadow-[8px_8px_0_rgba(34,38,58,0.25)] backdrop-blur dark:border-cyan-300/30 dark:bg-[#151a2c]">
                <div className="grid h-16 w-16 place-items-center rounded-md border-2 border-[#26223a] bg-[#ffcf56] text-[#26223a] shadow-[4px_4px_0_#ff7aa8]">
                  <BotMessageSquare size={30} />
                </div>
                <p className="mt-5 text-xl font-black text-[#22263a] dark:text-white">Moe Terminal</p>
                <p className="mt-2 truncate font-mono text-xs font-bold text-[#6c5a68] dark:text-cyan-50/60">
                  {activeModel || "standby"}
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {isMobilePanelOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#10131f]/50 backdrop-blur-sm"
            onClick={() => setIsMobilePanelOpen(false)}
            aria-label="关闭面板"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-ai-panel-title"
            className="absolute inset-x-0 bottom-0 max-h-[84dvh] overflow-hidden rounded-t-[28px] border-x-2 border-t-2 border-[#26223a] bg-[#fff9ec] text-[#26223a] shadow-[0_-8px_0_rgba(255,122,168,0.38)] dark:border-cyan-300/25 dark:bg-[#10131f] dark:text-cyan-50 dark:shadow-[0_-8px_0_rgba(103,232,249,0.12)]"
          >
            <div className="sticky top-0 z-10 border-b-2 border-[#26223a] bg-[#fff9ec]/96 px-4 pb-3 pt-2 backdrop-blur-xl dark:border-cyan-300/15 dark:bg-[#10131f]/96">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-[#26223a]/25 dark:bg-cyan-200/25" />
              <div className="mt-3 flex items-center gap-3">
                <div
                  id="mobile-ai-panel-title"
                  className="grid flex-1 grid-cols-2 rounded-full border border-[#22263a] bg-white p-1 text-xs font-black dark:border-cyan-300/20 dark:bg-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setMobilePanelView("history")}
                    className={`h-9 rounded-full transition ${
                      mobilePanelView === "history"
                        ? "bg-[#ffcf56] text-[#22263a] shadow-[2px_2px_0_#22263a] dark:bg-cyan-300 dark:shadow-none"
                        : "text-[#6c5a68] dark:text-cyan-50/60"
                    }`}
                  >
                    对话
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobilePanelView("settings")}
                    className={`h-9 rounded-full transition ${
                      mobilePanelView === "settings"
                        ? "bg-[#ffcf56] text-[#22263a] shadow-[2px_2px_0_#22263a] dark:bg-cyan-300 dark:shadow-none"
                        : "text-[#6c5a68] dark:text-cyan-50/60"
                    }`}
                  >
                    设置
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobilePanelOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#22263a] bg-white text-[#22263a] shadow-[2px_2px_0_#ff7aa8] dark:border-cyan-300/20 dark:bg-white/10 dark:text-cyan-50 dark:shadow-none"
                  aria-label="关闭"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-[calc(84dvh-5.75rem)] overflow-y-auto px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              {mobilePanelView === "history" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="flex items-center gap-2 text-sm font-black uppercase text-[#22263a] dark:text-cyan-100">
                      <History size={16} />
                      对话历史
                    </h2>
                    <div className="flex items-center gap-2">
                      {currentConversation && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsMobilePanelOpen(false);
                            setConversationPendingDelete(currentConversation);
                          }}
                          disabled={isDeletingConversation || isSending}
                          className="grid h-9 w-9 place-items-center rounded-full border border-[#22263a] bg-white text-[#22263a] transition active:translate-y-px disabled:opacity-50 dark:border-cyan-300/20 dark:bg-white/5 dark:text-cyan-50"
                          aria-label="删除当前对话"
                        >
                          {isDeletingConversation ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={createConversation}
                        disabled={isCreatingConversation}
                        className="grid h-9 w-9 place-items-center rounded-full border border-[#22263a] bg-[#ff7aa8] text-white shadow-[2px_2px_0_#22263a] transition active:translate-y-px disabled:opacity-50 dark:border-cyan-300/20 dark:bg-cyan-300 dark:text-[#10131f] dark:shadow-none"
                        aria-label="新建对话"
                      >
                        {isCreatingConversation ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    {isLoadingConversations ? (
                      <div className="rounded-xl border border-dashed border-cyan-200 bg-cyan-50/70 p-4 text-center text-xs font-black text-[#6c5a68] dark:border-cyan-300/20 dark:bg-cyan-300/5 dark:text-cyan-50/60">
                        云端同步中
                      </div>
                    ) : conversations.length > 0 ? (
                      conversations.map((conversation) => (
                        <ConversationItem
                          key={conversation.id}
                          conversation={conversation}
                          isActive={conversation.id === currentConversation?.id}
                          onSelect={() => void selectConversation(conversation, true)}
                        />
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-cyan-200 bg-cyan-50/70 p-4 text-center text-xs font-black text-[#6c5a68] dark:border-cyan-300/20 dark:bg-cyan-300/5 dark:text-cyan-50/60">
                        暂无云端历史
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <section className="rounded-2xl border-2 border-[#26223a] bg-white/90 p-3 shadow-[3px_3px_0_#7dd3fc] dark:border-cyan-300/20 dark:bg-white/5 dark:shadow-none">
                    <h2 className="flex items-center gap-2 text-sm font-black uppercase text-[#22263a] dark:text-cyan-100">
                      <Settings2 size={16} />
                      模型配置
                    </h2>
                    <div className="mt-3 flex items-center gap-2">
                      <select
                        value={selectedConfigValue}
                        onChange={(event) => void selectConfiguredModel(event.target.value)}
                        className="h-11 min-w-0 flex-1 rounded-xl border border-[#26223a] bg-[#f8fcff] px-3 font-mono text-xs font-black text-[#26223a] outline-none dark:border-cyan-300/30 dark:bg-[#151a2c] dark:text-cyan-50"
                      >
                        {!selectedConfigValue && (
                          <option value="">
                            {activeModel ? `${config.name || "本地配置"} / ${activeModel}` : "选择已配置模型"}
                          </option>
                        )}
                        {cloudConfigs.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name || "未命名配置"} / {item.model || "未选择模型"}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={refreshConfiguredModels}
                        disabled={isLoadingConfigs}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#26223a] bg-cyan-200 text-[#26223a] shadow-[2px_2px_0_#26223a] disabled:opacity-60 dark:border-cyan-300/30 dark:bg-cyan-300 dark:shadow-none"
                        aria-label="刷新已配置模型"
                      >
                        {isLoadingConfigs ? <Loader2 size={17} className="animate-spin" /> : <RefreshCw size={17} />}
                      </button>
                      <Link
                        href="/dashboard/ai/settings"
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#26223a] bg-[#ff7aa8] text-white shadow-[2px_2px_0_#26223a] dark:border-cyan-300/30 dark:bg-fuchsia-500 dark:shadow-none"
                        aria-label="AI 配置"
                      >
                        <Settings2 size={17} />
                      </Link>
                    </div>
                  </section>

                  <section className="rounded-2xl border-2 border-[#26223a] bg-white/90 p-3 shadow-[3px_3px_0_#ffcf56] dark:border-cyan-300/20 dark:bg-white/5 dark:shadow-none">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="flex items-center gap-2 text-sm font-black uppercase text-[#22263a] dark:text-cyan-100">
                        <FileText size={16} />
                        系统提示词
                      </h2>
                      {isSavingSystemPrompt && <Loader2 size={14} className="animate-spin text-cyan-500" />}
                    </div>
                    <textarea
                      value={systemPrompt}
                      onChange={(event) => updateSystemPromptDraft(event.target.value)}
                      onBlur={saveCurrentSystemPrompt}
                      className="mt-3 min-h-28 w-full resize-none rounded-xl border border-[#22263a] bg-[#fffaf1] px-3 py-2 text-xs font-bold leading-5 text-[#22263a] outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:border-cyan-300/20 dark:bg-[#151a2c] dark:text-cyan-50 dark:focus:ring-cyan-400/20"
                      placeholder="你是..."
                    />
                  </section>

                  <section className="rounded-2xl border-2 border-[#26223a] bg-white/90 p-3 shadow-[3px_3px_0_#7dd3fc] dark:border-cyan-300/20 dark:bg-white/5 dark:shadow-none">
                    <h2 className="flex items-center gap-2 text-sm font-black uppercase text-[#22263a] dark:text-cyan-100">
                      <BrainCircuit size={16} />
                      DeepSeek 模式
                    </h2>
                    <div className="mt-3 grid gap-2">
                      {DEEPSEEK_MODE_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => void selectDeepSeekMode(option.value)}
                          disabled={!isDeepSeekSelected || isSending}
                          className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3 text-left transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${
                            deepSeekMode === option.value
                              ? "border-[#22263a] bg-[#ffcf56] text-[#22263a] shadow-[2px_2px_0_#22263a] dark:border-cyan-200 dark:bg-cyan-300 dark:shadow-none"
                              : "border-cyan-100 bg-[#f8fcff] text-[#22263a] dark:border-cyan-300/15 dark:bg-[#151a2c] dark:text-cyan-50"
                          }`}
                        >
                          <span className="min-w-0">
                            <span className="block text-sm font-black">{option.label}</span>
                            <span className="mt-0.5 block truncate font-mono text-[10px] font-bold opacity-70">
                              {option.code}
                            </span>
                          </span>
                          {deepSeekMode === option.value && <Sparkles size={15} className="shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border-2 border-[#26223a] bg-[#26223a] p-3 text-white shadow-[3px_3px_0_#ff7aa8] dark:border-cyan-300/20 dark:bg-[#0c1020] dark:shadow-none">
                    <h2 className="flex items-center gap-2 text-sm font-black uppercase text-cyan-100">
                      <Cloud size={16} />
                      当前配置
                    </h2>
                    <div className="mt-3 space-y-2">
                      <InfoRow label="Name" value={config.name || "Unset"} />
                      <InfoRow label="Model" value={activeModel || "Unset"} />
                      <InfoRow label="Key" value={hasConfig ? "Ready" : "Unset"} />
                    </div>
                  </section>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {conversationPendingDelete && (
        <DeleteConversationDialog
          conversation={conversationPendingDelete}
          isDeleting={isDeletingConversation}
          onCancel={() => setConversationPendingDelete(null)}
          onConfirm={() => void deleteCurrentConversation()}
        />
      )}
    </div>
  );
}

async function readChatError(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = (await response.json()) as Partial<AiApiErrorResponse>;
    return data.error || "发送失败";
  }

  return (await response.text()) || "发送失败";
}

function parseChatStreamEvent(line: string): AiChatStreamEvent | null {
  if (!line) {
    return null;
  }

  try {
    const parsed = JSON.parse(line) as Record<string, unknown>;

    if (
      (parsed.type === "content" || parsed.type === "reasoning") &&
      typeof parsed.delta === "string"
    ) {
      return {
        type: parsed.type,
        delta: parsed.delta,
      };
    }

    if (
      parsed.type === "conversation" &&
      parsed.conversation &&
      typeof parsed.conversation === "object"
    ) {
      return {
        type: "conversation",
        conversation: parsed.conversation as AiChatConversation,
      };
    }
  } catch {
    return {
      type: "content",
      delta: line,
    };
  }

  return null;
}

function findConversationProviderConfig(
  conversation: AiChatConversation,
  configs: AiProviderConfig[],
) {
  if (conversation.providerConfigId) {
    const byId = configs.find((item) => item.id === conversation.providerConfigId);

    if (byId) {
      return byId;
    }
  }

  if (conversation.model) {
    return configs.find((item) => item.model === conversation.model);
  }

  return undefined;
}

function withConversationConfig(
  conversation: AiChatConversation,
  config: AiProviderConfig,
): AiChatConversation {
  return {
    ...conversation,
    providerConfigId: config.id ?? null,
    model: config.model,
    updatedAt: new Date().toISOString(),
  };
}

function withConversationDeepSeekMode(
  conversation: AiChatConversation,
  deepSeekMode: AiDeepSeekMode,
): AiChatConversation {
  return {
    ...conversation,
    deepSeekMode,
    updatedAt: new Date().toISOString(),
  };
}

function isDeepSeekModelName(model: string) {
  return model.toLowerCase().includes("deepseek");
}

function DeleteConversationDialog({
  conversation,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  conversation: AiChatConversation;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#10131f]/55 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-conversation-title"
        className="w-full max-w-md rounded-lg border border-[#22263a] bg-[#fffaf1] p-5 text-[#22263a] shadow-[8px_8px_0_#ff7aa8] dark:border-cyan-300/25 dark:bg-[#151a2c] dark:text-cyan-50 dark:shadow-[8px_8px_0_rgba(244,114,182,0.18)]"
      >
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-[#22263a] bg-[#ff7aa8] text-white shadow-[3px_3px_0_#22263a] dark:border-cyan-300/25 dark:bg-rose-500 dark:shadow-none">
            <Trash2 size={20} />
          </div>
          <div className="min-w-0">
            <h2 id="delete-conversation-title" className="text-lg font-black">
              删除这段对话？
            </h2>
            <p className="mt-1 break-words text-sm font-bold leading-6 text-[#6c5a68] dark:text-cyan-50/70">
              「{conversation.title}」和它的历史消息会从云端移除。
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#22263a] bg-white px-4 text-sm font-black text-[#22263a] transition hover:-translate-y-0.5 disabled:opacity-60 dark:border-cyan-300/25 dark:bg-white/5 dark:text-cyan-50"
          >
            保留
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#22263a] bg-[#ff7aa8] px-4 text-sm font-black text-white shadow-[3px_3px_0_#22263a] transition hover:-translate-y-0.5 disabled:opacity-60 dark:border-cyan-300/25 dark:bg-rose-500 dark:shadow-none"
          >
            {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            确认删除
          </button>
        </div>
      </section>
    </div>
  );
}

function ConversationItem({
  conversation,
  isActive,
  onSelect,
}: {
  conversation: AiChatConversation;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-md border px-3 py-2 text-left transition hover:-translate-y-0.5 ${
        isActive
          ? "border-[#22263a] bg-[#ffcf56] text-[#22263a] shadow-[3px_3px_0_#22263a] dark:border-cyan-200 dark:bg-cyan-300 dark:shadow-none"
          : "border-cyan-100 bg-[#f8fcff] text-[#22263a] hover:border-[#22263a] dark:border-cyan-300/15 dark:bg-[#151a2c] dark:text-cyan-50"
      }`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-md border border-[#22263a] bg-white/70 dark:border-cyan-300/20 dark:bg-white/10">
        <MessageSquareText size={15} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-black">{conversation.title}</span>
        <span className="mt-0.5 block truncate font-mono text-[10px] font-bold opacity-70">
          {conversation.model || "no-model"} · {formatConversationTime(conversation)}
        </span>
      </span>
    </button>
  );
}

function formatConversationTime(conversation: AiChatConversation) {
  const value = conversation.lastMessageAt || conversation.updatedAt || conversation.createdAt;

  if (!value) {
    return "未开始";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3 rounded-md border border-white/10 bg-white/10 px-3 py-2">
      <span className="text-xs uppercase text-cyan-100/60">{label}</span>
      <span className="truncate font-mono text-xs font-black text-white">{value}</span>
    </div>
  );
}

function ChatBubble({ message }: { message: AiChatMessage }) {
  const isUser = message.role === "user";
  const hasReasoning = !isUser && Boolean(message.reasoningContent?.trim());

  return (
    <div className={`flex items-start gap-2 md:gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#22263a] md:h-9 md:w-9 md:rounded-md ${
          isUser
            ? "bg-[#7dd3fc] text-[#22263a]"
            : "bg-[#ffcf56] text-[#22263a] dark:border-cyan-300/30"
        }`}
      >
        {isUser ? <UserRound size={17} /> : <BotMessageSquare size={17} />}
      </div>
      <article
        className={`max-w-[min(720px,84%)] rounded-2xl border px-3 py-2.5 shadow-sm md:rounded-lg md:px-4 md:py-3 ${
          isUser
            ? "border-[#22263a] bg-[#22263a] text-white"
            : "border-cyan-200 bg-cyan-50 text-[#22263a] dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-50"
        }`}
      >
        {hasReasoning && <ReasoningPanel content={message.reasoningContent || ""} />}
        {message.content ? (
          <p className="whitespace-pre-wrap break-words text-[13px] font-semibold leading-6 md:text-sm">{message.content}</p>
        ) : (
          <span className="inline-flex items-center gap-2 text-[13px] font-black leading-6 md:text-sm">
            <Loader2 size={15} className="animate-spin" />
            {hasReasoning ? "正在整理回答" : "思考中"}
          </span>
        )}
      </article>
    </div>
  );
}

function ReasoningPanel({ content }: { content: string }) {
  return (
    <details
      open
      className="group mb-3 overflow-hidden rounded-md border border-[#22263a]/15 bg-white/70 dark:border-cyan-300/20 dark:bg-[#0c1020]/70"
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-xs font-black uppercase text-[#6c5a68] outline-none transition hover:bg-cyan-100/60 dark:text-cyan-100 dark:hover:bg-cyan-300/10 [&::-webkit-details-marker]:hidden">
        <BrainCircuit size={14} />
        思考过程
        <ChevronDown size={14} className="ml-auto transition group-open:rotate-180" />
      </summary>
      <div className="max-h-56 overflow-y-auto border-t border-[#22263a]/10 px-3 py-2 dark:border-cyan-300/10">
        <p className="whitespace-pre-wrap break-words font-mono text-xs font-semibold leading-5 text-[#5d5260] dark:text-cyan-50/70">
          {content}
        </p>
      </div>
    </details>
  );
}

function AnimeBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(38,34,58,0.16)_1px,transparent_0)] bg-[size:14px_14px] opacity-70 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(103,232,249,0.16)_1px,transparent_0)]" />
      <div className="absolute inset-x-[-15%] top-12 h-32 -rotate-6 bg-[repeating-linear-gradient(90deg,transparent_0_18px,rgba(255,122,168,0.26)_18px_22px,transparent_22px_42px)]" />
      <div className="absolute left-0 top-0 h-52 w-80 -translate-x-20 -translate-y-10 rotate-[-10deg] bg-[repeating-linear-gradient(45deg,rgba(255,214,87,0.62)_0_9px,transparent_9px_18px)]" />
      <div className="absolute bottom-0 right-0 h-56 w-80 translate-x-20 translate-y-8 rotate-12 bg-[repeating-linear-gradient(135deg,rgba(125,211,252,0.42)_0_8px,transparent_8px_16px)]" />
      <div className="absolute right-8 top-20 hidden rotate-6 border-2 border-[#26223a] bg-white/70 px-4 py-2 font-mono text-xs font-black uppercase text-[#26223a] shadow-[4px_4px_0_#ff7aa8] dark:border-cyan-200 dark:bg-[#151a2c]/80 dark:text-cyan-50 lg:block">
        ON AIR
      </div>
    </div>
  );
}
