import ChartPlaceholder from "@/components/charts/ChartPlaceholder";

export default function MarketChartPage() {
  return (
    <ChartPlaceholder
      title="金融分时"
      type="Market"
      description="承载分时、成交量、MACD、盘口和深度图等金融图表组合"
    />
  );
}
