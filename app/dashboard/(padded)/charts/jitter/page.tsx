import ChartPlaceholder from "@/components/charts/ChartPlaceholder";

export default function JitterChartPage() {
  return (
    <ChartPlaceholder
      title="抖动散点"
      type="Jitter"
      description="给高密度散点增加轻微偏移，让重叠数据更容易读"
    />
  );
}
