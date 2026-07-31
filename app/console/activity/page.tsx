import { Activity, ShieldCheck } from "lucide-react";
import { createControlPlaneAdminPageClient } from "@/lib/control-plane/admin";
import { listAllAuthUsers } from "@/lib/control-plane/auth-users";
import { getControlActivityLabel } from "@/lib/control-plane/activity";

export const dynamic = "force-dynamic";

type ActivityEventRow = {
  id: number;
  project_id: string | null;
  environment_id: string | null;
  actor_id: string | null;
  event_type: string;
  target_type: string;
  target_id: string;
  summary: string;
  created_at: string;
};

export default async function ActivityPage() {
  const adminClient = await createControlPlaneAdminPageClient("/console/activity", "audit:view");
  if (!adminClient.ok) {
    return <Failure message={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  const [eventsResult, projectsResult, environmentsResult, authUsers] = await Promise.all([
    supabase
      .schema("control")
      .from("activity_events")
      .select("id, project_id, environment_id, actor_id, event_type, target_type, target_id, summary, created_at")
      .eq("organization_id", context.organization.id)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(100),
    supabase.schema("control").from("projects").select("id, name").eq("organization_id", context.organization.id),
    supabase.schema("control").from("environments").select("id, name"),
    listAllAuthUsers(supabase).catch(() => []),
  ]);
  if (eventsResult.error) {
    return <Failure message="操作审计暂时不可用。" />;
  }

  const events = (eventsResult.data ?? []) as ActivityEventRow[];
  const projectNames = new Map((projectsResult.data ?? []).map((project) => [project.id, project.name]));
  const environmentNames = new Map((environmentsResult.data ?? []).map((environment) => [environment.id, environment.name]));
  const authUserById = new Map(authUsers.map((user) => [user.id, user]));

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase text-[#39746c]">Governance ledger</div>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">操作记录</h1>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><ShieldCheck className="size-4 text-[#39746c]" />不可变记录</div>
      </header>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="divide-y divide-slate-100">
          {events.length ? events.map((event) => (
            <article className="grid gap-2 px-4 py-3 sm:grid-cols-[140px_minmax(0,1fr)_220px] sm:items-center" key={event.id}>
              <div><span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{getControlActivityLabel(event.event_type)}</span><div className="mt-1.5 text-[11px] text-slate-400">{formatTime(event.created_at)}</div></div>
              <div className="min-w-0"><div className="truncate text-sm font-medium text-slate-900">{event.summary}</div><div className="mt-0.5 truncate text-xs text-slate-400">{event.actor_id ? authUserById.get(event.actor_id)?.email ?? event.actor_id : "system"}</div></div>
              <div className="text-xs text-slate-500 sm:text-right">{event.project_id ? projectNames.get(event.project_id) ?? "历史项目" : context.organization.name}{event.environment_id ? ` / ${environmentNames.get(event.environment_id) ?? "历史环境"}` : ""}</div>
            </article>
          )) : <div className="flex items-center justify-center gap-2 px-4 py-12 text-sm text-slate-400"><Activity className="size-4" />暂无治理事件</div>}
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
