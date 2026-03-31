import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/order";
import { CheckCircle2, Clock, Package } from "lucide-react";

export function OrderStats({ orders }: { orders: Order[] }) {
  const stats = [
    { 
      label: "Total Pesanan", 
      value: orders.length, 
      icon: <Package className="w-4 h-4 text-blue-600" />,
      bg: "bg-blue-50 dark:bg-blue-900/20" 
    },
    { 
      label: "Perlu Diproses", 
      value: orders.filter(o => o.status === "Pending").length, 
      icon: <Clock className="w-4 h-4 text-amber-600" />,
      bg: "bg-amber-50 dark:bg-amber-900/20" 
    },
    { 
      label: "Selesai", 
      value: orders.filter(o => o.status === "Selesai").length, 
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
      bg: "bg-green-50 dark:bg-green-900/20" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}