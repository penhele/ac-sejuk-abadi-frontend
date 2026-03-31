"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/admin/shared/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Jan", sales: 4000 }, { name: "Feb", sales: 3000 }, { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 }, { name: "Mei", sales: 1890 }, { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
];

export function SalesChart() {
  return (
    <Card className="lg:col-span-2 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Statistik Penjualan 
          <Badge variant="secondary" className="text-[10px] font-normal">Live Update</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-75 w-full">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Area type="monotone" dataKey="sales" stroke="#2563eb" fill="url(#colorSales)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}