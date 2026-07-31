import { GitCompareArrows, History, PackageCheck } from "lucide-react";
import { createControlPlaneAdminPageClient } from "@/lib/control-plane/admin";
import { listAllAuthUsers } from "@/lib/control-plane/auth-users";
import { hasControlCapability } from "@/lib/control-plane/roles";
import { diffReleaseSnapshots, summarizeReleaseSnapshot } from "@/lib/control-plane/release-summary";
import { RollbackReleaseForm } from "./RollbackReleaseForm";

export const dynamic = "force-dynamic";

type ReleaseRow = {
  id: string;
  release_number: number;
  operation: "publish" | "rollback";
  source_release_id: string | null;
  snapshot: unknown;
  snapshot_sha256: string;
  notes: string;
  published_by: string | null;
  published_at: string;
};

export default async function ReleasesPage() {
  const adminClient = await createControlPlaneAdminPageClient(
    "/console/releases",
    "configuration:read",
  );
  if (!adminClient.ok) {
    return <Failure message={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  const [releasesResult, headResult, authUsers] = await Promise.all([
    supabase
      .schema("gacha")
      .from("releases")
      .select("id, release_number, operation, source_release_id, snapshot, snapshot_sha256, notes, published_by, published_at")
      .eq("project_id", context.project.id)
      .eq("environment_id", context.environment.id)
      .order("release_number", { ascending: false })
      .limit(50),
    supabase
      .schema("gacha")
      .from("environment_release_heads")
      .select("release_id")
      .eq("project_id", context.project.id)
      .eq("environment_id", context.environment.id)
      .maybeSingle(),
    listAllAuthUsers(supabase).catch(() => []),
  ]);
  if (releasesResult.error || headResult.error) {
    return <Failure message="发布历史暂时不可用。" />;
  }

  const releases = (releasesResult.data ?? []) as ReleaseRow[];
  const currentReleaseId = headResult.data?.release_id as string | undefined;
  const authUserById = new Map(authUsers.map((user) => [user.id, user]));
  const releaseNumberById = new Map(releases.map((release) => [release.id, release.release_number]));
  const canRollback = hasControlCapability(context.role, "release:manage");

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase text-[#39746c]">Release governance</div>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">发布历史</h1>
          <p className="mt-1 text-sm text-slate-500">{context.project.name} / {context.environment.name}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <History className="size-4 text-[#39746c]" />
          {releases.length} 个发布
        </div>
      </header>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="divide-y divide-slate-100">
          {releases.map((release, index) => {
            const olderRelease = releases[index + 1];
            const summary = summarizeReleaseSnapshot(release.snapshot);
            const diff = diffReleaseSnapshots(olderRelease?.snapshot ?? {}, release.snapshot);
            const isCurrent = release.id === currentReleaseId;
            return (
              <article className="grid gap-4 px-4 py-4 xl:grid-cols-[150px_minmax(0,1fr)_280px] xl:items-center" key={release.id}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold tabular-nums text-slate-950">#{release.release_number}</span>
                    <span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase ${release.operation === "rollback" ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200" : "bg-slate-100 text-slate-600"}`}>{release.operation}</span>
                    {isCurrent ? <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">当前</span> : null}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{formatTime(release.published_at)}</div>
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-slate-800">{release.notes || "-"}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><PackageCheck className="size-3.5" />{summary.items} 条目 / {summary.banners} 池 / {summary.versions} 版本 / {summary.ruleSets} 规则</span>
                    <span className="inline-flex items-center gap-1"><GitCompareArrows className="size-3.5" />+{diff.added} / -{diff.removed} / ~{diff.changed}</span>
                    {release.source_release_id ? <span>来源 #{releaseNumberById.get(release.source_release_id) ?? "历史"}</span> : null}
                  </div>
                  <div className="mt-1 truncate font-mono text-[10px] text-slate-400">{release.snapshot_sha256} / {release.published_by ? authUserById.get(release.published_by)?.email ?? release.published_by : "system"}</div>
                </div>

                <div className="flex justify-end">
                  {!isCurrent && canRollback ? <RollbackReleaseForm releaseId={release.id} releaseNumber={release.release_number} /> : <span className="text-xs text-slate-400">{isCurrent ? "引擎读取中" : "只读"}</span>}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Failure({ message }: { message: string }) {
  return <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">{message}</section>;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Hong_Kong" }).format(new Date(value));
}
