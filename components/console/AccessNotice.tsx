import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export function AccessNotice({
  message,
  showLogin = false,
}: {
  message: string;
  showLogin?: boolean;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6f5] p-6 text-slate-950">
      <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 ring-1 ring-amber-200">
            <ShieldAlert className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase text-slate-400">GachaOps access</div>
            <h1 className="mt-1 text-xl font-semibold">无法进入 Console</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
            {showLogin ? (
              <Link
                className="mt-5 inline-flex h-9 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                href="/login?next=/console"
              >
                重新登录
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
