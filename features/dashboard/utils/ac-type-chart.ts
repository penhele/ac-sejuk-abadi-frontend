import { ChartConfig } from "@/components/ui/chart";
import { AcType } from "@/features/acType/types/ac-type";

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function createAcTypeChart(acTypes: AcType[]) {
  const chartConfig = {
    total: {
      label: "Jumlah Produk",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const chartData = acTypes.map((acType) => ({
    acType: acType.name,
    total: acType._count.products,
  }));

  return {
    chartConfig,
    chartData,
  };
}
