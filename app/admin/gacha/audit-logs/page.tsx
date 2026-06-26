import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Eye,
  FileSearch,
  RefreshCcw,
  Search,
  ShieldAlert,
} from "lucide-react";

import {
  getAuditLogDetail,
  listAuditLogs,
  type AuditLogDetail,
  type AuditLogListItem,
  type AuditLogQuery,
} from "@/lib/gateway/audit";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type PageSearchParams = Record<string, string | string[] | undefined>;

type PageProps = {
  searchParams?: Promise<PageSearchParams>;
};

export default async function AuditLogsPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const query = auditLogQueryFromParams(params);
  const selectedRequestId = firstParam(params.selected_request_id);

  const supabase = await createClient();
  const [
    {
      data: { session },
    },
    {
      data: { user },
    },
  ] = await Promise.all([supabase.auth.getSession(), supabase.auth.getUser()]);

  if (!user || !session?.access_token) {
    redirect(`/login?next=${encodeURIComponent("/admin/gacha/audit-logs")}`);
  }

  let logs: AuditLogListItem[] = [];
  let count = 0;
  let limit = Number(query.limit ?? 50);
  let listError = "";

  try {
    const response = await listAuditLogs(session.access_token, query);
    logs = response.data;
    count = response.meta.count;
    limit = response.meta.limit;
  } catch (error) {
    listError = error instanceof Error ? error.message : "接口日志加载失败。";
  }

  let detail: AuditLogDetail | null = null;
  let detailError = "";

  if (selectedRequestId) {
    try {
      detail = await getAuditLogDetail(session.access_token, selectedRequestId);
    } catch (error) {
      detailError = error instanceof Error ? error.message : "日志详情加载失败。";
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 text-slate-900">
      <section className="rounded-lg border border-slate-200 bg-white/85 p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-slate-950 text-white">
              <FileSearch className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950">接口日志</h1>
              <p className="text-sm font-medium text-slate-500">
                {listError ? "查询失败" : `${count} 条记录，当前上限 ${limit}`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-500 sm:grid-cols-4">
            <Metric label="2xx/3xx" value={logs.filter((item) => successStatus(item.response_status)).length} tone="green" />
            <Metric label="4xx" value={logs.filter((item) => clientErrorStatus(item.response_status)).length} tone="amber" />
            <Metric label="5xx" value={logs.filter((item) => serverErrorStatus(item.response_status)).length} tone="red" />
            <Metric label="未完成" value={logs.filter((item) => item.audit_status !== "complete").length} tone="slate" />
          </div>
        </div>

        <form className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
          <FilterInput label="上限" name="limit" defaultValue={query.limit ?? "50"} inputMode="numeric" />
          <FilterSelect
            label="方法"
            name="method"
            defaultValue={query.method ?? ""}
            options={["", "GET", "POST", "PUT", "PATCH", "DELETE"]}
          />
          <FilterInput label="状态码" name="status" defaultValue={query.status ?? ""} inputMode="numeric" />
          <FilterInput label="路由" name="route" defaultValue={query.route ?? ""} />
          <FilterInput label="路径" name="path" defaultValue={query.path ?? ""} />
          <FilterInput label="请求 ID" name="request_id" defaultValue={query.requestId ?? ""} />
          <FilterInput label="用户 ID" name="user_id" defaultValue={query.userId ?? ""} />
          <FilterInput label="鉴权" name="auth_result" defaultValue={query.authResult ?? ""} />
          <FilterInput label="开始时间" name="since" defaultValue={query.since ?? ""} />
          <FilterInput label="结束时间" name="until" defaultValue={query.until ?? ""} />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-2 self-end rounded-lg bg-slate-950 px-4 text-xs font-black tracking-widest text-white transition hover:bg-slate-800"
          >
            <Search className="size-4" />
            查询
          </button>
          <Link
            href="/admin/gacha/audit-logs"
            className="inline-flex h-10 items-center justify-center gap-2 self-end rounded-lg border border-slate-200 bg-white px-4 text-xs font-black tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
          >
            <RefreshCcw className="size-4" />
            重置
          </Link>
        </form>
      </section>

      {listError ? <ErrorPanel message={listError} /> : null}

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1.35fr)_minmax(420px,0.65fr)]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white/90 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] table-fixed border-collapse text-sm">
              <colgroup>
                <col className="w-[150px]" />
                <col className="w-[92px]" />
                <col className="w-[88px]" />
                <col className="w-[300px]" />
                <col className="w-[110px]" />
                <col className="w-[150px]" />
                <col className="w-[120px]" />
                <col className="w-[220px]" />
                <col className="w-[220px]" />
                <col className="w-[76px]" />
              </colgroup>
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-black tracking-widest text-slate-500">
                <tr>
                  <th className="px-3 py-3 text-left">时间</th>
                  <th className="px-3 py-3 text-left">状态</th>
                  <th className="px-3 py-3 text-left">方法</th>
                  <th className="px-3 py-3 text-left">路径</th>
                  <th className="px-3 py-3 text-left">路由</th>
                  <th className="px-3 py-3 text-left">用户</th>
                  <th className="px-3 py-3 text-left">鉴权</th>
                  <th className="px-3 py-3 text-left">请求体</th>
                  <th className="px-3 py-3 text-left">响应体</th>
                  <th className="px-3 py-3 text-right">详情</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.length === 0 ? (
                  <tr>
                    <td className="px-3 py-12 text-center text-sm font-semibold text-slate-400" colSpan={10}>
                      没有匹配记录
                    </td>
                  </tr>
                ) : (
                  logs.map((item) => (
                    <tr
                      key={item.request_id}
                      className={
                        item.request_id === selectedRequestId
                          ? "bg-slate-950/[0.03]"
                          : "bg-white transition hover:bg-slate-50"
                      }
                    >
                      <td className="px-3 py-3 align-top">
                        <div className="font-semibold text-slate-800">{formatDate(item.started_at)}</div>
                        <div className="mt-1 font-mono text-[11px] text-slate-400">{shortId(item.request_id)}</div>
                      </td>
                      <td className="px-3 py-3 align-top">
                        <StatusBadge status={item.response_status} />
                        <div className="mt-1 text-xs font-medium text-slate-400">{formatDuration(item.duration_ms)}</div>
                      </td>
                      <td className="px-3 py-3 align-top">
                        <span className="font-mono text-xs font-bold text-slate-700">{item.method}</span>
                      </td>
                      <td className="px-3 py-3 align-top">
                        <div className="truncate font-semibold text-slate-800" title={fullPath(item)}>
                          {fullPath(item)}
                        </div>
                        {item.error_code ? (
                          <div className="mt-1 truncate text-xs font-semibold text-rose-600" title={item.error_message ?? ""}>
                            {item.error_code}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-3 py-3 align-top text-xs font-bold text-slate-500">{item.route ?? "-"}</td>
                      <td className="px-3 py-3 align-top font-mono text-[11px] text-slate-500" title={item.user_id ?? ""}>
                        {item.user_id ? shortId(item.user_id) : "-"}
                      </td>
                      <td className="px-3 py-3 align-top">
                        <AuthBadge value={item.auth_result} />
                      </td>
                      <td className="px-3 py-3 align-top">
                        <Preview value={item.request_body_preview} truncated={item.request_body_truncated} size={item.request_body_size} />
                      </td>
                      <td className="px-3 py-3 align-top">
                        <Preview value={item.response_body_preview} truncated={item.response_body_truncated} size={item.response_body_size} />
                      </td>
                      <td className="px-3 py-3 text-right align-top">
                        <Link
                          href={selectedHref(query, item.request_id)}
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-400 hover:text-slate-950"
                          title="查看详情"
                        >
                          <Eye className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white/90 shadow-sm">
          {selectedRequestId ? (
            detail ? (
              <AuditDetailPanel detail={detail} query={query} />
            ) : (
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-base font-black text-slate-950">日志详情</h2>
                  <Link href={clearSelectedHref(query)} className="text-xs font-bold text-slate-500 hover:text-slate-950">
                    关闭
                  </Link>
                </div>
                <ErrorPanel message={detailError || "日志详情不可用。"} compact />
              </div>
            )
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 p-8 text-center text-slate-400">
              <Activity className="size-10" />
              <h2 className="text-base font-black text-slate-600">日志详情</h2>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function FilterInput({
  label,
  name,
  defaultValue,
  inputMode,
}: {
  label: string;
  name: string;
  defaultValue: string;
  inputMode?: "numeric";
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-black tracking-widest text-slate-400">{label}</span>
      <input
        className="h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-slate-500"
        defaultValue={defaultValue}
        inputMode={inputMode}
        name={name}
      />
    </label>
  );
}

function FilterSelect({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-black tracking-widest text-slate-400">{label}</span>
      <select
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-500"
        defaultValue={defaultValue}
        name={name}
      >
        {options.map((option) => (
          <option key={option || "all"} value={option}>
            {option || "全部"}
          </option>
        ))}
      </select>
    </label>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "green" | "amber" | "red" | "slate" }) {
  const toneClass = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    red: "border-rose-200 bg-rose-50 text-rose-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  }[tone];

  return (
    <div className={`rounded-lg border px-3 py-2 ${toneClass}`}>
      <div className="text-[11px] tracking-widest opacity-70">{label}</div>
      <div className="mt-1 text-lg font-black leading-none">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: number | null }) {
  if (!status) {
    return <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-black text-slate-500">PENDING</span>;
  }

  const className = serverErrorStatus(status)
    ? "bg-rose-100 text-rose-700"
    : clientErrorStatus(status)
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-700";

  return <span className={`inline-flex rounded-md px-2 py-1 text-xs font-black ${className}`}>{status}</span>;
}

function AuthBadge({ value }: { value: string }) {
  const ok = value === "authenticated";
  const className = ok ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600";
  const Icon = ok ? CheckCircle2 : ShieldAlert;

  return (
    <span className={`inline-flex max-w-full items-center gap-1 rounded-md px-2 py-1 text-xs font-black ${className}`}>
      <Icon className="size-3" />
      <span className="truncate">{value}</span>
    </span>
  );
}

function Preview({ value, truncated, size }: { value: string; truncated: boolean | null; size: number | null }) {
  return (
    <div className="min-w-0">
      <code className="line-clamp-2 whitespace-normal break-all font-mono text-[11px] leading-5 text-slate-600">
        {value || "-"}
      </code>
      <div className="mt-1 flex items-center gap-2 text-[11px] font-bold text-slate-400">
        <span>{formatBytes(size)}</span>
        {truncated ? <span className="text-amber-600">TRUNCATED</span> : null}
      </div>
    </div>
  );
}

function AuditDetailPanel({ detail, query }: { detail: AuditLogDetail; query: AuditLogQuery }) {
  return (
    <div className="flex max-h-[calc(100vh-9rem)] flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 p-5">
        <div className="min-w-0">
          <h2 className="text-base font-black text-slate-950">日志详情</h2>
          <div className="mt-1 truncate font-mono text-xs text-slate-500" title={detail.request_id}>
            {detail.request_id}
          </div>
        </div>
        <Link href={clearSelectedHref(query)} className="shrink-0 text-xs font-bold text-slate-500 hover:text-slate-950">
          关闭
        </Link>
      </div>

      <div className="space-y-4 overflow-y-auto p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <DetailItem label="时间" value={formatDate(detail.started_at)} />
          <DetailItem label="状态" value={detail.response_status ? String(detail.response_status) : "-"} />
          <DetailItem label="方法" value={detail.method} />
          <DetailItem label="路由" value={detail.route ?? "-"} />
          <DetailItem label="鉴权" value={detail.auth_result} />
          <DetailItem label="耗时" value={formatDuration(detail.duration_ms)} />
          <DetailItem label="用户" value={detail.user_id ?? "-"} wide />
          <DetailItem label="路径" value={fullPath(detail)} wide />
          <DetailItem label="上游" value={detail.upstream_url ?? "-"} wide />
          {detail.error_code ? <DetailItem label="错误" value={`${detail.error_code}: ${detail.error_message ?? ""}`} wide /> : null}
        </div>

        <HeadersBlock title="请求头" value={detail.request_headers} />
        <BodyBlock
          title="请求体"
          encoding={detail.request_body_encoding}
          json={detail.request_body_json}
          text={detail.request_body_text}
          base64={detail.request_body_base64}
          size={detail.request_body_size}
          truncated={detail.request_body_truncated}
        />
        <HeadersBlock title="响应头" value={detail.response_headers} />
        <BodyBlock
          title="响应体"
          encoding={detail.response_body_encoding}
          json={detail.response_body_json}
          text={detail.response_body_text}
          base64={detail.response_body_base64}
          size={detail.response_body_size}
          truncated={detail.response_body_truncated}
        />
      </div>
    </div>
  );
}

function DetailItem({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 ${wide ? "sm:col-span-2" : ""}`}>
      <div className="text-[11px] font-black tracking-widest text-slate-400">{label}</div>
      <div className="mt-1 break-all font-mono text-xs font-semibold text-slate-700">{value}</div>
    </div>
  );
}

function HeadersBlock({ title, value }: { title: string; value: Record<string, string[]> | null }) {
  return <CodeBlock title={title} value={value ? JSON.stringify(value, null, 2) : ""} />;
}

function BodyBlock({
  title,
  encoding,
  json,
  text,
  base64,
  size,
  truncated,
}: {
  title: string;
  encoding: string | null;
  json: unknown | null;
  text: string | null;
  base64: string | null;
  size: number | null;
  truncated: boolean | null;
}) {
  const value = json != null ? JSON.stringify(json, null, 2) : text || base64 || "";
  const meta = [encoding, formatBytes(size), truncated ? "TRUNCATED" : ""].filter(Boolean).join(" / ");
  return <CodeBlock title={title} value={value} meta={meta} />;
}

function CodeBlock({ title, value, meta }: { title: string; value: string; meta?: string }) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <h3 className="text-xs font-black tracking-widest text-slate-500">{title}</h3>
        {meta ? <span className="text-[11px] font-bold text-slate-400">{meta}</span> : null}
      </div>
      <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-all bg-slate-950 p-3 font-mono text-xs leading-5 text-slate-100">
        {value || "-"}
      </pre>
    </section>
  );
}

function ErrorPanel({ message, compact = false }: { message: string; compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-rose-200 bg-rose-50 text-rose-700 ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0" />
        <div className="font-semibold">{message}</div>
      </div>
    </div>
  );
}

function auditLogQueryFromParams(params: PageSearchParams): AuditLogQuery {
  return {
    limit: firstParam(params.limit) || "50",
    requestId: firstParam(params.request_id),
    userId: firstParam(params.user_id),
    method: firstParam(params.method),
    path: firstParam(params.path),
    route: firstParam(params.route),
    authResult: firstParam(params.auth_result),
    status: firstParam(params.status),
    since: firstParam(params.since),
    until: firstParam(params.until),
  };
}

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0]?.trim() || undefined;
  }
  return value?.trim() || undefined;
}

function selectedHref(query: AuditLogQuery, requestId: string) {
  const params = pageSearchParams(query);
  params.set("selected_request_id", requestId);
  return `/admin/gacha/audit-logs?${params.toString()}`;
}

function clearSelectedHref(query: AuditLogQuery) {
  const params = pageSearchParams(query);
  const suffix = params.toString();
  return `/admin/gacha/audit-logs${suffix ? `?${suffix}` : ""}`;
}

function pageSearchParams(query: AuditLogQuery) {
  const params = new URLSearchParams();
  setParam(params, "limit", query.limit);
  setParam(params, "request_id", query.requestId);
  setParam(params, "user_id", query.userId);
  setParam(params, "method", query.method);
  setParam(params, "path", query.path);
  setParam(params, "route", query.route);
  setParam(params, "auth_result", query.authResult);
  setParam(params, "status", query.status);
  setParam(params, "since", query.since);
  setParam(params, "until", query.until);
  return params;
}

function setParam(params: URLSearchParams, key: string, value?: string) {
  if (value?.trim()) {
    params.set(key, value.trim());
  }
}

function fullPath(item: { path: string; raw_query?: string | null }) {
  return item.raw_query ? `${item.path}?${item.raw_query}` : item.path;
}

function successStatus(status: number | null) {
  return status != null && status < 400;
}

function clientErrorStatus(status: number | null) {
  return status != null && status >= 400 && status < 500;
}

function serverErrorStatus(status: number | null) {
  return status != null && status >= 500;
}

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function formatDuration(value: number | null) {
  if (value == null) {
    return "-";
  }
  return `${value}ms`;
}

function formatBytes(value: number | null) {
  if (value == null) {
    return "-";
  }
  if (value < 1024) {
    return `${value}B`;
  }
  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)}KB`;
  }
  return `${(value / 1024 / 1024).toFixed(2)}MB`;
}

function shortId(value: string) {
  if (value.length <= 14) {
    return value;
  }
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}
