"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AcTypePage from "@/features/acType/components/ac-type-page";
import BrandPage from "@/features/brand/compenents/brand-page";
import CategoryPage from "@/features/category/components/category-page";
import StatCard from "./components/stat-card";
import { DashboardChart } from "./components/dashboard-chart";
import { useDashboardStats } from "./hooks/use-dashboard-stats";

export default function DashboardPage() {
  const statItems = useDashboardStats();

  return (
    <div className="space-y-between-items">
      <div className="shadow-2xl bg-linear-to-r text-white rounded-lg from-sky-600 via-blue-600 to-indigo-600 p-8">
        <div className="space-y-between-items-xs">
          <Badge variant={"outline"} className="text-white">
            Dashboard Admin
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Selamat Datang, Admin
          </h1>
          <p className="text-sky-100">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
            molestiae eaque accusantium voluptates et non blanditiis nihil
            quisquam, velit optio.
          </p>
        </div>
      </div>

      <Tabs defaultValue="ringkasan" className="space-y-between-items">
        <TabsList variant={"line"}>
          <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
          <TabsTrigger value="brand">Brand</TabsTrigger>
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="ac-type">Ac Type</TabsTrigger>
        </TabsList>

        <TabsContent value="ringkasan">
          <div className="grid grid-cols-3 gap-between-card">
            {statItems.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brand">
          <BrandPage />
        </TabsContent>

        <TabsContent value="category">
          <CategoryPage />
        </TabsContent>

        <TabsContent value="ac-type">
          <AcTypePage />
        </TabsContent>
      </Tabs>
      
      <DashboardChart />
    </div>
  );
}
