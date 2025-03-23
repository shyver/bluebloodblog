import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentArticles } from "@/components/recent-articles"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to BlueBlood Blog admin dashboard.</p>
      </div>
      <DashboardCards />
      <DashboardCharts />
      <RecentArticles />
    </div>
  )
}

