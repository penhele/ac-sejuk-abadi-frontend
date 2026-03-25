"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ArrowUpRight 
} from "lucide-react";
// Import Recharts
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";

// Data Dummy untuk Grafik
const chartData = [
  { name: "Jan", sales: 4000, orders: 240 },
  { name: "Feb", sales: 3000, orders: 198 },
  { name: "Mar", sales: 5000, orders: 300 },
  { name: "Apr", sales: 2780, orders: 190 },
  { name: "Mei", sales: 1890, orders: 150 },
  { name: "Jun", sales: 2390, orders: 200 },
  { name: "Jul", sales: 3490, orders: 250 },
];

export default function DashboardPage() {
  const stats = [
    { title: "Total Pendapatan", value: "Rp 120.000.000", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Pesanan", value: "320", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Sedang Mengunjungi", value: "45", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Total Penjualan", value: "210 Produk", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
          <p className="text-muted-foreground text-sm">Ringkasan performa bisnis Anda bulan ini.</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                <h3 className="text-2xl font-bold mt-1 tracking-tight">{item.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART PENJUALAN */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Statistik Penjualan 
              <Badge variant="secondary" className="text-[10px] font-normal">Live Update</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* WELCOME & QUICK LINKS */}
        <Card className="border-none bg-blue-600 text-white shadow-lg overflow-hidden relative">
          <CardContent className="p-8 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Selamat Datang 👋</h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Sistem manajemen Anda siap digunakan. Anda memiliki 12 pesanan baru yang belum diproses hari ini.
            </p>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-between font-semibold group">
                Lihat Pesanan Baru
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <Button variant="outline" className="w-full bg-transparent border-blue-400 hover:bg-blue-500 text-white">
                Kelola Produk
              </Button>
            </div>
          </CardContent>
          {/* Dekorasi lingkaran di background card */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-50"></div>
        </Card>
      </div>
    </div>
  );
}

// Komponen Badge lokal jika belum ada di file terpisah
function Badge({ children, className, variant = "default" }: any) {
  const styles = variant === "secondary" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles} ${className}`}>{children}</span>;
}