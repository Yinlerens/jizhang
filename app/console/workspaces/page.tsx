import { Boxes, FolderPlus, Layers3, Plus } from "lucide-react";
import { createControlPlaneAdminPageClient } from "@/lib/control-plane/admin";
import { createEnvironment, createProject } from "./actions";

export const dynamic = "force-dynamic";

type ProjectRow = {
  id: string;
  name: string;
  slug: string;
  status: string;
  is_default: boolean;
};

type EnvironmentRow = {
  id: string;
  project_id: string;
  name: string;
  slug: string;
  kind: string;
  status: string;
  is_default: boolean;
};

export default async function WorkspacesPage() {
  const adminClient = await createControlPlaneAdminPageClient(
    "/console/workspaces",
    "organization:manage",
  );
  if (!adminClient.ok) {
    return <Failure message={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  const projectsResult = await supabase
    .schema("control")
    .from("projects")
    .select("id, name, slug, status, is_default")
    .eq("organization_id", context.organization.id)
    .order("created_at", { ascending: true });
  const projects = (projectsResult.data ?? []) as ProjectRow[];
  const environmentsResult = projects.length
    ? await supabase
        .schema("control")
        .from("environments")
        .select("id, project_id, name, slug, kind, status, is_default")
        .in("project_id", projects.map((project) => project.id))
        .order("created_at", { ascending: true })
    : { data: [], error: null };
  if (projectsResult.error || environmentsResult.error) {
    return <Failure message="工作区列表暂时不可用。" />;
  }

  const environments = (environmentsResult.data ?? []) as EnvironmentRow[];
  const projectNameById = new Map(projects.map((project) => [project.id, project.name]));

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase text-[#39746c]">Workspace topology</div>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">项目与环境</h1>
        </div>
        <div className="text-sm font-semibold text-slate-600">{context.organization.name}</div>
      </header>

      <section className="grid gap-5 border-b border-slate-200 pb-5 lg:grid-cols-2">
        <form action={createProject} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-2">
          <div className="flex items-center gap-2 sm:col-span-2">
            <FolderPlus className="size-4 text-[#39746c]" />
            <h2 className="text-sm font-semibold text-slate-900">新建项目</h2>
          </div>
          <WorkspaceInput label="名称" name="name" />
          <WorkspaceInput label="标识" name="slug" pattern="[a-z0-9][a-z0-9-]{1,62}[a-z0-9]" />
          <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#143f3b] px-3 text-xs font-semibold text-white sm:col-span-2" type="submit">
            <Plus className="size-3.5" />
            创建项目与开发环境
          </button>
        </form>

        <form action={createEnvironment} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-2">
          <div className="flex items-center gap-2 sm:col-span-2">
            <Layers3 className="size-4 text-[#39746c]" />
            <h2 className="text-sm font-semibold text-slate-900">为 {context.project.name} 新建环境</h2>
          </div>
          <WorkspaceInput label="名称" name="name" />
          <WorkspaceInput label="标识" name="slug" pattern="[a-z0-9][a-z0-9-]{1,62}[a-z0-9]" />
          <label className="grid gap-1.5 text-xs font-semibold text-slate-600 sm:col-span-2">
            类型
            <select className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-[#39746c]" defaultValue="staging" name="kind">
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </label>
          <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#143f3b] px-3 text-xs font-semibold text-white sm:col-span-2" type="submit">
            <Plus className="size-3.5" />
            创建环境
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">工作区清单</h2>
          <Boxes className="size-4 text-[#39746c]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
              <tr><th className="px-4 py-3">项目</th><th className="px-4 py-3">环境</th><th className="px-4 py-3">类型</th><th className="px-4 py-3">状态</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {environments.map((environment) => (
                <tr key={environment.id}>
                  <td className="px-4 py-3"><div className="font-semibold text-slate-900">{projectNameById.get(environment.project_id)}</div><div className="text-xs text-slate-400">{projects.find((project) => project.id === environment.project_id)?.slug}</div></td>
                  <td className="px-4 py-3"><div className="font-medium text-slate-800">{environment.name}</div><div className="text-xs text-slate-400">{environment.slug}</div></td>
                  <td className="px-4 py-3 text-xs font-semibold uppercase text-slate-500">{environment.kind}</td>
                  <td className="px-4 py-3"><span className={`rounded-md px-2 py-1 text-xs font-semibold ${environment.id === context.environment.id ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-slate-100 text-slate-600"}`}>{environment.id === context.environment.id ? "当前" : environment.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function WorkspaceInput({ label, name, pattern }: { label: string; name: string; pattern?: string }) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
      {label}
      <input className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-[#39746c]" maxLength={120} name={name} pattern={pattern} required />
    </label>
  );
}

function Failure({ message }: { message: string }) {
  return <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">{message}</section>;
}
