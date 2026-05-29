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
    <div className="relative flex w-64 flex-col border-r-2 border-[#26223a] bg-[#fff9ec]/92 shadow-[8px_0_0_rgba(255,122,168,0.22)] backdrop-blur dark:border-cyan-300/25 dark:bg-[#151a2c]/92 dark:shadow-[8px_0_0_rgba(103,232,249,0.08)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,214,87,0.20)_0_8px,transparent_8px_20px)] opacity-45" />

      <div className="relative p-5">
        <h1 className="anime-display flex items-center gap-3 text-xl font-black text-[#26223a] dark:text-cyan-50">
          <div className="grid h-10 w-10 place-items-center rounded-md border-2 border-[#26223a] bg-[#ffd657] text-[#26223a] shadow-[3px_3px_0_#ff7aa8] dark:border-cyan-200 dark:bg-cyan-300">
            <ReceiptText size={21} />
          </div>
          <span className="leading-none">
            AnimationFrame
            <span className="mt-1 block font-mono text-[10px] font-black uppercase text-[#8f5b72] dark:text-cyan-100/60">
              Manga OS
            </span>
          </span>
        </h1>
      </div>

      <nav className="relative flex-1 space-y-2 overflow-y-auto px-4">
        {menuGroups.map((group) => {
          const isOpen = openGroups.includes(group.label);
          const hasActiveItem = group.items.some(
            (item) => pathname === item.href || pathname.startsWith(item.href + "/"),
          );

          return (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className={`flex w-full items-center gap-3 rounded-md border-2 px-3 py-3 text-sm font-black transition duration-200 ${hasActiveItem
                    ? "border-[#26223a] bg-[#ffd657] text-[#26223a] shadow-[3px_3px_0_#26223a] dark:border-cyan-200 dark:bg-cyan-300 dark:text-[#10131f] dark:shadow-none"
                    : "border-transparent text-[#6e6172] hover:border-[#26223a] hover:bg-white/75 hover:text-[#26223a] dark:text-cyan-50/60 dark:hover:border-cyan-300/30 dark:hover:bg-white/10 dark:hover:text-cyan-50"
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
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-dashed border-[#26223a]/25 pl-3 dark:border-cyan-300/20">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm font-black transition duration-200 ${isActive(item.href)
                          ? "border-[#26223a] bg-[#ff7aa8] text-white shadow-[3px_3px_0_#26223a] dark:border-cyan-200 dark:bg-fuchsia-500 dark:shadow-none"
                          : "border-transparent text-[#5f5269] hover:border-[#26223a] hover:bg-white/80 dark:text-cyan-50/70 dark:hover:border-cyan-300/30 dark:hover:bg-white/10"
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

      <div className="relative space-y-4 border-t-2 border-[#26223a] p-4 dark:border-cyan-300/20">
        <div className="flex items-center gap-3 rounded-md border-2 border-[#26223a] bg-white/75 px-3 py-2 shadow-[3px_3px_0_#7dd3fc] dark:border-cyan-300/25 dark:bg-white/10 dark:shadow-none">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-[#26223a] bg-[#bdf7b7] text-sm font-black text-[#26223a] dark:border-cyan-200 dark:bg-cyan-300">
            {user.email?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-black text-[#26223a] dark:text-cyan-50">
              {user.email?.split("@")[0]}
            </p>
            <p className="truncate font-mono text-xs font-bold text-[#8f5b72] dark:text-cyan-100/55">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md border-2 border-transparent px-4 py-3 text-[#6e6172] transition duration-200 hover:border-[#26223a] hover:bg-[#fff1f6] hover:text-[#df4779] dark:text-cyan-50/60 dark:hover:border-rose-300/30 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
        >
          <LogOut size={20} />
          <span className="font-black">注销登出</span>
        </button>
      </div>
    </div>
  );
}
