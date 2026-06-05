"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Januari", projects: 45, services: 80 },
  { month: "Februari", projects: 52, services: 95 },
  { month: "Maret", projects: 48, services: 110 },
  { month: "April", projects: 61, services: 105 },
  { month: "Mei", projects: 59, services: 120 },
  { month: "Juni", projects: 75, services: 140 },
];

const chartConfig = {
  projects: {
    label: "Proyek",
    color: "hsl(var(--chart-1))",
  },
  services: {
    label: "Servis Rutin",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DashboardChart() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Statistik Pengerjaan</CardTitle>
        <CardDescription>
          Data proyek dan servis rutin dalam 6 bulan terakhir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="services"
              type="monotone"
              fill="var(--color-services)"
              fillOpacity={0.4}
              stroke="var(--color-services)"
              stackId="1"
            />
            <Area
              dataKey="projects"
              type="monotone"
              fill="var(--color-projects)"
              fillOpacity={0.4}
              stroke="var(--color-projects)"
              stackId="1"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Peningkatan 15.2% bulan ini <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Januari - Juni 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
