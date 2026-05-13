interface ChartPlaceholderProps {
  title: string;
  type: string;
  description: string;
}

export default function ChartPlaceholder({ title, type, description }: ChartPlaceholderProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h2>
        <p className="text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>

      {/* 二级菜单先落完整路由，真实图表可以逐个替换这个占位组件。 */}
      <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="rounded-lg bg-zinc-100 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {type}
          </div>
          <h3 className="mt-5 text-xl font-black text-zinc-900 dark:text-zinc-50">图表入口已就位</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            已作为“图表菜单”的二级页面接入，后续可以直接在这里替换为对应的 ECharts 6 图表。
          </p>
        </div>
      </div>
    </div>
  );
}
