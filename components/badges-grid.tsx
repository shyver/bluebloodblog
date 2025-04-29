"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Edit, Plus, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

type Badge = {
  id: string
  name: string
  description: string
  icon: string
  criteria: string
  usersAwarded: number
}

const BadgesGrid = () => {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "1",
      name: "First Article",
      description: "Published your first article",
      icon: "🏆",
      criteria: "Publish 1 article",
      usersAwarded: 1250,
    },
    {
      id: "2",
      name: "Prolific Writer",
      description: "Published 10 articles",
      icon: "✍️",
      criteria: "Publish 10 articles",
      usersAwarded: 450,
    },
    {
      id: "3",
      name: "Comment Master",
      description: "Left 50 comments",
      icon: "💬",
      criteria: "Leave 50 comments",
      usersAwarded: 320,
    },
    {
      id: "4",
      name: "Trending Author",
      description: "Had an article with 1000+ views",
      icon: "📈",
      criteria: "Get 1000+ views on a single article",
      usersAwarded: 180,
    },
    {
      id: "5",
      name: "Community Favorite",
      description: "Received 100+ likes across all articles",
      icon: "❤️",
      criteria: "Receive 100+ likes",
      usersAwarded: 210,
    },
    {
      id: "6",
      name: "First Year",
      description: "Been a member for one year",
      icon: "🎂",
      criteria: "Account age of 1 year",
      usersAwarded: 890,
    },
  ])

  const [newBadge, setNewBadge] = useState<Partial<Badge>>({
    name: "",
    description: "",
    icon: "",
    criteria: "",
  })

  const handleAddBadge = () => {
    if (!newBadge.name || !newBadge.description || !newBadge.icon || !newBadge.criteria) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields for the new badge.",
        variant: "destructive",
      })
      return
    }

    const badge: Badge = {
      id: `${badges.length + 1}`,
      name: newBadge.name,
      description: newBadge.description,
      icon: newBadge.icon,
      criteria: newBadge.criteria,
      usersAwarded: 0,
    }

    setBadges([...badges, badge])
    setNewBadge({
      name: "",
      description: "",
      icon: "",
      criteria: "",
    })

    toast({
      title: "Badge Created",
      description: `The "${badge.name}" badge has been created.`,
    })
  }

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="all">All Badges</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Badge
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Badge</DialogTitle>
              <DialogDescription>Create a new badge to reward your users.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="badge-name">Badge Name</Label>
                <Input
                  id="badge-name"
                  value={newBadge.name}
                  onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
                  placeholder="First Article"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="badge-description">Description</Label>
                <Input
                  id="badge-description"
                  value={newBadge.description}
                  onChange={(e) => setNewBadge({ ...newBadge, description: e.target.value })}
                  placeholder="Published your first article"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="badge-icon">Icon (Emoji)</Label>
                <Input
                  id="badge-icon"
                  value={newBadge.icon}
                  onChange={(e) => setNewBadge({ ...newBadge, icon: e.target.value })}
                  placeholder="✿"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="badge-criteria">Award Criteria</Label>
                <Input
                  id="badge-criteria"
                  value={newBadge.criteria}
                  onChange={(e) => setNewBadge({ ...newBadge, criteria: e.target.value })}
                  placeholder="Publish 1 article"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddBadge}>
                Create Badge
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <TabsContent value="all" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => (
            <Card key={badge.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{badge.icon}</div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{badge.description}</CardDescription>
                <div className="mt-2 text-xs text-muted-foreground">
                  <strong>Criteria:</strong> {badge.criteria}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Award className="mr-1 h-3 w-3" />
                  {badge.usersAwarded} users awarded
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="popular" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {badges
            .sort((a, b) => b.usersAwarded - a.usersAwarded)
            .slice(0, 6)
            .map((badge) => (
              <Card key={badge.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl">{badge.icon}</div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{badge.description}</CardDescription>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Criteria:</strong> {badge.criteria}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Award className="mr-1 h-3 w-3" />
                    {badge.usersAwarded} users awarded
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </TabsContent>
      <TabsContent value="recent" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {badges.slice(-3).map((badge) => (
            <Card key={badge.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{badge.icon}</div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{badge.description}</CardDescription>
                <div className="mt-2 text-xs text-muted-foreground">
                  <strong>Criteria:</strong> {badge.criteria}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Award className="mr-1 h-3 w-3" />
                  {badge.usersAwarded} users awarded
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default BadgesGrid