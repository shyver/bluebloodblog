"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

export function ReactionsStats() {
  // Sample data for reactions
  const reactionsByType = [
    { name: "Like", count: 1250 },
    { name: "Love", count: 850 },
    { name: "Laugh", count: 450 },
    { name: "Dislike", count: 120 },
    { name: "Angry", count: 80 },
    { name: "Sad", count: 60 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reactions Overview</CardTitle>
        <CardDescription>Distribution of reactions across all articles</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={reactionsByType}
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
            <Bar dataKey="count" fill="#8884d8" name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

