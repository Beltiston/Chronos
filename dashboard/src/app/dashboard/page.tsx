import { StatsCards } from "@/components/dashboard/statsCards";
import { ActivityChart } from "@/components/dashboard/activityChart";
import { RecentSessions } from "@/components/dashboard/recentSessions";
import { TopProjects } from "@/components/dashboard/topProjects";

export default function DashboardPage() {
  return (
    <>
      {/* Stats Overview */}
      <StatsCards />
      
      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Activity Chart - Takes up more space */}
        <div className="lg:col-span-4">
          <ActivityChart />
        </div>
        
        {/* Top Projects - Sidebar widget */}
        <div className="lg:col-span-3">
          <TopProjects />
        </div>
      </div>
      
      {/* Recent Sessions */}
      <RecentSessions />
    </>
  );
}
