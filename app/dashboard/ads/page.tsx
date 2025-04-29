import { AdsTable } from "@/components/ads-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AdsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advertisements</h1>
          <p className="text-muted-foreground">Manage advertisements displayed on your blog.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/ads/new">
            <Plus className="mr-2 h-4 w-4" /> New Ad
          </Link>
        </Button>
      </div>
      <AdsTable />
    </div>
  )
}

