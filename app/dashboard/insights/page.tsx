import { InsightsCharts } from "@/components/insights-charts"
import { InsightsDatePicker } from "@/components/insights-date-picker"
import { InsightsTabs } from "@/components/insights-tabs"

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-col md:flex-row">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
          <p className="text-muted-foreground">View performance metrics for your articles.</p>
        </div>
        <InsightsDatePicker />
      </div>
      <InsightsTabs />
      <InsightsCharts />
    </div>
  )
}

