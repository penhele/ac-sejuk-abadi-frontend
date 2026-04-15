"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/order";
import { CheckCircle2, Clock, Package, Banknote, XCircle } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export function OrderStats({ orders }: { orders: Order[] }) {
  const totalRevenue = orders
    .filter((o) => o.status !== "Dibatalkan")
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const stats = [
    { 
      label: "Total Pendapatan", 
      value: formatCurrency(totalRevenue), 
      icon: <Banknote className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50 dark:bg-emerald-900/20" 
    },
    { 
      label: "Total Pesanan", 
      value: orders.length, 
      icon: <Package className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50 dark:bg-blue-900/20" 
    },
    { 
      label: "Perlu Diproses", 
      value: orders.filter(o => o.status === "Pending" || o.status === "Diproses").length, 
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50 dark:bg-amber-900/20" 
    },
    { 
      label: "Selesai", 
      value: orders.filter(o => o.status === "Selesai").length, 
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50 dark:bg-indigo-900/20" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.bg} shrink-0`}>
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate">
                {stat.label}
              </p>
              <p className="text-xl font-bold truncate tracking-tight text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}