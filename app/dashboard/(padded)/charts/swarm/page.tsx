import ChartPlaceholder from "@/components/charts/ChartPlaceholder";

export default function SwarmChartPage() {
  return (
    <ChartPlaceholder
      title="蜂群分布"
      type="Swarm"
      description="用于减少类目轴散点重叠，突出密度与离群点"
    />
  );
}
