"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ConfigProvider, Drawer, Tag } from "antd";
import { toast } from "sonner";
import { drawGachaPull, type PullGachaActionResult } from "./gacha/actions";
import {
  Clock3,
  Crosshair,
  FileText,
  Gem,
  History,
  LogIn,
  Plus,
  Search,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";
import {
  ASTRITE_PER_PULL,
  GACHA_STORAGE_KEY,
  createInitialGachaState,
  getFeaturedRuleForRarity,
  getRarityRule,
  getPullCapacity,
  isFeaturedGuaranteeActive,
  normalizeGachaState,
} from "@/lib/gacha/simulator";
import type {
  Banner,
  BannerPoolEntry,
  GachaItem,
  PullRecord,
  StoredGachaState,
} from "@/lib/gacha/types";

type SuccessfulPullResult = Extract<PullGachaActionResult, { ok: true }>;
type GatewayPullResultRecord = SuccessfulPullResult["records"][number];

export type GachaExperienceProps = {
  banners: Banner[];
  items: GachaItem[];
  dataSource: "supabase";
  initialBalanceMinor?: number;
};

const theme = {
  token: {
    colorPrimary: "#d9b268",
    borderRadius: 8,
    fontFamily: "var(--font-sans), Microsoft YaHei, PingFang SC, sans-serif",
  },
};

export default function GachaExperience({
  banners,
  initialBalanceMinor,
  items,
}: GachaExperienceProps) {
  const [activeBannerId, setActiveBannerId] = useState(banners[0]?.id ?? "");
  const [state, setState] = useState<StoredGachaState>(() =>
    withGatewayBalance(createInitialGachaState(banners), initialBalanceMinor),
  );
  const [storageReady, setStorageReady] = useState(false);
  const [lastPulls, setLastPulls] = useState<PullRecord[]>([]);
  const [pullingCount, setPullingCount] = useState<1 | 10 | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const itemById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);
  const activeBanner = banners.find((banner) => banner.id === activeBannerId) ?? banners[0];
  const featuredItem = activeBanner?.featuredFiveId
    ? itemById.get(activeBanner.featuredFiveId)
    : activeBanner?.itemPool.map((id) => itemById.get(id)).find((item) => item?.rarity === 5);
  const bannerRules = activeBanner?.rarityRules ?? [];
  const activePity = activeBanner ? state.pity[activeBanner.id] : undefined;
  const fiveRule = activeBanner ? getRarityRule(activeBanner, 5) : undefined;
  const fourRule = activeBanner ? getRarityRule(activeBanner, 4) : undefined;
  const featuredFiveRule = activeBanner ? getFeaturedRuleForRarity(activeBanner, 5) : undefined;
  const featuredGuaranteeActive = isFeaturedGuaranteeActive(activePity, featuredFiveRule);
  const hasDrawableConfig = Boolean(
    activeBanner?.itemPool.length && activeBanner.rarityRules.length,
  );
  const pullCapacity = getPullCapacity(state);
  const isPulling = pullingCount !== null;
  const featuredFourEntries =
    activeBanner?.poolEntries.filter((entry) => entry.featuredGroup === "four_up").slice(0, 4) ??
    [];
  const recentResults = lastPulls.length ? lastPulls : state.history.slice(0, 6);

  useEffect(() => {
    let cancelled = false;

    const frameId = window.requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }

      try {
        const stored = window.localStorage.getItem(GACHA_STORAGE_KEY);
        setState(
          withGatewayBalance(
            normalizeGachaState(stored ? JSON.parse(stored) : null, banners),
            initialBalanceMinor,
          ),
        );
      } catch {
        setState(withGatewayBalance(createInitialGachaState(banners), initialBalanceMinor));
      } finally {
        setStorageReady(true);
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [banners, initialBalanceMinor]);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    window.localStorage.setItem(GACHA_STORAGE_KEY, JSON.stringify(state));
  }, [state, storageReady]);

  const pull = async (count: 1 | 10) => {
    if (!activeBanner || isPulling) {
      return;
    }

    if (!hasDrawableConfig) {
      toast.warning("当前卡池配置不完整，暂不能抽取。");
      return;
    }

    if (pullCapacity < count) {
      toast.warning("星声不足，请先充值。");
      return;
    }

    const bannerId = activeBanner.id;
    setPullingCount(count);

    try {
      const result = await drawGachaPull({
        bannerId,
        count,
      });

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      const pulledAt = new Date().toISOString();
      const records = result.records.map((record) => mapGatewayPullRecord(record, pulledAt));
      setLastPulls(records);
      setState((currentState) =>
        applyGatewayPullResult({
          bannerId,
          count,
          currentState,
          nextPity: result.nextPity,
          records,
        }),
      );
      toast.success(`共鸣完成，获得 ${records.length} 项结果。`);
    } catch {
      toast.error("抽取失败，请稍后重试。");
    } finally {
      setPullingCount(null);
    }
  };

  const clearRecentResults = () => {
    setLastPulls([]);
  };

  if (!activeBanner) {
    return (
      <div className="flex h-[100svh] flex-col items-center justify-center gap-4 overflow-hidden bg-[#07090d] px-6 text-center text-white">
        <div>
          <div className="text-2xl font-black">暂无可用卡池</div>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/55">
            请在配置页启用卡池、发布档期，并为该档期配置卡池内容和概率规则。
          </p>
        </div>
        <Link
          className="border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold transition hover:border-white/30 hover:bg-white/15"
          href="/admin/gacha/banners"
        >
          去配置卡池
        </Link>
      </div>
    );
  }

  const desktopBackgroundStyle = backgroundImageStyle(
    activeBanner.backgroundImageUrl,
    activeBanner.backgroundPosition,
  );
  const mobileBackgroundStyle = backgroundImageStyle(
    activeBanner.mobileBackgroundImageUrl ?? activeBanner.backgroundImageUrl,
    activeBanner.backgroundPosition,
  );

  return (
    <ConfigProvider theme={theme}>
      <main
        className="relative flex h-[100svh] min-h-0 flex-col overflow-hidden bg-[#07090d] text-white"
        style={
          {
            "--banner-primary": activeBanner.theme.primary,
            "--banner-secondary": activeBanner.theme.secondary,
            "--banner-glow": activeBanner.theme.glow,
          } as CSSProperties
        }
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_63%_28%,rgba(225,235,255,0.18),transparent_28%),radial-gradient(circle_at_86%_42%,var(--banner-glow),transparent_32%),linear-gradient(110deg,#080a0f_0%,#111722_36%,#202838_62%,#0a0d13_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center md:hidden"
          style={mobileBackgroundStyle}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden bg-cover bg-center md:block"
          style={desktopBackgroundStyle}
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.58)_22%,rgba(0,0,0,0.12)_58%,rgba(0,0,0,0.58)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:120px_120px]" />

        <header className="relative z-20 flex h-14 shrink-0 items-center justify-between px-4 sm:h-16 lg:h-20 lg:px-8">
          <div className="min-w-36">
            <div className="text-2xl font-black leading-none tracking-normal text-white lg:text-4xl">
              鸣潮
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] text-white/55 lg:text-[10px] lg:tracking-[0.38em]">
              Wuthering Waves
            </div>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <CurrencyPill
              href="/recharge"
              icon={<Sparkles size={18} />}
              value={state.currencies.astrite}
            />
          </div>
          <div className="flex items-center gap-3">
            <Link
              aria-label="配置卡池"
              className="flex h-10 w-10 items-center justify-center border border-white/12 bg-black/28 text-white/80 transition hover:border-white/35 hover:bg-white/10 lg:h-11 lg:w-11"
              href="/admin/gacha/items"
            >
              <Settings2 size={19} />
            </Link>
            <Link
              aria-label="登录"
              className="flex h-10 w-10 items-center justify-center border border-white/12 bg-black/28 text-white/80 transition hover:border-white/35 hover:bg-white/10 lg:h-11 lg:w-11"
              href="/login?next=/admin/gacha/items"
            >
              <LogIn size={19} />
            </Link>
            <button
              aria-label="关闭"
              className="hidden h-11 w-11 items-center justify-center text-white/80 transition hover:text-white md:flex"
              type="button"
            >
              <X size={30} />
            </button>
          </div>
        </header>

        <section className="relative z-10 grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-3 overflow-hidden px-3 pb-3 lg:grid-cols-[220px_minmax(0,1fr)] lg:grid-rows-1 lg:gap-5 lg:px-7 lg:pb-5">
          <aside className="flex min-h-0 flex-col border-white/10 lg:border-r lg:pr-7">
            <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:min-h-0 lg:flex-1 lg:auto-rows-min lg:gap-4 lg:overflow-x-hidden lg:overflow-y-auto lg:pr-1">
              {banners.map((banner) => (
                <button
                  aria-label={banner.name}
                  className={`h-20 w-[172px] shrink-0 overflow-hidden border bg-black/35 bg-cover bg-center text-left shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition lg:h-28 lg:w-auto ${
                    banner.id === activeBanner.id
                      ? "border-white/85 ring-2 ring-white/55"
                      : "border-white/24 hover:border-white/55"
                  }`}
                  key={banner.id}
                  onClick={() => setActiveBannerId(banner.id)}
                  style={backgroundImageStyle(banner.coverImageUrl)}
                  type="button"
                >
                  <span className="sr-only">{banner.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-auto hidden grid-cols-2 gap-8 pb-9 pl-10 pt-8 lg:grid">
              <IconLabel icon={<ShoppingCart size={29} />} label="商城兑换" />
              <IconLabel icon={<ShoppingBag size={29} />} label="共鸣商店" />
            </div>
          </aside>

          <section className="relative min-h-0 overflow-hidden">
            <div className="relative z-10 flex h-full min-h-0 flex-col justify-between overflow-hidden px-2 pb-2 pt-[clamp(0.75rem,3svh,3rem)] lg:px-0 lg:pb-3 lg:pl-9">
              <div className="min-h-0 max-w-[560px]">
                <div className="mb-[clamp(0.25rem,1svh,0.75rem)] flex items-center gap-2 text-sm font-bold text-[#f4d27a] lg:gap-3 lg:text-lg">
                  <span>✦</span>
                  <span>
                    {activeBanner.type === "limited-character" ? "角色活动共鸣" : "常驻活动共鸣"}
                  </span>
                  <span>✦</span>
                </div>
                <h1 className="font-[family-name:var(--font-banner-title)] text-[clamp(2.8rem,11svh,7.6rem)] font-normal leading-none text-white drop-shadow-[0_0_28px_rgba(165,205,255,0.36)]">
                  {activeBanner.name}
                </h1>
                <p className="mt-[clamp(0.45rem,1.7svh,1.25rem)] flex items-center gap-3 text-[clamp(1.25rem,4svh,2.25rem)] font-black text-white">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d9b268]/70 text-[#d9b268] lg:h-9 lg:w-9">
                    <Sparkles size={20} />
                  </span>
                  {featuredItem?.name ?? activeBanner.shortName}
                </p>
                <div className="mt-[clamp(0.35rem,1.4svh,1rem)] flex items-center gap-2 text-sm text-white/88 lg:text-lg">
                  <Clock3 size={20} />
                  <span>剩余时间：{activeBanner.endsAt}</span>
                </div>
                <div className="mt-[clamp(0.5rem,2svh,1.75rem)] space-y-1 text-[clamp(0.9rem,2.2svh,1.375rem)] font-medium leading-[1.45] text-white">
                  <p>
                    每<span className="text-[#f1ca6a]">10</span>次共鸣必得4星或以上内容
                  </p>
                  <p>
                    至多<span className="text-[#f1ca6a]">{fiveRule?.hardPity ?? "-"}</span>
                    次共鸣必得5星角色
                  </p>
                </div>

                <div className="mt-[clamp(0.5rem,1.6svh,1.25rem)] grid max-w-[520px] grid-cols-3 gap-2 text-xs font-bold text-white/86 lg:text-sm">
                  <div className="border border-white/15 bg-black/28 px-3 py-2">
                    <div className="text-white/52">5星保底</div>
                    <div className="mt-1 text-base text-[#f4d27a] lg:text-lg">
                      {activePity?.sinceFive ?? 0}/{fiveRule?.hardPity ?? "-"}
                    </div>
                  </div>
                  <div className="border border-white/15 bg-black/28 px-3 py-2">
                    <div className="text-white/52">4星保底</div>
                    <div className="mt-1 text-base text-[#f4d27a] lg:text-lg">
                      {activePity?.sinceFour ?? 0}/{fourRule?.hardPity ?? "-"}
                    </div>
                  </div>
                  <div className="border border-white/15 bg-black/28 px-3 py-2">
                    <div className="text-white/52">UP状态</div>
                    <div className="mt-1 truncate text-base text-[#f4d27a] lg:text-lg">
                      {featuredFiveRule
                        ? featuredGuaranteeActive
                          ? "必定UP"
                          : "概率UP"
                        : "未配置"}
                    </div>
                  </div>
                </div>

                <div className="mt-[clamp(0.5rem,2svh,2rem)] max-w-[390px] [@media(max-height:760px)]:hidden">
                  <div className="mb-2 text-base font-medium text-white lg:text-xl">
                    共鸣获得概率提升 ↑
                  </div>
                  <div className="space-y-1">
                    {bannerRules.slice(0, 3).map((rule) => (
                      <RateRow
                        key={rule.rarity}
                        label={`${rule.rarity}星内容概率`}
                        value={formatPpm(rule.baseRatePpm)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-[clamp(0.6rem,2svh,1.5rem)] flex gap-6 lg:gap-9 [@media(max-height:660px)]:hidden">
                  <RoundAction
                    icon={<FileText size={24} />}
                    label="详情"
                    onClick={() => setDetailsOpen(true)}
                  />
                  <RoundAction
                    icon={<History size={24} />}
                    label="记录"
                    onClick={() => setHistoryOpen(true)}
                  />
                  <RoundAction icon={<Crosshair size={24} />} label="清屏" onClick={clearRecentResults} />
                </div>
              </div>

              <div className="mt-3 flex shrink-0 flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 text-sm font-medium text-white/90 lg:text-lg">
                    以下4星角色出现概率提升
                  </div>
                  <div className="flex gap-3">
                    {featuredFourEntries.length > 0 ? (
                      featuredFourEntries.map((entry) => {
                        const item = itemById.get(entry.itemId);
                        return <FeaturedThumb item={item} key={entry.itemId} />;
                      })
                    ) : (
                      <FeaturedThumb />
                    )}
                  </div>
                </div>

                <div className="w-full max-w-[720px]">
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <PullButton
                    count={1}
                    disabled={isPulling || !hasDrawableConfig || pullCapacity < 1}
                    onClick={() => void pull(1)}
                    pending={pullingCount === 1}
                  />
                  <PullButton
                    count={10}
                    disabled={isPulling || !hasDrawableConfig || pullCapacity < 10}
                    onClick={() => void pull(10)}
                    pending={pullingCount === 10}
                  />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[23vh] right-[4vw] z-10 hidden min-w-[310px] border border-white/18 bg-black/42 shadow-[0_0_28px_rgba(255,255,255,0.12)] backdrop-blur-sm xl:block [@media(max-height:760px)]:hidden">
              <div className="grid grid-cols-[72px_1fr]">
                <div className="flex items-center justify-center bg-[#a8823d]">
                  <Sparkles size={39} />
                </div>
                <div className="px-5 py-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-3xl font-black">
                      {featuredItem?.name ?? activeBanner.shortName}
                    </div>
                    <div className="text-xl font-black text-[#f3d36f]">UP!</div>
                  </div>
                  <div className="mt-1 text-[#f3d36f]">★★★★★</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/12 px-4 py-2 text-lg text-white/78">
                <span>{featuredItem?.subtitle || activeBanner.description}</span>
                <Search size={26} />
              </div>
            </div>

            {recentResults.length > 0 && (
              <div className="absolute right-4 top-24 z-20 hidden w-64 space-y-2 rounded-none border border-white/12 bg-black/36 p-3 backdrop-blur-md 2xl:block">
                {recentResults.map((record) => (
                  <ResultChip item={itemById.get(record.itemId)} key={record.id} record={record} />
                ))}
              </div>
            )}
          </section>
        </section>

        <Drawer
          closable={{ "aria-label": "关闭" }}
          onClose={() => setDetailsOpen(false)}
          open={detailsOpen}
          size="large"
          title="卡池详情"
        >
          <div className="space-y-4">
            <p>{activeBanner.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {activeBanner.poolEntries.map((entry) => {
                const item = itemById.get(entry.itemId);
                return item ? <ItemCard entry={entry} item={item} key={entry.itemId} /> : null;
              })}
            </div>
          </div>
        </Drawer>

        <Drawer
          closable={{ "aria-label": "关闭" }}
          onClose={() => setHistoryOpen(false)}
          open={historyOpen}
          size="large"
          title="唤取历史"
        >
          <div className="space-y-2">
            {state.history.map((record) => (
              <ResultChip item={itemById.get(record.itemId)} key={record.id} record={record} wide />
            ))}
          </div>
        </Drawer>
      </main>
    </ConfigProvider>
  );
}

function CurrencyPill({ href, icon, value }: { href: string; icon: ReactNode; value: number }) {
  return (
    <div className="grid h-10 min-w-44 grid-cols-[42px_1fr_38px] items-center border border-white/18 bg-black/28 shadow-[inset_0_0_18px_rgba(255,255,255,0.06)]">
      <div className="flex items-center justify-center text-[#d9c17a]">{icon}</div>
      <div className="text-center text-xl font-medium">{value.toLocaleString("zh-CN")}</div>
      <Link
        aria-label="充值"
        className="flex h-full items-center justify-center border-l border-white/15 bg-white/8 transition hover:bg-white/14"
        href={href}
      >
        <Plus size={22} />
      </Link>
    </div>
  );
}

function IconLabel({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      className="flex flex-col items-center gap-2 text-white/88 transition hover:text-white"
      type="button"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-black/20">
        {icon}
      </span>
      <span className="text-base font-medium">{label}</span>
    </button>
  );
}

function RoundAction({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex flex-col items-center gap-2 text-white/92 transition hover:text-white"
      onClick={onClick}
      type="button"
    >
      <span className="flex h-[clamp(2.75rem,7svh,3.5rem)] w-[clamp(2.75rem,7svh,3.5rem)] items-center justify-center rounded-full border border-white/65 bg-black/24">
        {icon}
      </span>
      <span className="text-sm font-medium lg:text-lg">{label}</span>
    </button>
  );
}

function RateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_110px] items-center bg-black/28 px-4 py-0.5">
      <span className="text-base text-[#f4d27a] lg:text-lg">{label}</span>
      <span className="text-right text-base text-[#f4d27a] lg:text-lg">{value}</span>
    </div>
  );
}

function FeaturedThumb({ item }: { item?: GachaItem }) {
  return (
    <div className="relative h-[clamp(3.5rem,11svh,5.75rem)] w-[clamp(3rem,9svh,4.875rem)] border border-white/26 bg-white shadow-[0_0_16px_rgba(255,255,255,0.16)]">
      <div className="absolute right-1 top-0 bg-[#d0a24c] px-1 text-xs font-black text-white">
        UP!
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/45 px-1 py-1 text-xs font-bold text-white">
        {item?.name ?? "UP"}
      </div>
    </div>
  );
}

function PullButton({
  count,
  disabled,
  onClick,
  pending,
}: {
  count: 1 | 10;
  disabled: boolean;
  onClick: () => void;
  pending: boolean;
}) {
  return (
    <button
      className="group min-h-[clamp(3.25rem,9svh,5rem)] border border-[#dbd2bd] bg-[#f5f1e8]/92 px-3 text-[#161514] shadow-[0_0_22px_rgba(255,255,255,0.18)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 lg:px-4"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center justify-center gap-3 text-lg font-black lg:gap-5 lg:text-3xl">
        <span className="flex items-center gap-1 text-sm font-medium lg:gap-2 lg:text-lg">
          <Gem size={24} />× {count}
        </span>
        <span>{pending ? "共鸣中" : `共鸣${count}次`}</span>
      </div>
    </button>
  );
}

function ResultChip({
  record,
  item,
  wide,
}: {
  record: PullRecord;
  item?: GachaItem;
  wide?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 border p-2 ${rarityBorder(record.rarity)} ${wide ? "w-full" : ""}`}
    >
      <div className="h-12 w-9 shrink-0 bg-white" />
      <div className="min-w-0">
        <div className="truncate text-sm font-bold">{record.itemName}</div>
        <div className="text-xs text-white/45">
          {record.rarity} 星 · {record.isFeatured ? "UP" : "常规"}{" "}
          {item?.type === "weapon" ? "武器" : "角色"}
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item, entry }: { item: GachaItem; entry: BannerPoolEntry }) {
  return (
    <div className="border border-slate-200 p-3">
      <div className="mb-3 h-40 w-full bg-white shadow-inner ring-1 ring-slate-200" />
      <div className="font-bold">{item.name}</div>
      <div className="text-xs text-slate-500">
        {item.rarity} 星 · {item.type === "character" ? "角色" : "武器"}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Tag color={entry.poolGroup === "featured" ? "magenta" : "blue"}>
          {entry.poolGroup === "featured" ? "UP 池" : "标准池"}
        </Tag>
        {entry.featuredGroup && (
          <Tag color="gold">{entry.featuredGroup === "five_up" ? "五星 UP" : "四星 UP"}</Tag>
        )}
        <Tag>权重 {entry.weight}</Tag>
      </div>
    </div>
  );
}

function rarityBorder(rarity: number) {
  if (rarity === 5) {
    return "border-amber-300/50 bg-amber-300/12";
  }

  if (rarity === 4) {
    return "border-purple-300/45 bg-purple-300/12";
  }

  return "border-sky-200/25 bg-white/6";
}

function formatPpm(value?: number) {
  if (value === undefined) {
    return "-";
  }

  return `${(value / 10000).toLocaleString("zh-CN", { maximumFractionDigits: 3 })}%`;
}

function backgroundImageStyle(
  imageUrl?: string,
  position = "center center",
): CSSProperties | undefined {
  if (!imageUrl) {
    return undefined;
  }

  return {
    backgroundImage: `url(${JSON.stringify(imageUrl)})`,
    backgroundPosition: position,
  };
}

function withGatewayBalance(state: StoredGachaState, balanceMinor: number | undefined) {
  if (typeof balanceMinor !== "number" || !Number.isFinite(balanceMinor)) {
    return state;
  }

  return {
    ...state,
    currencies: {
      ...state.currencies,
      astrite: Math.max(0, Math.floor(balanceMinor)),
    },
  };
}

function mapGatewayPullRecord(record: GatewayPullResultRecord, at: string): PullRecord {
  return {
    id: record.id,
    itemId: record.item_id,
    itemName: record.item_name,
    itemType: record.item_type,
    rarity: record.rarity,
    bannerId: record.banner_id,
    bannerName: record.banner_name,
    at,
    pityAtFive: record.pity_at_five,
    pityAtFour: record.pity_at_four,
    isFeatured: record.is_featured,
  };
}

function applyGatewayPullResult({
  bannerId,
  count,
  currentState,
  nextPity,
  records,
}: {
  bannerId: string;
  count: 1 | 10;
  currentState: StoredGachaState;
  nextPity: SuccessfulPullResult["nextPity"];
  records: PullRecord[];
}): StoredGachaState {
  const inventory = { ...currentState.inventory };
  for (const record of records) {
    inventory[record.itemId] = (inventory[record.itemId] ?? 0) + 1;
  }

  return {
    ...currentState,
    currencies: {
      ...currentState.currencies,
      astrite: Math.max(0, currentState.currencies.astrite - count * ASTRITE_PER_PULL),
    },
    history: [...records, ...currentState.history].slice(0, 600),
    inventory,
    pity: {
      ...currentState.pity,
      [bannerId]: {
        sinceFive: nextPity.since_five,
        sinceFour: nextPity.since_four,
        guaranteedFeaturedFive: nextPity.guaranteed_featured_five,
        guarantees: {},
      },
    },
  };
}
