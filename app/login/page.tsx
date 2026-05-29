"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="anime-app-shell flex min-h-screen items-center justify-center overflow-x-hidden p-4">
      <div className="anime-surface w-80 space-y-8 p-6 sm:w-[28rem] sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-md border-2 border-[#26223a] bg-[#ffd657] text-[#26223a] shadow-[4px_4px_0_#ff7aa8] dark:border-cyan-200 dark:bg-cyan-300">
            <Sparkles size={24} />
          </div>
          <h2 className="anime-page-title">
            欢迎回来
          </h2>
          <p className="mt-2 text-sm font-bold text-[#8f5b72] dark:text-cyan-100/60">
            请输入您的账号信息登录记账管理系统
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
                placeholder="••••••••"
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
              <LogIn size={18} />
              {loading ? "正在登录..." : "登录"}
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="font-bold text-[#8f5b72] dark:text-cyan-100/60">还没有账号？</span>
            <Link
              href="/register"
              className="ml-1 font-black text-[#26223a] hover:underline dark:text-cyan-50"
            >
              立即注册
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
