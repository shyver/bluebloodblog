"use client"
import { BadgesStats } from "@/components/badges-stats"
import dynamic from "next/dynamic"

const BadgesGrid = dynamic(() => import("@/components/badges-grid"), {ssr: false})
export default function BadgesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Badge System</h1>
        <p className="text-muted-foreground">Manage badges and rewards for your users.</p>
      </div>
      <BadgesStats />
      <BadgesGrid />
    </div>
  )
}

