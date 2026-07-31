"use client";

import { RotateCcw } from "lucide-react";
import { rollbackEnvironmentRelease } from "./actions";

export function RollbackReleaseForm({ releaseId, releaseNumber }: { releaseId: string; releaseNumber: number }) {
  return (
    <form
      action={rollbackEnvironmentRelease}
      className="flex min-w-[280px] items-center gap-2"
      onSubmit={(event) => {
        if (!window.confirm(`确认从发布 #${releaseNumber} 创建新的回滚发布？`)) {
          event.preventDefault();
        }
      }}
    >
      <input name="release_id" type="hidden" value={releaseId} />
      <input
        aria-label={`回滚到发布 #${releaseNumber} 的原因`}
        className="h-8 min-w-0 flex-1 rounded-md border border-slate-200 px-2.5 text-xs outline-none focus:border-rose-400"
        maxLength={2000}
        name="rollback_notes"
        placeholder="回滚原因"
        required
      />
      <button
        aria-label={`回滚到发布 #${releaseNumber}`}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-rose-200 text-rose-700 transition hover:bg-rose-50"
        title="创建回滚发布"
        type="submit"
      >
        <RotateCcw className="size-3.5" />
      </button>
    </form>
  );
}
