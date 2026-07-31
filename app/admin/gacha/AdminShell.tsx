"use client";

import type { ReactNode } from "react";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarRange,
  Dices,
  FileSearch,
  FolderKanban,
  History,
  LoaderCircle,
  LogOut,
  PackageSearch,
  PanelLeft,
  ScrollText,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  controlRoleLabels,
  hasControlCapability,
  type ControlCapability,
  type ControlRole,
} from "@/lib/control-plane/roles";
import type { ControlPlaneWorkspaceOption } from "@/lib/control-plane/access";
import { WorkspaceSwitcher } from "@/components/console/WorkspaceSwitcher";

type NavigationItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  capability?: ControlCapability;
};

const navigationGroups: { label: string; items: NavigationItem[] }[] = [
  {
    label: "日常操作",
    items: [
      { href: "/console/pools", label: "卡池管理", icon: CalendarRange },
      {
        href: "/admin/gacha/items",
        label: "内容库",
        icon: PackageSearch,
        capability: "configuration:read",
      },
      {
        href: "/sandbox",
        label: "抽取预览",
        icon: Dices,
        capability: "configuration:read",
      },
      {
        href: "/console/releases",
        label: "发布记录",
        icon: History,
        capability: "configuration:read",
      },
    ],
  },
  {
    label: "管理",
    items: [
      {
        href: "/console/team",
        label: "团队成员",
        icon: Users,
        capability: "organization:manage",
      },
      {
        href: "/console/workspaces",
        label: "项目环境",
        icon: FolderKanban,
        capability: "organization:manage",
      },
      {
        href: "/admin/gacha/audit-logs",
        label: "API 请求记录",
        icon: FileSearch,
        capability: "audit:view",
      },
      {
        href: "/console/activity",
        label: "操作记录",
        icon: ScrollText,
        capability: "audit:view",
      },
    ],
  },
];

export default function AdminShell({
  activeEnvironmentId,
  children,
  contextPinned,
  environmentName,
  organizationName,
  projectName,
  role,
  userEmail,
  workspaceOptions,
}: {
  activeEnvironmentId: string;
  children: ReactNode;
  contextPinned: boolean;
  environmentName: string;
  organizationName: string;
  projectName: string;
  role: ControlRole;
  userEmail: string;
  workspaceOptions: ControlPlaneWorkspaceOption[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f5] text-slate-950 lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:h-screen lg:w-60 lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <Link className="flex min-w-0 items-center gap-3" href="/console/pools">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#143f3b] text-white">
              <PanelLeft className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-semibold">GachaOps</span>
              <span className="block truncate text-[11px] font-medium text-slate-400">LiveOps Console</span>
            </span>
          </Link>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600 lg:hidden">
            {controlRoleLabels[role]}
          </span>
        </div>

        <div className="border-b border-slate-200 px-4 py-3">
          <WorkspaceSwitcher
            activeEnvironmentId={activeEnvironmentId}
            disabled={contextPinned}
            options={workspaceOptions}
          />
          <div className="mt-2 flex min-w-0 items-center justify-between gap-2 px-0.5">
            <span className="truncate text-[11px] text-slate-400">{organizationName} / {projectName}</span>
            <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase text-emerald-700 ring-1 ring-emerald-200">
              {environmentName}
            </span>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-2 py-3 lg:min-h-0 lg:flex-1 lg:flex-col lg:gap-5 lg:overflow-y-auto lg:px-3 lg:py-4">
          {navigationGroups.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.capability || hasControlCapability(role, item.capability),
            );

            if (visibleItems.length === 0) {
              return null;
            }

            return (
              <div className="flex shrink-0 gap-1 lg:block" key={group.label}>
                <div className="mb-2 hidden px-2 text-[10px] font-bold uppercase text-slate-400 lg:block">
                  {group.label}
                </div>
                <div className="flex gap-1 lg:flex-col">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/console" && pathname.startsWith(`${item.href}/`));

                    return (
                      <Link
                        className={`flex h-9 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium transition lg:w-full lg:gap-2 lg:px-3 lg:text-sm ${
                          isActive
                            ? "bg-[#e7f1ef] text-[#143f3b] ring-1 ring-inset ring-[#c9dfda]"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                        }`}
                        href={item.href}
                        key={item.href}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="whitespace-nowrap">{item.label}</span>
                        <NavigationPendingIndicator />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden border-t border-slate-200 p-3 lg:block">
          <div className="mb-3 flex items-center justify-between gap-2 px-2">
            <div className="min-w-0">
              <div className="truncate text-xs font-medium text-slate-700">{userEmail}</div>
              <div className="mt-0.5 text-[11px] text-slate-400">{controlRoleLabels[role]}</div>
            </div>
          </div>
          <form action="/auth/signout" method="post" suppressHydrationWarning>
            <button
              className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
              type="submit"
            >
              <LogOut className="size-4" />
              退出登录
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto lg:h-screen">
        <div className="mx-auto w-full max-w-[1680px] p-3 sm:p-5 lg:p-6">{children}</div>
      </main>
    </div>
  );
}

function NavigationPendingIndicator() {
  const { pending } = useLinkStatus();

  return (
    <>
      <span
        aria-hidden="true"
        className={`ml-auto flex size-4 shrink-0 items-center justify-center transition-opacity duration-150 ${
          pending ? "opacity-100 delay-100" : "opacity-0 delay-0"
        }`}
      >
        <LoaderCircle className={`size-3.5 ${pending ? "animate-spin" : ""}`} />
      </span>
      <span aria-live="polite" className="sr-only">
        {pending ? "正在打开页面" : ""}
      </span>
    </>
  );
}
