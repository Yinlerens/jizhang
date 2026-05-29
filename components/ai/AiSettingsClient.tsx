"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Cloud,
  Download,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Server,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
  defaultAiConfig,
  maskApiKey,
  readAiConfig,
  writeAiConfig,
} from "@/components/ai/ai-storage";
import {
  createCloudAiConfig,
  deleteCloudAiConfig,
  loadCloudAiConfig,
  updateCloudAiConfig,
} from "@/lib/ai/cloud-config";
import type {
  AiApiErrorResponse,
  AiCloudConfigResponse,
  AiModelInfo,
  AiModelsResponse,
  AiProviderConfig,
} from "@/lib/ai/types";

export default function AiSettingsClient() {
  const [config, setConfig] = useState<AiProviderConfig>(() => createBlankConfig(1));
  const [cloudConfigs, setCloudConfigs] = useState<AiProviderConfig[]>([]);
  const [models, setModels] = useState<AiModelInfo[]>([]);
  const [showKey, setShowKey] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isCreatingCloud, setIsCreatingCloud] = useState(false);
  const [isUpdatingCloud, setIsUpdatingCloud] = useState(false);
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);
  const [isDeletingCloud, setIsDeletingCloud] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<string>("");

  useEffect(() => {
    const localConfig = readAiConfig();

    setConfig(localConfig);
    void loadCloudAiConfig(localConfig.id)
      .then((data) => {
        const nextConfig = applyCloudResponse(data, localConfig.id, localConfig);

        if (nextConfig) {
          writeAiConfig(nextConfig);
        }
      })
      .catch(() => undefined);
  }, []);

  const selectedModel = useMemo(
    () => models.find((model) => model.id === config.model),
    [config.model, models],
  );
  const hasCloudKey = Boolean(config.id && config.hasCloudApiKey);
  const canCreate = Boolean(config.name?.trim() && (config.apiKey.trim() || hasCloudKey));
  const canUpdate = Boolean(config.id && config.name?.trim() && (config.apiKey.trim() || config.hasCloudApiKey));

  const applyCloudResponse = (
    data: AiCloudConfigResponse,
    preferredId?: string,
    fallback?: AiProviderConfig,
  ) => {
    const configs = data.configs ?? [];
    const nextConfig =
      (preferredId ? configs.find((item) => item.id === preferredId) : null) ??
      data.config ??
      configs[0] ??
      fallback;

    setCloudConfigs(configs);

    if (nextConfig) {
      setConfig(nextConfig);
    }

    return nextConfig;
  };

  const patchConfig = (patch: Partial<AiProviderConfig>) => {
    setConfig((current) => ({ ...current, ...patch }));
  };

  const startBlankConfig = () => {
    const nextConfig = createBlankConfig(cloudConfigs.length + 1);

    setConfig(nextConfig);
    setModels([]);
    writeAiConfig(nextConfig);
  };

  const chooseCloudConfig = (nextConfig: AiProviderConfig) => {
    setConfig(nextConfig);
    setModels([]);
    writeAiConfig(nextConfig);
    toast.success("已切换配置");
  };

  const createConfig = async () => {
    if (!validateConfig("create")) {
      return;
    }

    setIsCreatingCloud(true);

    try {
      const sourceId = config.apiKey.trim() ? undefined : config.id;
      const data = await createCloudAiConfig(toCreatePayload(config), sourceId);
      const nextConfig = applyCloudResponse(data, data.config?.id);

      if (nextConfig) {
        writeAiConfig(nextConfig);
      }

      toast.success("配置已新增");
    } catch (error) {
      toast.error(toCloudErrorMessage(error));
    } finally {
      setIsCreatingCloud(false);
    }
  };

  const updateConfig = async () => {
    if (!validateConfig("update")) {
      return;
    }

    setIsUpdatingCloud(true);

    try {
      const data = await updateCloudAiConfig(toUpdatePayload(config));
      const nextConfig = applyCloudResponse(data, config.id);

      if (nextConfig) {
        writeAiConfig(nextConfig);
      }

      toast.success("配置已更新");
    } catch (error) {
      toast.error(toCloudErrorMessage(error));
    } finally {
      setIsUpdatingCloud(false);
    }
  };

  const loadFromCloud = async () => {
    setIsLoadingCloud(true);

    try {
      const data = await loadCloudAiConfig(config.id);
      const nextConfig = applyCloudResponse(data, config.id);

      if (!nextConfig) {
        toast.info("云端还没有 AI 配置");
        return;
      }

      writeAiConfig(nextConfig);
      toast.success("已刷新云端配置");
    } catch (error) {
      toast.error(toCloudErrorMessage(error));
    } finally {
      setIsLoadingCloud(false);
    }
  };

  const deleteFromCloud = async () => {
    if (!config.id) {
      toast.error("请选择要删除的配置");
      return;
    }

    setIsDeletingCloud(true);

    try {
      const data = await deleteCloudAiConfig(config.id);
      const nextConfig = applyCloudResponse(data) ?? createBlankConfig(1);

      setModels([]);
      writeAiConfig(nextConfig);
      toast.success("配置已删除");
    } catch (error) {
      toast.error(toCloudErrorMessage(error));
    } finally {
      setIsDeletingCloud(false);
    }
  };

  const detectModels = async () => {
    if (!config.apiKey.trim() && !config.hasCloudApiKey) {
      toast.error("请先填写 API Key");
      return;
    }

    setIsDetecting(true);

    try {
      const response = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = (await response.json()) as AiModelsResponse | AiApiErrorResponse;

      if (!response.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "模型检测失败");
      }

      const nextModel = config.model || data.models[0]?.id || "";
      const nextConfig = { ...config, model: nextModel };

      setModels(data.models);
      setConfig(nextConfig);
      writeAiConfig(nextConfig);
      setLastCheckedAt(new Date().toLocaleString("zh-CN", { hour12: false }));
      toast.success(`检测到 ${data.models.length} 个模型`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "模型检测失败");
    } finally {
      setIsDetecting(false);
    }
  };

  const chooseModel = (modelId: string) => {
    const nextConfig = { ...config, model: modelId };

    setConfig(nextConfig);
    writeAiConfig(nextConfig);
    toast.success("默认模型已更新");
  };

  const validateConfig = (mode: "create" | "update") => {
    if (!config.name?.trim()) {
      toast.error("请填写配置名称");
      return false;
    }

    if (mode === "update" && !config.id) {
      toast.error("请选择要更新的配置");
      return false;
    }

    if (!config.apiKey.trim() && !config.hasCloudApiKey) {
      toast.error(mode === "create" ? "新增配置需要填写 API Key" : "请先填写 API Key");
      return false;
    }

    return true;
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-md border-2 border-[#26223a] bg-[#fff9ec] text-[#26223a] shadow-[8px_8px_0_#7dd3fc] dark:border-cyan-400/25 dark:bg-[#11131f] dark:text-cyan-50 dark:shadow-[8px_8px_0_rgba(244,114,182,0.14)]">
      <AnimeBackdrop />

      <div className="relative z-10 space-y-6 p-4 md:p-6">
        <header className="flex flex-col gap-4 border-b-2 border-[#26223a] bg-[#fff1f6]/65 p-4 dark:border-cyan-400/20 dark:bg-white/5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex h-8 items-center gap-2 rounded-md border-2 border-[#26223a] bg-cyan-100 px-3 text-xs font-black uppercase text-cyan-900 shadow-[4px_4px_0_#f9a8d4] dark:border-cyan-300/50 dark:bg-cyan-300/10 dark:text-cyan-100">
              <Sparkles size={14} />
              AI Dock
            </div>
            <h1 className="anime-display mt-4 text-4xl font-black text-[#26223a] dark:text-cyan-50 md:text-5xl">
              星糖配置舱
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={startBlankConfig}
              className="inline-flex h-10 items-center gap-2 rounded-md border-2 border-[#26223a] bg-white px-4 text-sm font-black text-[#26223a] transition hover:-translate-y-0.5 dark:border-cyan-200 dark:bg-white/5 dark:text-cyan-50"
            >
              <Pencil size={16} />
              空白新建
            </button>
            <button
              type="button"
              onClick={loadFromCloud}
              disabled={isLoadingCloud}
              className="inline-flex h-10 items-center gap-2 rounded-md border-2 border-[#26223a] bg-[#d9f99d] px-4 text-sm font-black text-[#26223a] shadow-[4px_4px_0_#26223a] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-cyan-200 dark:bg-lime-300 dark:shadow-[4px_4px_0_#0e7490]"
            >
              {isLoadingCloud ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              刷新云端
            </button>
            <button
              type="button"
              onClick={detectModels}
              disabled={isDetecting}
              className="inline-flex h-10 items-center gap-2 rounded-md border-2 border-[#26223a] bg-[#ffcf56] px-4 text-sm font-black text-[#26223a] shadow-[4px_4px_0_#26223a] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-cyan-200 dark:bg-cyan-300 dark:shadow-[4px_4px_0_#0e7490]"
            >
              {isDetecting ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              检测模型
            </button>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="rounded-md border-2 border-[#26223a] bg-[#26223a] p-4 text-white shadow-[6px_6px_0_#ffcf56] dark:border-cyan-300/30 dark:bg-[#0c1020] dark:shadow-[6px_6px_0_rgba(34,211,238,0.2)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-black">
                  <Cloud size={20} />
                  云端配置
                </h2>
                <p className="mt-1 font-mono text-xs font-bold text-cyan-100/60">
                  {cloudConfigs.length} configs
                </p>
              </div>
              <div className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-black text-cyan-100">
                Supabase
              </div>
            </div>

            <div className="mt-4 grid max-h-[620px] gap-2 overflow-y-auto pr-1">
              {cloudConfigs.length === 0 ? (
                <div className="rounded-lg border border-dashed border-white/25 bg-white/10 p-5 text-center text-sm font-bold text-cyan-100/70">
                  还没有配置
                </div>
              ) : (
                cloudConfigs.map((item) => {
                  const active = item.id === config.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => chooseCloudConfig(item)}
                      className={`flex min-h-20 items-center justify-between gap-3 rounded-lg border p-3 text-left transition hover:-translate-y-0.5 ${
                        active
                          ? "border-[#ffcf56] bg-[#ffcf56] text-[#27213c] shadow-[4px_4px_0_#ff7aa8]"
                          : "border-white/15 bg-white/10 text-white hover:border-cyan-200"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black">
                          {item.name || "未命名配置"}
                        </span>
                        <span
                          className={`mt-1 block truncate font-mono text-xs font-bold ${
                            active ? "text-[#5b4b2d]" : "text-cyan-100/60"
                          }`}
                        >
                          {item.model || item.baseUrl}
                        </span>
                        <span
                          className={`mt-1 block text-xs font-bold ${
                            active ? "text-[#6b3150]" : "text-rose-100/60"
                          }`}
                        >
                          {formatUpdatedAt(item.updatedAt)}
                        </span>
                      </span>
                      {active && <CheckCircle2 className="shrink-0 text-emerald-700" size={18} />}
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <main className="min-w-0 space-y-5">
            <section className="rounded-md border-2 border-[#26223a] bg-white/90 p-4 shadow-[6px_6px_0_#f9a8d4] dark:border-cyan-300/30 dark:bg-white/5 dark:shadow-[6px_6px_0_rgba(244,114,182,0.16)]">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-black text-[#27213c] dark:text-white">
                    <Sparkles size={21} />
                    {config.id ? "编辑当前配置" : "新配置草稿"}
                  </h2>
                  <p className="mt-1 font-mono text-xs font-bold text-[#7d6471] dark:text-cyan-50/60">
                    {config.id || "draft"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusPill label="Key" value={config.apiKey ? maskApiKey(config.apiKey) : hasCloudKey ? "Cloud" : "Unset"} />
                  <StatusPill label="Model" value={selectedModel?.id || config.model || "Unset"} />
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                <label className="block">
                  <span className="flex items-center gap-2 text-xs font-black uppercase text-[#6b4a5f] dark:text-cyan-100">
                    <Sparkles size={15} />
                    配置名称
                  </span>
                  <input
                    value={config.name || ""}
                    onChange={(event) => patchConfig({ name: event.target.value })}
                    className="mt-3 h-12 w-full rounded-md border border-rose-200 bg-[#fffaf1] px-3 text-sm font-black text-[#27213c] outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:border-cyan-300/20 dark:bg-[#151a2c] dark:text-cyan-50 dark:focus:ring-cyan-400/20"
                    placeholder="OpenAI / DeepSeek"
                    maxLength={64}
                  />
                </label>

                <label className="block">
                  <span className="flex items-center gap-2 text-xs font-black uppercase text-[#6b4a5f] dark:text-cyan-100">
                    <Server size={15} />
                    Base URL
                  </span>
                  <input
                    value={config.baseUrl}
                    onChange={(event) => patchConfig({ baseUrl: event.target.value })}
                    className="mt-3 h-12 w-full rounded-md border border-rose-200 bg-[#fffaf1] px-3 font-mono text-sm font-semibold text-[#27213c] outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:border-cyan-300/20 dark:bg-[#151a2c] dark:text-cyan-50 dark:focus:ring-cyan-400/20"
                    placeholder="https://api.openai.com/v1"
                    spellCheck={false}
                  />
                </label>

                <label className="block">
                  <span className="flex items-center gap-2 text-xs font-black uppercase text-[#6b4a5f] dark:text-cyan-100">
                    <KeyRound size={15} />
                    API Key
                  </span>
                  <div className="mt-3 flex h-12 overflow-hidden rounded-md border border-rose-200 bg-[#fffaf1] focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-200 dark:border-cyan-300/20 dark:bg-[#151a2c] dark:focus-within:ring-cyan-400/20">
                    <input
                      value={config.apiKey}
                      onChange={(event) => patchConfig({ apiKey: event.target.value })}
                      className="min-w-0 flex-1 bg-transparent px-3 font-mono text-sm font-semibold text-[#27213c] outline-none dark:text-cyan-50"
                      type="text"
                      style={showKey ? undefined : ({ WebkitTextSecurity: "disc" } as CSSProperties)}
                      placeholder={hasCloudKey ? "已保存云端密钥" : "sk-..."}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey((value) => !value)}
                      className="grid w-11 place-items-center text-[#6b4a5f] transition hover:bg-rose-100 dark:text-cyan-100 dark:hover:bg-cyan-300/10"
                      aria-label={showKey ? "隐藏 API Key" : "显示 API Key"}
                    >
                      {showKey ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </label>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-rose-100 pt-4 dark:border-cyan-300/10">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={createConfig}
                    disabled={!canCreate || isCreatingCloud}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-[#27213c] bg-[#ff7aa8] px-4 text-sm font-black text-white shadow-[4px_4px_0_#27213c] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-cyan-200 dark:bg-fuchsia-500 dark:shadow-[4px_4px_0_#0e7490]"
                  >
                    {isCreatingCloud ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                    新增配置
                  </button>
                  <button
                    type="button"
                    onClick={updateConfig}
                    disabled={!canUpdate || isUpdatingCloud}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-[#27213c] bg-[#ffcf56] px-4 text-sm font-black text-[#27213c] shadow-[4px_4px_0_#27213c] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-cyan-200 dark:bg-cyan-300 dark:shadow-[4px_4px_0_#0e7490]"
                  >
                    {isUpdatingCloud ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    更新当前
                  </button>
                </div>
                <button
                  type="button"
                  onClick={deleteFromCloud}
                  disabled={isDeletingCloud || !config.id}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-[#27213c] bg-white px-4 text-sm font-black text-[#27213c] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-cyan-200 dark:bg-white/5 dark:text-cyan-50"
                >
                  {isDeletingCloud ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  删除当前
                </button>
              </div>
            </section>

            <section className="rounded-md border-2 border-[#26223a] bg-white/90 p-4 shadow-[6px_6px_0_#7dd3fc] dark:border-cyan-300/30 dark:bg-white/5 dark:shadow-[6px_6px_0_rgba(14,116,144,0.34)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#27213c] dark:text-white">模型列表</h2>
                  <p className="mt-1 text-xs font-bold text-[#7d6471] dark:text-cyan-50/60">
                    {lastCheckedAt ? `Last scan ${lastCheckedAt}` : "Ready"}
                  </p>
                </div>
                <div className="rounded-md border border-rose-200 bg-[#fffaf1] px-3 py-2 text-xs font-black text-[#6b4a5f] dark:border-cyan-300/20 dark:bg-[#151a2c] dark:text-cyan-100">
                  {models.length ? `${models.length} Models` : "No Scan"}
                </div>
              </div>

              <div className="mt-4 grid max-h-[480px] gap-2 overflow-y-auto pr-1 md:grid-cols-2">
                {models.length === 0 ? (
                  <div className="md:col-span-2 rounded-lg border border-dashed border-rose-300 bg-rose-50/60 p-6 text-center text-sm font-bold text-[#7d6471] dark:border-cyan-300/20 dark:bg-cyan-300/5 dark:text-cyan-50/60">
                    未检测模型
                  </div>
                ) : (
                  models.map((model) => {
                    const active = model.id === config.model;

                    return (
                      <button
                        type="button"
                        key={model.id}
                        onClick={() => chooseModel(model.id)}
                        className={`flex min-h-16 items-center justify-between gap-3 rounded-lg border p-3 text-left transition hover:-translate-y-0.5 ${
                          active
                            ? "border-[#27213c] bg-[#d9f99d] shadow-[4px_4px_0_#27213c] dark:border-cyan-200 dark:bg-cyan-300/20 dark:shadow-[4px_4px_0_rgba(34,211,238,0.22)]"
                            : "border-rose-200 bg-[#fffaf1] hover:border-[#27213c] dark:border-cyan-300/20 dark:bg-[#151a2c] dark:hover:border-cyan-200"
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-mono text-sm font-black text-[#27213c] dark:text-white">
                            {model.id}
                          </span>
                          <span className="mt-1 block truncate text-xs font-bold text-[#7d6471] dark:text-cyan-50/60">
                            {model.ownedBy || "unknown"}
                          </span>
                        </span>
                        {active && <CheckCircle2 className="shrink-0 text-emerald-600" size={18} />}
                      </button>
                    );
                  })
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function createBlankConfig(index: number): AiProviderConfig {
  return {
    ...defaultAiConfig,
    id: undefined,
    name: `配置 ${index}`,
    apiKey: "",
    hasCloudApiKey: false,
    updatedAt: undefined,
  };
}

function toCreatePayload(config: AiProviderConfig): AiProviderConfig {
  return {
    name: config.name?.trim(),
    baseUrl: config.baseUrl,
    apiKey: config.apiKey,
    model: config.model,
  };
}

function toUpdatePayload(config: AiProviderConfig): AiProviderConfig {
  return {
    ...toCreatePayload(config),
    id: config.id,
    hasCloudApiKey: config.hasCloudApiKey,
  };
}

function formatUpdatedAt(value?: string) {
  if (!value) {
    return "not synced";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("zh-CN", { hour12: false });
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-32 grid-cols-[42px_minmax(0,1fr)] items-center gap-2 rounded-md border border-rose-200 bg-[#fffaf1] px-3 py-2 dark:border-cyan-300/20 dark:bg-[#151a2c]">
      <span className="text-xs font-black uppercase text-[#9a657a] dark:text-cyan-100/60">{label}</span>
      <span className="truncate font-mono text-xs font-black text-[#27213c] dark:text-white">{value}</span>
    </div>
  );
}

function AnimeBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(38,34,58,0.14)_1px,transparent_0)] bg-[size:14px_14px] opacity-70 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(103,232,249,0.16)_1px,transparent_0)]" />
      <div className="absolute inset-x-[-10%] top-20 h-24 rotate-3 bg-[repeating-linear-gradient(90deg,transparent_0_16px,rgba(125,211,252,0.28)_16px_20px,transparent_20px_40px)]" />
      <div className="absolute right-0 top-0 h-56 w-64 translate-x-16 -translate-y-10 rotate-12 bg-[repeating-linear-gradient(135deg,rgba(255,207,86,0.56)_0_10px,transparent_10px_20px)]" />
      <div className="absolute bottom-0 left-0 h-44 w-80 -translate-x-16 translate-y-10 -rotate-6 bg-[repeating-linear-gradient(45deg,rgba(255,122,168,0.34)_0_8px,transparent_8px_16px)]" />
      <div className="absolute left-8 top-28 hidden -rotate-6 border-2 border-[#26223a] bg-white/75 px-4 py-2 font-mono text-xs font-black uppercase text-[#26223a] shadow-[4px_4px_0_#7dd3fc] dark:border-cyan-200 dark:bg-[#151a2c]/80 dark:text-cyan-50 lg:block">
        CONFIG READY
      </div>
    </div>
  );
}

function toCloudErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "云端同步失败";

  if (
    message.includes("ai_provider_configs") &&
    (message.includes("does not exist") || message.includes("Could not find"))
  ) {
    return "云端表不存在，请先执行 Supabase migration";
  }

  return message;
}
