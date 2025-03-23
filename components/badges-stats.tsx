"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

export function BadgesStats() {
  // Sample data for badges
  const badgeAwardData = [
    { name: "First Article", awarded: 1250 },
    { name: "Prolific Writer", awarded: 450 },
    { name: "Comment Master", awarded: 320 },
    { name: "Trending Author", awarded: 180 },
    { name: "Community Favorite", awarded: 210 },
    { name: "First Year", awarded: 890 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Distribution</CardTitle>
        <CardDescription>Number of users awarded each badge</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={badgeAwardData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="awarded" fill="#8884d8" name="Users Awarded" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

