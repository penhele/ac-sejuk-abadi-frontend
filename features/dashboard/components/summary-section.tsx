import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats } from "../hooks/use-dashboard-stats";
import { DashboardChart } from "./dashboard-chart";
import StatCard from "./stat-card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import useCategories from "@/features/category/hooks/use-categories";
import { Pie, PieChart } from "recharts";

export default function SummarySection() {
  const statItems = useDashboardStats();
  const { data: categories = [] } = useCategories();

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-between-card">
        {statItems.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <DashboardChart />

      <div className="grid">
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Kategori</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer config={chartConfig} className="h-100 w-100">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey={"total"}
                  nameKey={"category"}
                  labelLine={false}
                  label={({ payload, ...props }) => {
                    return (
                      <text
                        cx={props.cx}
                        cy={props.cy}
                        x={props.x}
                        y={props.y}
                        textAnchor={props.textAnchor}
                        dominantBaseline={props.dominantBaseline}
                        fill="var(--foreground)"
                      >
                        {payload.total}
                      </text>
                    );
                  }}
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey={"category"} />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
