"use client";

import { usePathname } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { switchControlPlaneContext } from "@/lib/control-plane/context-actions";
import type { ControlPlaneWorkspaceOption } from "@/lib/control-plane/access";

export function WorkspaceSwitcher({
  activeEnvironmentId,
  disabled,
  options,
}: {
  activeEnvironmentId: string;
  disabled: boolean;
  options: ControlPlaneWorkspaceOption[];
}) {
  const pathname = usePathname();

  return (
    <form action={switchControlPlaneContext} className="relative">
      <input name="return_to" type="hidden" value={pathname} />
      <select
        aria-label="切换项目和环境"
        className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#39746c] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        defaultValue={activeEnvironmentId}
        disabled={disabled || options.length <= 1}
        name="environment_id"
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        {options.map((option) => (
          <option key={option.environmentId} value={option.environmentId}>
            {option.organizationName} / {option.projectName} / {option.environmentName}
          </option>
        ))}
      </select>
      <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
    </form>
  );
}
