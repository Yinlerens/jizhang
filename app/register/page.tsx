"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, PanelLeft, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/console`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      toast.error("该邮箱已经注册，请直接登录。");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
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
          <div className="text-xs font-semibold uppercase text-[#9fc7bf]">Organization access</div>
          <p className="mt-2 max-w-56 text-sm leading-6 text-white/72">
            身份创建后仍需由组织所有者或管理员分配角色，系统不会自动授予控制台权限。
          </p>
        </div>
      </aside>

      <section className="flex items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {success ? (
            <div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                <CheckCircle2 className="size-5" />
              </div>
              <h1 className="mt-5 text-2xl font-semibold">检查邮箱</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                验证链接已发送。完成验证并获得组织角色后，即可进入 Console。
              </p>
              <Link
                className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                href="/login?next=/console"
              >
                <ArrowRight className="size-4" />
                返回登录
              </Link>
            </div>
          ) : (
            <>
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-[#28635c] ring-1 ring-emerald-200">
                <UserPlus className="size-5" />
              </div>
              <h1 className="mt-5 text-2xl font-semibold">创建 GachaOps 身份</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">建议使用工作邮箱注册。</p>

              <form className="mt-7 space-y-5" onSubmit={handleRegister}>
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
                    autoComplete="new-password"
                    className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-[#39746c] focus:ring-2 focus:ring-[#39746c]/15"
                    id="password"
                    minLength={6}
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
                  {loading ? "正在创建" : "创建身份"}
                </button>
              </form>

              <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
                已有账号？
                <Link className="ml-1 font-semibold text-[#28635c] hover:text-[#143f3b]" href="/login?next=/console">
                  直接登录
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
