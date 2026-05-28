"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ReceiptText,
  Table2,
  LogOut,
  ChevronDown,
  Grid3X3,
  Network,
  CircleDotDashed,
  ScatterChart,
  Activity,
  CandlestickChart,
  BotMessageSquare,
  Settings2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import * as Sentry from "@sentry/nextjs";
import type { User } from "@supabase/supabase-js";

interface MenuGroup {
  label: string;
  icon: React.ElementType;
  items: { icon: React.ElementType; label: string; href: string }[];
}

const menuGroups: MenuGroup[] = [
  {
    label: "AI 对话",
    icon: BotMessageSquare,
    items: [
      { icon: BotMessageSquare, label: "对话页", href: "/dashboard/ai" },
      { icon: Settings2, label: "配置页", href: "/dashboard/ai/settings" },
    ],
  },
  {
    label: "图表菜单",
    icon: Grid3X3,
    // 记账菜单按需求隐藏；图表菜单提升为一级，具体图表作为二级入口。
    items: [
      { icon: Table2, label: "元素周期表", href: "/dashboard/charts" },
      { icon: Network, label: "和弦关系", href: "/dashboard/charts/chord" },
      { icon: CircleDotDashed, label: "蜂群分布", href: "/dashboard/charts/swarm" },
      { icon: ScatterChart, label: "抖动散点", href: "/dashboard/charts/jitter" },
      { icon: Activity, label: "断轴柱图", href: "/dashboard/charts/axis-break" },
      { icon: CandlestickChart, label: "金融分时", href: "/dashboard/charts/market" },
    ],
  },
];

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const posthog = usePostHog();

  // 根据当前路径默认展开命中的一级菜单，刷新页面后仍能看到所在二级项。
  const getInitialOpenGroups = () => {
    return menuGroups
      .filter((group) =>
        group.items.some((item) => pathname === item.href || pathname.startsWith(item.href + "/")),
      )
      .map((group) => group.label);
  };

  const [openGroups, setOpenGroups] = useState<string[]>(getInitialOpenGroups);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label],
    );
  };

  const handleLogout = async () => {
    // 登出时重置分析工具的用户身份，防止后续事件关联到已登出用户
    posthog.reset();
    Sentry.setUser(null);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-64 flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center">
            <ReceiptText size={20} className="text-white dark:text-zinc-900" />
          </div>
          AnimationFrame
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuGroups.map((group) => {
          const isOpen = openGroups.includes(group.label);
          const hasActiveItem = group.items.some(
            (item) => pathname === item.href || pathname.startsWith(item.href + "/"),
          );

          return (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition duration-200 ${hasActiveItem && !isOpen
                    ? "text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
              >
                <group.icon size={20} />
                <span className="font-medium flex-1 text-left">{group.label}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="ml-4 space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition duration-200 ${isActive(item.href)
                          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                    >
                      <item.icon size={18} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* 设置入口暂时隐藏；恢复时可作为独立一级链接放回这里。 */}
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-3 px-4">
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
              {user.email?.split("@")[0]}
            </p>
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition duration-200 rounded-xl"
        >
          <LogOut size={20} />
          <span className="font-medium">注销登出</span>
        </button>
      </div>
    </div>
  );
}
