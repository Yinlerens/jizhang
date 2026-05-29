interface ChartPlaceholderProps {
  title: string;
  type: string;
  description: string;
}

export default function ChartPlaceholder({ title, type, description }: ChartPlaceholderProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="anime-kicker">Chart Gate</div>
        <h2 className="anime-page-title mt-4">{title}</h2>
        <p className="anime-page-subtitle">{description}</p>
      </div>

      {/* 二级菜单先落完整路由，真实图表可以逐个替换这个占位组件。 */}
      <div className="anime-surface p-8">
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="rounded-md border-2 border-[#26223a] bg-[#ffd657] px-3 py-1 text-xs font-black uppercase text-[#26223a] shadow-[3px_3px_0_#ff7aa8] dark:border-cyan-200 dark:bg-cyan-300">
            {type}
          </div>
          <h3 className="anime-panel-title mt-5 text-xl">图表入口已就位</h3>
          <p className="mt-2 max-w-md text-sm font-bold leading-6 text-[#8f5b72] dark:text-cyan-100/60">
            已作为“图表菜单”的二级页面接入，后续可以直接在这里替换为对应的 ECharts 6 图表。
          </p>
        </div>
      </div>
    </div>
  );
}
