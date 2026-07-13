import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { useCategoryChart } from "../hooks/use-category-chart";
import { useDashboardStats } from "../hooks/use-dashboard-stats";
import { DashboardChart } from "./dashboard-chart";
import StatCard from "./stat-card";
import { useAcTypeChart } from "../hooks/use-ac-type-chart";

export default function SummarySection() {
  const statItems = useDashboardStats();

  const { chartConfig: categoryConfig, chartData: categoryData } =
    useCategoryChart();
  const { chartConfig: acTypeConfig, chartData: acTypeData } = useAcTypeChart();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-between-card">
        {statItems.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <DashboardChart />

      <div className="grid grid-cols-4 gap-inside-card">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Kategori</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer config={categoryConfig} className="">
              <PieChart>
                <Pie
                  data={categoryData}
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

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Tipe AC</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer config={acTypeConfig}>
              <BarChart
                data={acTypeData}
                layout="vertical"
                accessibilityLayer
                margin={{ right: 16 }}
              >
                <CartesianGrid horizontal={false} />

                <YAxis
                  dataKey="acType"
                  type="category"
                  hide
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />

                <XAxis dataKey="total" type="number" hide />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />

                <Bar dataKey="total" fill="var(--chart-1)" radius={8}>
                  <LabelList
                    dataKey="acType"
                    position="insideLeft"
                    offset={8}
                    className="fill-background"
                  />

                  <LabelList
                    dataKey="total"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
