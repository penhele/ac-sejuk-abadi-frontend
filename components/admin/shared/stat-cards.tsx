import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Package, Users, TrendingUp } from "lucide-react";

export function StatCards() {
  const stats = [
    { title: "Total Pendapatan", value: "Rp 120.000.000", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Pesanan", value: "320", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Sedang Mengunjungi", value: "45", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Total Penjualan", value: "210 Produk", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
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
  );
}