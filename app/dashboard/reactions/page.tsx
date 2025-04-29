import { ReactionsTable } from "@/components/reactions-table"
import { ReactionsStats } from "@/components/reactions-stats"

export default function ReactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reactions</h1>
        <p className="text-muted-foreground">Monitor and manage user reactions to your content.</p>
      </div>
      <ReactionsStats />
      <ReactionsTable />
    </div>
  )
}

