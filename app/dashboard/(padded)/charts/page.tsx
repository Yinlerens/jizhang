import PeriodicTableWorkbench from "@/components/charts/PeriodicTableWorkbench";

export default function ChartsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">图表实验室</h2>
      </div>
      <PeriodicTableWorkbench />
    </div>
  );
}
