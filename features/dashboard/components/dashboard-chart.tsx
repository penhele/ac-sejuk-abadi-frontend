"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useBrands } from "@/features/brand/hooks/use-brands";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  brands: {
    label: "Proyek",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DashboardChart() {
  const { data: brands } = useBrands();

  const chartData = brands?.map((item) => ({
    brand: item.name,
    total: item._count.products,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perbandingan Antar Brand</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-75 w-full">
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"brand"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis dataKey={"total"} />
            <Area
              dataKey={"total"}
              type="natural"
              fill="var(--color-chart-1)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
