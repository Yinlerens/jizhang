export default function PlayerSupportLoading() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="玩家客服加载中">
      <div className="h-16 animate-pulse border-b border-slate-200 bg-slate-100/70" />
      <div className="h-20 animate-pulse border-y border-slate-200 bg-white" />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="h-28 animate-pulse rounded-lg border border-slate-200 bg-white" key={index} />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-lg border border-slate-200 bg-white" />
    </div>
  );
}
