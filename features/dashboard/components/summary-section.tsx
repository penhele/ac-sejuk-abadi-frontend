import { useDashboardStats } from "../hooks/use-dashboard-stats";
import { DashboardChart } from "./dashboard-chart";
import StatCard from "./stat-card";

export default function SummarySection() {
  const statItems = useDashboardStats();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-between-card">
        {statItems.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <DashboardChart />
    </div>
  );
}
