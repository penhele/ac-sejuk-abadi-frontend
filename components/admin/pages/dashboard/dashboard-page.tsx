"use client";

import { StatCards } from "@/components/admin/shared/stat-cards";
import { SalesChart } from "@/components/admin/shared/sales-chart"; 
import { WelcomeCard } from "@/components/admin/shared/welcome-card"; 

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
        <p className="text-muted-foreground text-sm">Ringkasan performa bisnis Anda bulan ini.</p>
      </div>
      <StatCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart />
        <WelcomeCard />
      </div>
    </div>
  );
}