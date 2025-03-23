"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

export function DashboardCharts() {
  const viewsData = [
    { name: "Jan", views: 4000 },
    { name: "Feb", views: 3000 },
    { name: "Mar", views: 5000 },
    { name: "Apr", views: 4000 },
    { name: "May", views: 7000 },
    { name: "Jun", views: 6000 },
    { name: "Jul", views: 8000 },
  ]

  const engagementData = [
    { name: "Jan", likes: 400, comments: 240 },
    { name: "Feb", likes: 300, comments: 139 },
    { name: "Mar", likes: 500, comments: 221 },
    { name: "Apr", likes: 400, comments: 250 },
    { name: "May", likes: 700, comments: 390 },
    { name: "Jun", likes: 600, comments: 430 },
    { name: "Jul", likes: 800, comments: 509 },
  ]

  return (
    <Tabs defaultValue="views" className="space-y-4">
      <TabsList>
        <TabsTrigger value="views">Views</TabsTrigger>
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
      </TabsList>
      <TabsContent value="views" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Article Views</CardTitle>
            <CardDescription>Total views across all articles over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={viewsData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="engagement" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Likes and comments across all articles over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={engagementData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#8884d8" />
                <Bar dataKey="comments" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

