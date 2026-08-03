import type { User } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Headset,
  PackageCheck,
  RefreshCcw,
  Search,
  ShieldCheck,
  UserRound,
  Workflow,
  XCircle,
} from "lucide-react";

import { AccessNotice } from "@/components/console/AccessNotice";
import { createControlPlaneAdminPageClient } from "@/lib/control-plane/admin";
import { getAuthUserById } from "@/lib/control-plane/auth-users";
import { parseUuid } from "@/lib/control-plane/input";
import {
  getPlayerSupport,
  type PlayerSupportAPICall,
  type PlayerSupportOperation,
  type PlayerSupportPullEvent,
  type PlayerSupportPullRecord,
  type PlayerSupportResponse,
  type PlayerSupportSection,
} from "@/lib/gateway/player-support";
import { summarizePlayerCase, type PlayerCaseTone } from "@/lib/player-support/summary";
import { getAuthenticatedSession } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type PageSearchParams = Record<string, string | string[] | undefined>;

export default async function PlayersPage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const rawPlayerId = firstParam(params.player_id)?.trim() ?? "";
  const playerId = rawPlayerId ? parseUuid(rawPlayerId) : null;
  const adminClient = await createControlPlaneAdminPageClient(
    "/console/players",
    "player-support:view",
  );
  if (!adminClient.ok) {
    return <AccessNotice message={adminClient.message} />;
  }

  const { user, session } = await getAuthenticatedSession();
  if (!user || !session?.access_token) {
    redirect(`/login?next=${encodeURIComponent("/console/players")}`);
  }

  if (!rawPlayerId) {
    return (
      <PlayerSupportShell searchValue="">
        <EmptySelection />
      </PlayerSupportShell>
    );
  }

  if (!playerId) {
    return (
      <PlayerSupportShell searchValue={rawPlayerId}>
        <InlineError message="玩家 UUID 格式不正确。" />
      </PlayerSupportShell>
    );
  }

  const { supabase } = adminClient;
  const [supportResult, identityResult] = await Promise.allSettled([
    getPlayerSupport(session.access_token, playerId),
    getAuthUserById(supabase, playerId),
  ]);
  const support = supportResult.status === "fulfilled" ? supportResult.value : null;
  const identity = identityResult.status === "fulfilled" ? identityResult.value : null;
  const supportError = supportResult.status === "rejected"
    ? errorMessage(supportResult.reason, "玩家业务数据暂时不可用。")
    : "";
  const identityError = identityResult.status === "rejected"
    ? errorMessage(identityResult.reason, "玩家身份暂时不可用。")
    : "";

  return (
    <PlayerSupportShell searchValue={playerId}>
      <IdentityBand error={identityError} identity={identity} playerId={playerId} />
      {supportError ? <InlineError message={supportError} /> : null}
      {support ? <PlayerEvidence support={support} /> : null}
    </PlayerSupportShell>
  );
}

function PlayerSupportShell({
  children,
  searchValue,
}: {
  children: ReactNode;
  searchValue: string;
}) {
  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#143f3b] text-white">
            <Headset className="size-4.5" />
          </span>
          <div>
            <div className="text-xs font-bold uppercase text-[#39746c]">Player support</div>
            <h1 className="mt-0.5 text-2xl font-semibold text-slate-950">玩家客服</h1>
          </div>
        </div>

        <form className="flex w-full min-w-0 gap-2 xl:max-w-2xl">
          <label className="min-w-0 flex-1">
            <span className="sr-only">玩家 UUID</span>
            <input
              autoComplete="off"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 font-mono text-sm text-slate-900 outline-none transition placeholder:font-sans placeholder:text-slate-400 focus:border-[#39746c] focus:ring-2 focus:ring-[#39746c]/15"
              defaultValue={searchValue}
              name="player_id"
              placeholder="玩家 UUID"
              required
            />
          </label>
          <button
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#143f3b] px-4 text-sm font-semibold text-white transition hover:bg-[#245a54]"
            type="submit"
          >
            <Search className="size-4" />
            查询
          </button>
          {searchValue ? (
            <Link
              aria-label="清除查询"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              href="/console/players"
              title="清除查询"
            >
              <RefreshCcw className="size-4" />
            </Link>
          ) : null}
        </form>
      </header>
      {children}
    </div>
  );
}

function EmptySelection() {
  return (
    <section className="flex min-h-64 items-center justify-center border-y border-slate-200 bg-white/50 px-4 text-center">
      <div>
        <UserRound className="mx-auto size-7 text-slate-300" />
        <div className="mt-3 text-sm font-semibold text-slate-600">尚未选择玩家</div>
      </div>
    </section>
  );
}

function IdentityBand({
  error,
  identity,
  playerId,
}: {
  error: string;
  identity: User | null;
  playerId: string;
}) {
  return (
    <section className="border-y border-slate-200 bg-white px-4 py-4 sm:px-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_repeat(3,minmax(140px,auto))] lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-base font-semibold text-slate-950">
              {identity?.email ?? (error ? "身份信息不可用" : "未找到身份邮箱")}
            </h2>
            <IdentityBadge status={error ? "unavailable" : identity ? "found" : "missing"} />
          </div>
          <div className="mt-1 break-all font-mono text-xs text-slate-400">{playerId}</div>
          {error ? <div className="mt-2 text-xs font-medium text-rose-700">{error}</div> : null}
        </div>
        <IdentityDatum label="注册时间" value={formatTime(identity?.created_at)} />
        <IdentityDatum label="最近登录" value={formatTime(identity?.last_sign_in_at)} />
        <IdentityDatum
          label="登录方式"
          value={identity?.app_metadata?.provider ?? identity?.identities?.[0]?.provider ?? "-"}
        />
      </div>
    </section>
  );
}

function IdentityBadge({ status }: { status: "found" | "missing" | "unavailable" }) {
  const found = status === "found";
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ring-1 ${
      found
        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
        : status === "missing"
          ? "bg-amber-50 text-amber-700 ring-amber-200"
          : "bg-rose-50 text-rose-700 ring-rose-200"
    }`}>
      {found ? <ShieldCheck className="size-3" /> : <AlertTriangle className="size-3" />}
      {found ? "身份已确认" : status === "missing" ? "身份目录无记录" : "身份不可用"}
    </span>
  );
}

function IdentityDatum({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-700">{value}</div>
    </div>
  );
}

function PlayerEvidence({ support }: { support: PlayerSupportResponse }) {
  const operations = support.sections.pull_operations.data?.items ?? [];
  const events = support.sections.pull_events.data?.items ?? [];
  const records = support.sections.pull_records.data?.items ?? [];
  const inventory = support.sections.inventory.data?.items ?? [];
  const ledger = support.sections.ledger.data?.items ?? [];
  const apiCalls = support.sections.api_calls.data?.items ?? [];
  const latestOperation = operations[0] ?? null;
  const deliveredEventIds = new Set(events.map((event) => event.event_id));
  const caseSummary = summarizePlayerCase({
    deliveredEventIds,
    latestOperation,
    partial: support.partial,
  });
  const unavailableSections = unavailableSectionNames(support);
  const totalInventory = inventory.reduce((total, item) => total + item.quantity, 0);
  const assetEvidence = combinedEvidenceSection(support.sections.account, support.sections.ledger);
  const rewardEvidence = combinedEvidenceSection(
    support.sections.pull_events,
    support.sections.pull_records,
  );

  return (
    <>
      {support.partial ? (
        <div className="flex items-start gap-2 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>证据不完整：{unavailableSections.join("、") || "部分服务"} 暂不可用。</span>
        </div>
      ) : null}

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Metric
          icon={CircleDollarSign}
          label="资源余额"
          value={accountMetric(support.sections.account)}
          tone="slate"
        />
        <Metric
          icon={caseIcon(caseSummary.tone)}
          label="最近状态"
          value={caseSummary.label}
          subvalue={caseSummary.detail}
          tone={caseSummary.tone}
        />
        <Metric
          icon={Clock3}
          label="五星保底计数"
          value={latestOperation?.next_pity ? String(latestOperation.next_pity.since_five) : "-"}
          subvalue={latestOperation?.next_pity?.guaranteed_featured_five ? "大保底生效" : ""}
          tone="info"
        />
        <Metric
          icon={PackageCheck}
          label="背包数量"
          value={support.sections.inventory.status === "ok" ? formatNumber(totalInventory) : "-"}
          subvalue={support.sections.inventory.status === "ok" ? `${inventory.length} 种道具` : "数据不可用"}
          tone="success"
        />
      </section>

      <EvidenceSection
        title="扣款与资产"
        countLabel={support.sections.account.status === "not_found" ? "未创建资产账户" : `${ledger.length} 条流水`}
        section={assetEvidence}
      >
        {ledger.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
                <tr>
                  <th className="px-4 py-3">时间</th>
                  <th className="px-4 py-3">类型</th>
                  <th className="px-4 py-3 text-right">变动</th>
                  <th className="px-4 py-3 text-right">变动前</th>
                  <th className="px-4 py-3 text-right">变动后</th>
                  <th className="px-4 py-3">幂等键</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ledger.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-3 text-xs text-slate-500">{formatTime(entry.created_at)}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{ledgerReason(entry.reason)}</td>
                    <td className={`px-4 py-3 text-right font-mono font-semibold ${entry.delta_minor < 0 ? "text-rose-700" : "text-emerald-700"}`}>
                      {entry.delta_minor > 0 ? "+" : ""}{formatNumber(entry.delta_minor)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-slate-500">{formatNumber(entry.balance_before_minor)}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-slate-700">{formatNumber(entry.balance_after_minor)}</td>
                    <td className="max-w-72 truncate px-4 py-3 font-mono text-xs text-slate-400" title={entry.idempotency_key}>{entry.idempotency_key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <PreciseEmpty label={support.sections.ledger.status === "ok" ? "没有资产流水" : "资产流水不可用"} />}
      </EvidenceSection>

      <EvidenceSection
        title="抽卡与保底"
        countLabel={`${operations.length} 次操作`}
        section={support.sections.pull_operations}
      >
        {operations.length ? <OperationTable deliveredEventIds={deliveredEventIds} operations={operations} /> : (
          <PreciseEmpty label={support.sections.pull_operations.status === "ok" ? "没有抽卡操作" : "抽卡操作不可用"} />
        )}
      </EvidenceSection>

      <EvidenceSection
        title="奖励到账"
        countLabel={`${events.length} 个已消费事件 · ${records.length} 条奖励`}
        section={rewardEvidence}
      >
        <RewardEvidence
          eventStatus={support.sections.pull_events.status}
          events={events}
          recordStatus={support.sections.pull_records.status}
          records={records}
        />
      </EvidenceSection>

      <EvidenceSection
        title="最近 API 请求"
        countLabel={`${apiCalls.length} 条记录`}
        section={support.sections.api_calls}
        action={(
          <Link
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#245a54] hover:text-[#143f3b]"
            href={`/admin/gacha/audit-logs?user_id=${encodeURIComponent(support.player_id)}`}
          >
            全部记录
            <ArrowUpRight className="size-3.5" />
          </Link>
        )}
      >
        {apiCalls.length ? <APICallTable calls={apiCalls} /> : (
          <PreciseEmpty label={support.sections.api_calls.status === "ok" ? "没有 API 请求记录" : "API 请求记录不可用"} />
        )}
      </EvidenceSection>
    </>
  );
}

function Metric({
  icon: Icon,
  label,
  subvalue,
  tone,
  value,
}: {
  icon: typeof CircleDollarSign;
  label: string;
  subvalue?: string;
  tone: PlayerCaseTone | "slate";
  value: string;
}) {
  const toneClass = {
    success: "border-emerald-200 bg-emerald-50/70 text-emerald-800",
    info: "border-sky-200 bg-sky-50/70 text-sky-800",
    warning: "border-amber-200 bg-amber-50/70 text-amber-900",
    danger: "border-rose-200 bg-rose-50/70 text-rose-800",
    neutral: "border-slate-200 bg-white text-slate-800",
    slate: "border-slate-200 bg-white text-slate-800",
  }[tone];
  return (
    <article className={`min-h-28 rounded-lg border p-4 ${toneClass}`}>
      <div className="flex items-center gap-2 text-xs font-semibold opacity-70">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-2 break-words text-xl font-semibold">{value}</div>
      {subvalue ? <div className="mt-1 line-clamp-2 text-xs opacity-70">{subvalue}</div> : null}
    </article>
  );
}

function EvidenceSection({
  action,
  children,
  countLabel,
  section,
  title,
}: {
  action?: ReactNode;
  children: ReactNode;
  countLabel: string;
  section: PlayerSupportSection<unknown>;
  title: string;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex min-h-13 flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
          <SectionState status={section.status} />
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>{countLabel}</span>
          {action}
        </div>
      </div>
      {section.status === "unavailable" ? (
        <div className="flex items-center gap-2 border-b border-rose-100 bg-rose-50 px-4 py-2 text-xs font-medium text-rose-800">
          <XCircle className="size-3.5 shrink-0" />
          {section.error?.message ?? "该区块暂不可用"}
          {section.error?.code ? <span className="font-mono text-rose-500">{section.error.code}</span> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

function OperationTable({
  deliveredEventIds,
  operations,
}: {
  deliveredEventIds: ReadonlySet<string>;
  operations: PlayerSupportOperation[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1160px] border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
          <tr>
            <th className="px-4 py-3">时间</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3">卡池 / 抽数</th>
            <th className="px-4 py-3">保底</th>
            <th className="px-4 py-3">奖励</th>
            <th className="px-4 py-3">请求 / 事件</th>
            <th className="px-4 py-3">异常</th>
            <th className="px-4 py-3 text-right">链路</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {operations.map((operation) => {
            const delivered = Boolean(operation.event_id && deliveredEventIds.has(operation.event_id));
            return (
              <tr key={operation.operation_id}>
                <td className="px-4 py-3 text-xs text-slate-500">{formatTime(operation.created_at)}</td>
                <td className="px-4 py-3"><OperationStatus status={operation.status} /></td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-800">{operation.banner_id ?? "未知卡池"}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{operation.count ? `${operation.count} 抽` : "抽数未知"}</div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  {operation.next_pity ? (
                    <>
                      <div>五星 {operation.next_pity.since_five} · 四星 {operation.next_pity.since_four}</div>
                      {operation.next_pity.guaranteed_featured_five ? <div className="mt-1 font-semibold text-amber-700">大保底</div> : null}
                    </>
                  ) : "-"}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${delivered || operation.status === "succeeded" ? "text-emerald-700" : "text-amber-700"}`}>
                    {delivered || operation.status === "succeeded" ? "已到账" : operation.event_id ? "待确认" : "未生成"}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-slate-400">
                  <div title={operation.request_id ?? ""}>请求 {shortId(operation.request_id)}</div>
                  <div className="mt-1" title={operation.event_id ?? ""}>事件 {shortId(operation.event_id)}</div>
                </td>
                <td className="max-w-64 px-4 py-3 text-xs">
                  {operation.error ? (
                    <div className="text-rose-700" title={operation.error.message}>
                      <div className="font-mono font-semibold">{operation.error.code}</div>
                      <div className="mt-0.5 truncate text-rose-500">{operation.error.message}</div>
                    </div>
                  ) : <span className="text-slate-300">-</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  {operation.request_id ? (
                    <Link
                      aria-label="在 Sandbox 查看调用链"
                      className="inline-flex size-8 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:border-emerald-400"
                      href={`/sandbox?request_id=${encodeURIComponent(operation.request_id)}`}
                      title="在 Sandbox 查看调用链"
                    >
                      <Workflow className="size-4" />
                    </Link>
                  ) : <span className="text-slate-300">-</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RewardEvidence({
  events,
  eventStatus,
  records,
  recordStatus,
}: {
  events: PlayerSupportPullEvent[];
  eventStatus: "ok" | "not_found" | "unavailable";
  records: PlayerSupportPullRecord[];
  recordStatus: "ok" | "not_found" | "unavailable";
}) {
  if (!events.length && !records.length) {
    return (
      <PreciseEmpty
        label={eventStatus === "unavailable" || recordStatus === "unavailable" ? "奖励到账证据不可用" : "没有奖励到账记录"}
      />
    );
  }
  return (
    <div className="grid divide-y divide-slate-200 xl:grid-cols-2 xl:divide-x xl:divide-y-0">
      <div className="min-w-0">
        <div className="border-b border-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">消费事件</div>
        <div className="divide-y divide-slate-100">
          {events.slice(0, 10).map((event) => (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-3" key={event.event_id}>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-slate-800">{event.banner_id}</div>
                <div className="mt-1 font-mono text-[11px] text-slate-400" title={event.event_id}>{shortId(event.event_id)}</div>
              </div>
              <div className="text-right text-xs text-slate-500">
                <div>状态版本 {event.state_version}</div>
                <div className="mt-1">{formatTime(event.received_at)}</div>
              </div>
            </div>
          ))}
          {!events.length ? <PreciseEmpty label={eventStatus === "unavailable" ? "奖励事件不可用" : "没有已消费事件"} compact /> : null}
        </div>
      </div>
      <div className="min-w-0">
        <div className="border-b border-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">奖励明细</div>
        <div className="divide-y divide-slate-100">
          {records.slice(0, 20).map((record) => (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3" key={record.id}>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-slate-800">{record.item_name}</div>
                <div className="mt-1 text-xs text-slate-400">{record.banner_name}</div>
              </div>
              <div className="flex items-center gap-2">
                {record.is_featured ? <span className="text-[11px] font-semibold text-amber-700">UP</span> : null}
                <span className={`rounded-md px-2 py-1 text-xs font-semibold ${rarityClass(record.rarity)}`}>{record.rarity} 星</span>
              </div>
            </div>
          ))}
          {!records.length ? <PreciseEmpty label={recordStatus === "unavailable" ? "奖励明细不可用" : "没有奖励明细"} compact /> : null}
        </div>
      </div>
    </div>
  );
}

function APICallTable({ calls }: { calls: PlayerSupportAPICall[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
          <tr>
            <th className="px-4 py-3">时间</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3">方法</th>
            <th className="px-4 py-3">路径</th>
            <th className="px-4 py-3">耗时</th>
            <th className="px-4 py-3">异常</th>
            <th className="px-4 py-3 text-right">链路</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {calls.map((call) => (
            <tr key={call.request_id}>
              <td className="px-4 py-3 text-xs text-slate-500">{formatTime(call.started_at)}</td>
              <td className="px-4 py-3"><HTTPStatus status={call.response_status} /></td>
              <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-600">{call.method}</td>
              <td className="max-w-96 px-4 py-3">
                <div className="truncate text-sm font-medium text-slate-800" title={`${call.path}${call.raw_query ? `?${call.raw_query}` : ""}`}>{call.path}</div>
                <div className="mt-1 font-mono text-[11px] text-slate-400" title={call.request_id}>{shortId(call.request_id)}</div>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{call.duration_ms === null ? "-" : `${call.duration_ms} ms`}</td>
              <td className="max-w-64 px-4 py-3 text-xs text-rose-700">
                <div className="truncate" title={call.error_message ?? ""}>{call.error_code ?? "-"}</div>
              </td>
              <td className="px-4 py-3 text-right">
                {isGachaPull(call.path) ? (
                  <Link
                    aria-label="在 Sandbox 查看调用链"
                    className="inline-flex size-8 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:border-emerald-400"
                    href={`/sandbox?request_id=${encodeURIComponent(call.request_id)}`}
                    title="在 Sandbox 查看调用链"
                  >
                    <Workflow className="size-4" />
                  </Link>
                ) : <span className="text-slate-300">-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionState({ status }: { status: "ok" | "not_found" | "unavailable" }) {
  const config = {
    ok: { label: "已读取", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    not_found: { label: "无记录", className: "bg-slate-100 text-slate-600 ring-slate-200" },
    unavailable: { label: "不可用", className: "bg-rose-50 text-rose-700 ring-rose-200" },
  }[status];
  return <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ring-1 ${config.className}`}>{config.label}</span>;
}

function OperationStatus({ status }: { status: PlayerSupportOperation["status"] }) {
  const config = {
    processing: ["处理中", "bg-sky-50 text-sky-700 ring-sky-200"],
    event_pending: ["待发消息", "bg-amber-50 text-amber-700 ring-amber-200"],
    event_published: ["待确认奖励", "bg-amber-50 text-amber-700 ring-amber-200"],
    succeeded: ["已完成", "bg-emerald-50 text-emerald-700 ring-emerald-200"],
    refund_pending: ["退款中", "bg-orange-50 text-orange-700 ring-orange-200"],
    failed: ["失败", "bg-rose-50 text-rose-700 ring-rose-200"],
  }[status];
  return <span className={`inline-flex rounded-md px-2 py-1 text-[11px] font-semibold ring-1 ${config[1]}`}>{config[0]}</span>;
}

function HTTPStatus({ status }: { status: number | null }) {
  const className = status === null
    ? "bg-slate-100 text-slate-600 ring-slate-200"
    : status >= 500
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : status >= 400
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : "bg-emerald-50 text-emerald-700 ring-emerald-200";
  return <span className={`inline-flex min-w-12 justify-center rounded-md px-2 py-1 font-mono text-xs font-semibold ring-1 ${className}`}>{status ?? "..."}</span>;
}

function PreciseEmpty({ label, compact = false }: { label: string; compact?: boolean }) {
  return <div className={`text-center text-sm font-medium text-slate-400 ${compact ? "px-4 py-6" : "px-4 py-10"}`}>{label}</div>;
}

function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
      <XCircle className="mt-0.5 size-4 shrink-0" />
      {message}
    </div>
  );
}

function accountMetric(section: PlayerSupportResponse["sections"]["account"]) {
  if (section.status === "not_found") return "未开户";
  if (section.status !== "ok" || !section.data) return "-";
  return formatNumber(section.data.balance_minor);
}

function combinedEvidenceSection(
  ...sections: PlayerSupportSection<unknown>[]
): PlayerSupportSection<unknown> {
  const unavailable = sections.find((section) => section.status === "unavailable");
  if (unavailable) return unavailable;
  if (sections.every((section) => section.status === "not_found")) return sections[0];
  return { status: "ok", data: null };
}

function unavailableSectionNames(support: PlayerSupportResponse) {
  const labels: Record<keyof PlayerSupportResponse["sections"], string> = {
    account: "资产账户",
    ledger: "资产流水",
    pull_operations: "抽卡操作",
    inventory: "背包库存",
    pull_events: "奖励事件",
    pull_records: "奖励明细",
    api_calls: "API 请求",
  };
  return (Object.keys(labels) as (keyof typeof labels)[])
    .filter((key) => support.sections[key].status === "unavailable")
    .map((key) => labels[key]);
}

function caseIcon(tone: PlayerCaseTone) {
  if (tone === "success") return CheckCircle2;
  if (tone === "danger") return XCircle;
  if (tone === "warning") return AlertTriangle;
  return Clock3;
}

function ledgerReason(reason: string) {
  const labels: Record<string, string> = {
    gacha_pull: "抽卡扣款",
    gacha_pull_refund: "抽卡退款",
    manual_credit: "人工充值",
    asset_credit: "资源增加",
    asset_spend: "资源扣减",
  };
  return labels[reason] ?? (reason || "未标注");
}

function rarityClass(rarity: number) {
  if (rarity === 5) return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  if (rarity === 4) return "bg-violet-50 text-violet-700 ring-1 ring-violet-200";
  return "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
}

function isGachaPull(path: string) {
  return /\/gacha\/me\/pulls(?:\/|$)/.test(path);
}

function shortId(value: string | null | undefined) {
  if (!value) return "-";
  return value.length > 12 ? `${value.slice(0, 8)}…${value.slice(-4)}` : value;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

function formatTime(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Asia/Hong_Kong",
  }).format(date);
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
