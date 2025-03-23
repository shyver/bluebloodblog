"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, MessageSquare, Share2, ThumbsUp } from "lucide-react"

export function InsightsTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="views">Views</TabsTrigger>
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
        <TabsTrigger value="sharing">Sharing</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Likes</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+10.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shares</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">+7% from last month</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="views" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Views Analysis</CardTitle>
            <CardDescription>Detailed breakdown of article views</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Unique Visitors</div>
                <div className="text-sm text-muted-foreground">32,456</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[75%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Page Views</div>
                <div className="text-sm text-muted-foreground">45,231</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[100%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Bounce Rate</div>
                <div className="text-sm text-muted-foreground">42%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[42%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Avg. Time on Page</div>
                <div className="text-sm text-muted-foreground">3m 24s</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[60%] rounded-full bg-primary"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="engagement" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Analysis</CardTitle>
            <CardDescription>Detailed breakdown of user engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Likes</div>
                <div className="text-sm text-muted-foreground">2,350</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[65%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Comments</div>
                <div className="text-sm text-muted-foreground">1,234</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[45%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Comment Rate</div>
                <div className="text-sm text-muted-foreground">2.7%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[27%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Avg. Comments per User</div>
                <div className="text-sm text-muted-foreground">1.8</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[36%] rounded-full bg-primary"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sharing" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sharing Analysis</CardTitle>
            <CardDescription>How your content is being shared</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Twitter</div>
                <div className="text-sm text-muted-foreground">245</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[45%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Facebook</div>
                <div className="text-sm text-muted-foreground">189</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[35%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">LinkedIn</div>
                <div className="text-sm text-muted-foreground">98</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[18%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Email</div>
                <div className="text-sm text-muted-foreground">41</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[8%] rounded-full bg-primary"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

