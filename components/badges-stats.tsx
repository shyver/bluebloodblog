"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useResponsiveChart } from "@/hooks/use-responsive-chart"
import { useState, useEffect } from "react"

export function BadgesStats() {
  const chartConfig = useResponsiveChart()
  const [isMounted, setIsMounted] = useState(false)

  // Full dataset
  const fullBadgeAwardData = [
    { name: "First Article", awarded: 1250 },
    { name: "Prolific Writer", awarded: 450 },
    { name: "Comment Master", awarded: 320 },
    { name: "Trending Author", awarded: 180 },
    { name: "Community Favorite", awarded: 210 },
    { name: "First Year", awarded: 890 },
  ]

  // Simplified dataset for smaller screens
  const [badgeAwardData, setBadgeAwardData] = useState(fullBadgeAwardData)

  // Update data based on screen size
  useEffect(() => {
    setIsMounted(true)

    if (chartConfig.simplifyData && chartConfig.maxItems) {
      setBadgeAwardData(fullBadgeAwardData.slice(0, chartConfig.maxItems))
    } else {
      setBadgeAwardData(fullBadgeAwardData)
    }
  }, [chartConfig.simplifyData, chartConfig.maxItems])

  // Prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Distribution</CardTitle>
        <CardDescription className="hidden sm:block">Number of users awarded each badge</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={badgeAwardData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={chartConfig.barSize}
          >
            {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey="name"
              tick={{ fontSize: chartConfig.fontSize }}
              tickFormatter={chartConfig.labelFormatter}
            />
            <YAxis tick={{ fontSize: chartConfig.fontSize }} />
            {chartConfig.showTooltip && <Tooltip />}
            {chartConfig.showLegend && (
              <Legend
                layout={
                  chartConfig.legendPosition === "left" || chartConfig.legendPosition === "right"
                    ? "vertical"
                    : "horizontal"
                }
                verticalAlign={chartConfig.legendPosition === "top" ? "top" : "bottom"}
                align={chartConfig.legendPosition === "right" ? "right" : "center"}
                wrapperStyle={{ fontSize: chartConfig.fontSize }}
              />
            )}
            <Bar dataKey="awarded" fill="#8884d8" name="Users Awarded" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

