import { Category } from "@/features/category/types/category";

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function createCategoryChart(categories: Category[]) {
  const chartConfig = categories.reduce(
    (acc, category, index) => {
      acc[category.name] = {
        label: category.name,
        color: colors[index % colors.length],
      };

      return acc;
    },
    {
      products: {
        label: "Total",
      },
    } as Record<string, { label: string; color?: string }>,
  );

  const chartData = categories.map((category) => ({
    category: category.name,
    total: category._count.products,
    fill: chartConfig[category.name].color,
  }));

  return {
    chartConfig,
    chartData,
  };
}
