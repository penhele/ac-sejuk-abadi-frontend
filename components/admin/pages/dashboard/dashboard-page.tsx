"use client";

import { Badge } from "@/components/admin/shared/badge"; // Kita pindahkan Badge ke shared
import { StatCards } from "@/components/admin/shared/stat-cards"; // Komponen baru
import { SalesChart } from "@/components/admin/shared/sales-chart"; // Komponen baru
import { WelcomeCard } from "@/components/admin/shared/welcome-card"; // Komponen baru

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
        <p className="text-muted-foreground text-sm">Ringkasan performa bisnis Anda bulan ini.</p>
      </div>

      {/* STATS CARDS */}
      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART PENJUALAN */}
        <SalesChart />

        {/* WELCOME & QUICK LINKS */}
        <WelcomeCard />
      </div>
    </div>
  );
}