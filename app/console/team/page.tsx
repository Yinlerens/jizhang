import { Save, UserPlus, Users } from "lucide-react";
import { createControlPlaneAdminPageClient } from "@/lib/control-plane/admin";
import { listAllAuthUsers } from "@/lib/control-plane/auth-users";
import {
  CONTROL_ROLES,
  controlRoleLabels,
  type ControlRole,
} from "@/lib/control-plane/roles";
import { inviteOrganizationMember, updateOrganizationMember } from "./actions";

export const dynamic = "force-dynamic";

type MemberRow = {
  user_id: string;
  role: ControlRole;
  status: "active" | "suspended";
  joined_at: string | null;
  created_at: string;
};

export default async function TeamPage() {
  const adminClient = await createControlPlaneAdminPageClient(
    "/console/team",
    "organization:manage",
  );
  if (!adminClient.ok) {
    return <AccessFailure message={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  const [membersResult, authUsers] = await Promise.all([
    supabase
      .schema("control")
      .from("organization_members")
      .select("user_id, role, status, joined_at, created_at")
      .eq("organization_id", context.organization.id)
      .order("created_at", { ascending: true }),
    listAllAuthUsers(supabase).catch((error) => {
      console.error("Auth user directory read failed", error);
      return [];
    }),
  ]);
  if (membersResult.error) {
    return <AccessFailure message="团队成员暂时不可用。" />;
  }

  const authUserById = new Map(authUsers.map((user) => [user.id, user]));
  const members = (membersResult.data ?? []) as MemberRow[];
  const assignableRoles = context.role === "owner"
    ? CONTROL_ROLES
    : CONTROL_ROLES.filter((role) => role !== "owner");

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase text-[#39746c]">Access governance</div>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">团队与权限</h1>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Users className="size-4 text-[#39746c]" />
          {members.length} 名成员
        </div>
      </header>

      <section className="border-b border-slate-200 pb-5">
        <form action={inviteOrganizationMember} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto]">
          <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
            邮箱
            <input
              autoComplete="email"
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-900 outline-none focus:border-[#39746c]"
              maxLength={320}
              name="email"
              required
              type="email"
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
            角色
            <select
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-900 outline-none focus:border-[#39746c]"
              defaultValue="viewer"
              name="role"
            >
              {assignableRoles.map((role) => (
                <option key={role} value={role}>{controlRoleLabels[role]}</option>
              ))}
            </select>
          </label>
          <button
            className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#143f3b] px-4 text-sm font-semibold text-white transition hover:bg-[#245a54]"
            type="submit"
          >
            <UserPlus className="size-4" />
            邀请成员
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
              <tr>
                <th className="px-4 py-3">成员</th>
                <th className="px-4 py-3">最近登录</th>
                <th className="px-4 py-3">加入时间</th>
                <th className="px-4 py-3">权限</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((member) => {
                const authUser = authUserById.get(member.user_id);
                const isSelf = member.user_id === context.user.id;
                const canEdit = context.role === "owner" || member.role !== "owner";
                return (
                  <tr key={member.user_id}>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">
                        {authUser?.email ?? member.user_id}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-400">
                        {isSelf ? "当前账号" : authUser?.last_sign_in_at ? "已登录" : "待首次登录"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {formatTime(authUser?.last_sign_in_at)}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {formatTime(member.joined_at ?? member.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <form action={updateOrganizationMember} className="flex items-center gap-2">
                        <input name="user_id" type="hidden" value={member.user_id} />
                        <select
                          className="h-8 w-28 rounded-md border border-slate-200 bg-white px-2 text-xs outline-none disabled:bg-slate-50"
                          defaultValue={member.role}
                          disabled={!canEdit}
                          name="role"
                        >
                          {(context.role === "owner" ? CONTROL_ROLES : assignableRoles).map((role) => (
                            <option key={role} value={role}>{controlRoleLabels[role]}</option>
                          ))}
                        </select>
                        {isSelf ? (
                          <>
                            <input name="status" type="hidden" value="active" />
                            <span className="inline-flex h-8 w-20 items-center justify-center rounded-md bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                              有效
                            </span>
                          </>
                        ) : (
                          <select
                            className="h-8 w-20 rounded-md border border-slate-200 bg-white px-2 text-xs outline-none disabled:bg-slate-50"
                            defaultValue={member.status}
                            disabled={!canEdit}
                            name="status"
                          >
                            <option value="active">有效</option>
                            <option value="suspended">停用</option>
                          </select>
                        )}
                        <button
                          aria-label={`保存 ${authUser?.email ?? member.user_id} 的权限`}
                          className="inline-flex size-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={!canEdit}
                          title="保存权限"
                          type="submit"
                        >
                          <Save className="size-3.5" />
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AccessFailure({ message }: { message: string }) {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      {message}
    </section>
  );
}

function formatTime(value: string | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Hong_Kong",
  }).format(new Date(value));
}
