"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { useResponsiveChart } from "@/hooks/use-responsive-chart"
import { useEffect, useState } from "react"

export function InsightsCharts() {
  const chartConfig = useResponsiveChart()
  const [isMounted, setIsMounted] = useState(false)

  // Full datasets
  const fullViewsByArticle = [
    { name: "10 Tips for Better Writing", views: 4500 },
    { name: "The Future of Web Development", views: 3800 },
    { name: "CSS Grid Layout", views: 3200 },
    { name: "Getting Started with React", views: 2900 },
    { name: "Understanding JavaScript", views: 2500 },
  ]

  const fullEngagementOverTime = [
    { date: "2023-01", views: 2500, likes: 350, comments: 120 },
    { date: "2023-02", views: 3000, likes: 400, comments: 150 },
    { date: "2023-03", views: 3500, likes: 450, comments: 180 },
    { date: "2023-04", views: 4000, likes: 500, comments: 200 },
    { date: "2023-05", views: 4500, likes: 550, comments: 220 },
    { date: "2023-06", views: 5000, likes: 600, comments: 240 },
  ]

  const trafficSources = [
    { name: "Search Engines", value: 45 },
    { name: "Social Media", value: 30 },
    { name: "Direct", value: 15 },
    { name: "Referrals", value: 10 },
  ]

  // Simplified datasets for smaller screens
  const [viewsByArticle, setViewsByArticle] = useState(fullViewsByArticle)
  const [engagementOverTime, setEngagementOverTime] = useState(fullEngagementOverTime)

  // Update data based on screen size
  useEffect(() => {
    setIsMounted(true)

    if (chartConfig.simplifyData && chartConfig.maxItems) {
      setViewsByArticle(fullViewsByArticle.slice(0, chartConfig.maxItems))
      setEngagementOverTime(fullEngagementOverTime.slice(0, chartConfig.maxItems))
    } else {
      setViewsByArticle(fullViewsByArticle)
      setEngagementOverTime(fullEngagementOverTime)
    }
  }, [chartConfig.simplifyData, chartConfig.maxItems])

  // Prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Top Articles by Views</CardTitle>
          <CardDescription className="hidden sm:block">Most viewed articles in the selected period</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={viewsByArticle}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: chartConfig.fontSize * 10, // Dynamic left margin based on font size
                bottom: 5,
              }}
              barSize={chartConfig.barSize}
            >
              {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis type="number" tick={{ fontSize: chartConfig.fontSize }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: chartConfig.fontSize }}
                width={chartConfig.fontSize * 10}
                tickFormatter={chartConfig.labelFormatter}
              />
              {chartConfig.showTooltip && <Tooltip />}
              <Bar dataKey="views" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
          <CardDescription className="hidden sm:block">Views, likes, and comments over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={engagementOverTime}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="date"
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
              <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="likes" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="comments" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription className="hidden sm:block">Where your readers are coming from</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={window.innerWidth < 768 ? 60 : 80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  window.innerWidth < 480 ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {chartConfig.showTooltip && <Tooltip />}
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Growth Trends</CardTitle>
          <CardDescription className="hidden sm:block">Cumulative growth in readership</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={engagementOverTime}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="date"
                tick={{ fontSize: chartConfig.fontSize }}
                tickFormatter={chartConfig.labelFormatter}
              />
              <YAxis tick={{ fontSize: chartConfig.fontSize }} />
              {chartConfig.showTooltip && <Tooltip />}
              <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

