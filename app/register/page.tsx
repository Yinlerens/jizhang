"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { CheckCircle2, Sparkles, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      setError("该邮箱已经注册过了，请直接登录。");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="anime-app-shell flex min-h-screen items-center justify-center overflow-x-hidden p-4">
        <div className="anime-surface w-80 space-y-8 p-6 text-center sm:w-[28rem] sm:p-8">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-md border-2 border-[#26223a] bg-[#bdf7b7] text-[#235c3b] shadow-[4px_4px_0_#ff7aa8] dark:border-cyan-200 dark:bg-cyan-300 dark:text-[#10131f]">
            <CheckCircle2 size={26} />
          </div>
          <h2 className="anime-page-title mt-6">注册成功</h2>
          <p className="mt-2 font-bold text-[#8f5b72] dark:text-cyan-100/60">
            请检查您的邮箱以完成验证。验证后即可登录。
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="font-black text-[#26223a] hover:underline dark:text-cyan-50"
            >
              返回登录
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="anime-app-shell flex min-h-screen items-center justify-center overflow-x-hidden p-4">
      <div className="anime-surface w-80 space-y-8 p-6 sm:w-[28rem] sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-md border-2 border-[#26223a] bg-[#ffd657] text-[#26223a] shadow-[4px_4px_0_#ff7aa8] dark:border-cyan-200 dark:bg-cyan-300">
            <Sparkles size={24} />
          </div>
          <h2 className="anime-page-title">
            创建账号
          </h2>
          <p className="mt-2 text-sm font-bold text-[#8f5b72] dark:text-cyan-100/60">
            加入记账管理，开始您的财务健康之旅
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="rounded-md border-2 border-[#e84f80] bg-[#fff1f6] px-4 py-3 text-sm font-bold text-[#b83261] dark:bg-rose-400/10 dark:text-rose-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-black text-[#6e6172] dark:text-cyan-100/70"
              >
                邮箱地址
              </label>
              <input
                id="email"
                type="email"
                required
                className="anime-input mt-2 block w-full px-4 py-3 font-bold"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-black text-[#6e6172] dark:text-cyan-100/70"
              >
                密码
              </label>
              <input
                id="password"
                type="password"
                required
                className="anime-input mt-2 block w-full px-4 py-3 font-bold"
                placeholder="至少6位字符"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="anime-action w-full"
            >
              <UserPlus size={18} />
              {loading ? "正在注册..." : "立即注册"}
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="font-bold text-[#8f5b72] dark:text-cyan-100/60">已有账号？</span>
            <Link
              href="/login"
              className="ml-1 font-black text-[#26223a] hover:underline dark:text-cyan-50"
            >
              登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
