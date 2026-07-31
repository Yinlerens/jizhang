"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, Loader2, PanelLeft } from "lucide-react";
import { toast } from "sonner";
import { sanitizeNextPath } from "@/lib/auth/redirect";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("登录成功");
    router.replace(getNextPath());
    router.refresh();
  };

  return (
    <main className="grid min-h-screen bg-[#f4f6f5] text-slate-950 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="flex min-h-44 flex-col justify-between bg-[#143f3b] p-6 text-white lg:min-h-screen lg:p-8">
        <Link className="flex items-center gap-3" href="/console">
          <span className="flex size-10 items-center justify-center rounded-lg bg-white text-[#143f3b]">
            <PanelLeft className="size-5" />
          </span>
          <span>
            <span className="block text-lg font-semibold">GachaOps</span>
            <span className="block text-xs text-white/60">LiveOps Console</span>
          </span>
        </Link>
        <div className="mt-8 lg:mt-0">
          <div className="text-xs font-semibold uppercase text-[#9fc7bf]">Control plane</div>
          <p className="mt-2 max-w-56 text-sm leading-6 text-white/72">
            进入组织工作区，管理内容目录、概率规则、发布版本和审计记录。
          </p>
        </div>
      </aside>

      <section className="flex items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-[#28635c] ring-1 ring-emerald-200">
            <KeyRound className="size-5" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold">登录 Console</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">使用已加入组织的工作邮箱继续。</p>

          <form className="mt-7 space-y-5" onSubmit={handleLogin}>
            <label className="block" htmlFor="email">
              <span className="text-sm font-medium text-slate-700">邮箱</span>
              <input
                autoComplete="email"
                className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-[#39746c] focus:ring-2 focus:ring-[#39746c]/15"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@company.com"
                required
                type="email"
                value={email}
              />
            </label>

            <label className="block" htmlFor="password">
              <span className="text-sm font-medium text-slate-700">密码</span>
              <input
                autoComplete="current-password"
                className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-[#39746c] focus:ring-2 focus:ring-[#39746c]/15"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>

            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
              type="submit"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
              {loading ? "正在登录" : "进入工作区"}
            </button>
          </form>

          <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
            需要创建身份？
            <Link className="ml-1 font-semibold text-[#28635c] hover:text-[#143f3b]" href="/register">
              注册账号
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function getNextPath() {
  if (typeof window === "undefined") {
    return "/console";
  }

  return sanitizeNextPath(new URLSearchParams(window.location.search).get("next"));
}
