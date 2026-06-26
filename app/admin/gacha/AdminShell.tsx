"use client";

import { ReactNode, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, Swords, Gift, Settings2, Target, LogOut, Sparkles, Home, FileSearch } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const sidebarLinks = [
  { href: "/admin/gacha/items", label: "物品图鉴", icon: Swords, color: "text-rose-500" },
  { href: "/admin/gacha/banners", label: "卡池类别", icon: Gift, color: "text-amber-500" },
  { href: "/admin/gacha/banner-versions", label: "卡池档期", icon: Database, color: "text-blue-500" },
  { href: "/admin/gacha/banner-items", label: "卡池内容", icon: Target, color: "text-emerald-500" },
  { href: "/admin/gacha/rule-sets", label: "规则模板", icon: Settings2, color: "text-purple-500" },
  { href: "/admin/gacha/audit-logs", label: "接口日志", icon: FileSearch, color: "text-slate-700" },
];

export default function AdminShell({ children, userEmail }: { children: ReactNode, userEmail: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    // Sidebar entrance
    gsap.fromTo(".sidebar",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Page content entrance
    gsap.fromTo(".main-content",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex min-h-screen relative overflow-hidden bg-[#fafafa]">
      {/* Dreamy Background Layer - Optimized */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#fafafa]">
        {/* Static CSS Gradient Background instead of animating blobs */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-pink-100/60 via-white to-blue-50/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-amber-50/60 via-transparent to-transparent" />

        {/* Noise overlay without mix-blend-mode (using simple opacity over solid color) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
      </div>

      {/* Floating Sidebar (Reduced Blur for Performance) */}
      <aside className="sidebar relative z-20 w-64 m-4 mr-0 rounded-3xl border border-white/60 bg-white/70 backdrop-blur-md shadow-xl shadow-pink-100/30 flex-col flex shrink-0 overflow-hidden">
        <div className="h-20 flex items-center px-6 border-b border-white/50 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-pink-400/10 to-transparent" />
          <Link href="/admin/gacha" className="flex items-center gap-2 font-black text-xl text-slate-800 tracking-tight relative z-10 group">
            <div className="p-2 bg-linear-to-br from-pink-400 to-orange-400 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-orange-500">
              祈愿配置
            </span>
          </Link>
        </div>

        <ScrollArea className="flex-1 w-full py-6">
          <div className="px-4 space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "text-slate-800 shadow-sm shadow-pink-100 bg-white/80"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-linear-to-b from-pink-400 to-orange-400 rounded-r-full" />
                  )}

                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-linear-to-r from-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <Icon className={`w-5 h-5 relative z-10 transition-transform group-hover:scale-110 ${isActive ? link.color : ""}`} />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-5 border-t border-white/50 bg-white/20">
          <Link
            href="/"
            className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-pink-500"
          >
            <Home className="h-4 w-4" />
            返回抽卡首页
          </Link>
          <div className="flex flex-col gap-1 mb-4 px-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">管理者</span>
            <span className="text-sm font-medium text-slate-700 truncate">{userEmail}</span>
          </div>
          <form suppressHydrationWarning action="/auth/signout" method="post">
            <button className="flex items-center justify-center gap-2 text-rose-500 hover:text-white hover:bg-rose-400 font-bold w-full px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-rose-200">
              <LogOut className="w-4 h-4" />
              退出系统
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <ScrollArea className="main-content relative z-10 flex-1">
        <div className="p-4">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
