"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Gem,
  Loader2,
  ReceiptText,
  RefreshCw,
  WalletCards,
} from "lucide-react";
import type { AssetAccount, LedgerEntry } from "@/lib/gateway/assets";
import { formatAssetAmount, type RechargeTier } from "@/lib/recharge/tiers";
import { loadAssetLedgerPage, rechargeTier, type RechargeActionResult } from "./actions";
import { GACHA_STORAGE_KEY } from "@/lib/gacha/simulator";

export default function RechargeClient({
  initialLedgerItems,
  initialLedgerNextCursor,
  initialAccount,
  ledgerLoadError,
  tiers,
  loadError,
}: {
  initialAccount: AssetAccount | null;
  initialLedgerItems: LedgerEntry[];
  initialLedgerNextCursor?: string;
  ledgerLoadError?: string;
  tiers: RechargeTier[];
  loadError?: string;
}) {
  const [balanceMinor, setBalanceMinor] = useState(initialAccount?.balance_minor ?? 0);
  const [ledgerItems, setLedgerItems] = useState(initialLedgerItems);
  const [ledgerNextCursor, setLedgerNextCursor] = useState(initialLedgerNextCursor);
  const [ledgerError, setLedgerError] = useState(ledgerLoadError ?? "");
  const [result, setResult] = useState<RechargeActionResult | null>(
    loadError
      ? {
          ok: false,
          message: loadError,
        }
      : null,
  );
  const [pendingTierId, setPendingTierId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLedgerPending, startLedgerTransition] = useTransition();

  const submitTier = (tier: RechargeTier) => {
    setPendingTierId(tier.id);
    setResult(null);
    startTransition(async () => {
      const nextResult = await rechargeTier(tier.id);
      setResult(nextResult);
      setPendingTierId(null);
      if (nextResult.ok) {
        setBalanceMinor(nextResult.balanceMinor);
        setLedgerItems((items) => mergeLedgerEntries([nextResult.entry, ...items]));
        syncLocalGachaBalance(nextResult.balanceMinor);
      }
    });
  };

  const refreshLedger = () => {
    setLedgerError("");
    startLedgerTransition(async () => {
      const page = await loadAssetLedgerPage();
      if (!page.ok) {
        setLedgerError(page.message);
        return;
      }

      setLedgerItems(page.items);
      setLedgerNextCursor(page.nextCursor);
    });
  };

  const loadMoreLedger = () => {
    if (!ledgerNextCursor) {
      return;
    }

    setLedgerError("");
    startLedgerTransition(async () => {
      const page = await loadAssetLedgerPage(ledgerNextCursor);
      if (!page.ok) {
        setLedgerError(page.message);
        return;
      }

      setLedgerItems((items) => mergeLedgerEntries([...items, ...page.items]));
      setLedgerNextCursor(page.nextCursor);
    });
  };

  return (
    <main className="min-h-screen bg-[#090b10] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6">
        <header className="flex items-center justify-between">
          <Link
            className="inline-flex h-11 w-11 items-center justify-center border border-white/12 bg-white/8 text-white/82 transition hover:border-white/30 hover:bg-white/12"
            href="/"
            aria-label="返回首页"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3 border border-white/12 bg-white/8 px-4 py-2">
            <Gem size={18} className="text-[#f3d36f]" />
            <span className="text-sm text-white/58">当前余额</span>
            <span className="text-xl font-black">
              {formatAssetAmount(balanceMinor)}
            </span>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#d8bd7b]/35 bg-[#d8bd7b]/10 px-3 py-1 text-sm font-bold text-[#f3d36f]">
              <WalletCards size={16} />
              星声补给
            </div>
            <h1 className="mt-5 text-[clamp(3rem,8vw,6.5rem)] font-black leading-none tracking-normal">
              充值
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/62">
              选择常用档位后会调用网关资产接口，为当前登录账号新增资源。充值成功后首页资源显示会同步为最新余额。
            </p>
            {result && (
              <div
                className={`mt-6 border px-4 py-3 text-sm font-medium ${
                  result.ok
                    ? "border-emerald-300/35 bg-emerald-300/12 text-emerald-100"
                    : "border-rose-300/35 bg-rose-300/12 text-rose-100"
                }`}
              >
                <div className="flex items-start gap-2">
                  {result.ok ? <CheckCircle2 size={18} /> : <span className="mt-0.5">!</span>}
                  <span>{result.message}</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tiers.map((tier) => {
              const loading = isPending && pendingTierId === tier.id;
              return (
                <button
                  className="group relative min-h-44 border border-white/14 bg-white/[0.07] p-5 text-left shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:border-[#f3d36f]/55 hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isPending}
                  key={tier.id}
                  onClick={() => submitTier(tier)}
                  type="button"
                >
                  {tier.badge && (
                    <span className="absolute right-4 top-4 bg-[#d6a84f] px-2 py-0.5 text-xs font-black text-[#19150e]">
                      {tier.badge}
                    </span>
                  )}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3d36f]/16 text-[#f3d36f]">
                    {loading ? <Loader2 size={21} className="animate-spin" /> : <Gem size={21} />}
                  </div>
                  <div className="mt-5 text-4xl font-black">
                    {formatAssetAmount(tier.amountMinor)}
                  </div>
                  <div className="mt-1 text-sm font-medium text-white/50">{tier.title}</div>
                  <div className="mt-5 inline-flex border border-white/15 bg-black/24 px-3 py-1 text-lg font-black text-[#f3d36f]">
                    {tier.priceLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="pb-8">
          <div className="border border-white/12 bg-white/[0.06] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3d36f]/14 text-[#f3d36f]">
                  <ReceiptText size={20} />
                </div>
                <div>
                  <div className="text-xl font-black">资产流水</div>
                  <div className="text-xs text-white/45">最近资产变动</div>
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center gap-2 border border-white/14 bg-black/24 px-3 py-2 text-sm font-bold text-white/82 transition hover:border-white/35 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLedgerPending}
                onClick={refreshLedger}
                type="button"
              >
                {isLedgerPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={16} />
                )}
                刷新
              </button>
            </div>

            {ledgerError && (
              <div className="mt-4 border border-rose-300/35 bg-rose-300/12 px-4 py-3 text-sm font-medium text-rose-100">
                {ledgerError}
              </div>
            )}

            <div className="mt-4 overflow-hidden border border-white/10">
              {ledgerItems.length > 0 ? (
                ledgerItems.map((entry) => <LedgerRow entry={entry} key={entry.id} />)
              ) : (
                <div className="bg-black/18 px-4 py-10 text-center text-sm text-white/48">
                  暂无资产流水
                </div>
              )}
            </div>

            {ledgerNextCursor && (
              <div className="mt-4 flex justify-center">
                <button
                  className="inline-flex items-center justify-center gap-2 border border-white/14 bg-black/24 px-4 py-2 text-sm font-bold text-white/82 transition hover:border-[#f3d36f]/50 hover:text-[#f3d36f] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isLedgerPending}
                  onClick={loadMoreLedger}
                  type="button"
                >
                  {isLedgerPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                  加载更多
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function LedgerRow({ entry }: { entry: LedgerEntry }) {
  const positive = entry.delta_minor >= 0;
  return (
    <div className="grid gap-3 border-b border-white/8 bg-black/18 px-4 py-3 last:border-b-0 md:grid-cols-[1.1fr_0.8fr_0.8fr_1fr] md:items-center">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex min-w-20 justify-center border px-2 py-0.5 text-sm font-black ${
              positive
                ? "border-emerald-300/30 bg-emerald-300/12 text-emerald-100"
                : "border-rose-300/30 bg-rose-300/12 text-rose-100"
            }`}
          >
            {positive ? "+" : ""}
            {formatAssetAmount(entry.delta_minor)}
          </span>
          <span className="truncate text-sm font-bold text-white/86">{formatReason(entry.reason)}</span>
        </div>
        <div className="mt-1 truncate text-xs text-white/38">{entry.idempotency_key}</div>
      </div>
      <LedgerMetric label="变动前" value={entry.balance_before_minor} />
      <LedgerMetric label="变动后" value={entry.balance_after_minor} highlight />
      <div className="text-sm text-white/58 md:text-right">{formatLedgerTime(entry.created_at)}</div>
    </div>
  );
}

function LedgerMetric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-white/38">{label}</div>
      <div className={`mt-0.5 text-sm font-bold ${highlight ? "text-[#f3d36f]" : "text-white/78"}`}>
        {formatAssetAmount(value)}
      </div>
    </div>
  );
}

function formatReason(reason: string) {
  if (reason === "topup") {
    return "充值";
  }

  if (reason === "manual_credit") {
    return "手动入账";
  }

  if (reason === "asset_credit") {
    return "资产新增";
  }

  return reason || "资产变动";
}

function formatLedgerTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function mergeLedgerEntries(entries: LedgerEntry[]) {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.id)) {
      return false;
    }

    seen.add(entry.id);
    return true;
  });
}

function syncLocalGachaBalance(balanceMinor: number) {
  try {
    const rawValue = window.localStorage.getItem(GACHA_STORAGE_KEY);
    const value = rawValue ? (JSON.parse(rawValue) as Record<string, unknown>) : {};
    const currencies =
      value.currencies && typeof value.currencies === "object"
        ? (value.currencies as Record<string, unknown>)
        : {};

    window.localStorage.setItem(
      GACHA_STORAGE_KEY,
      JSON.stringify({
        ...value,
        currencies: {
          ...currencies,
          astrite: balanceMinor,
        },
      }),
    );
  } catch {
    // Local simulation state is best-effort; the gateway account remains the source of truth.
  }
}
