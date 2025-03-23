"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"

type Ad = {
  id: string
  name: string
  type: "banner" | "sidebar" | "inline" | "popup"
  status: "active" | "inactive" | "scheduled"
  impressions: number
  clicks: number
  ctr: number
  startDate: string
  endDate: string
  imageUrl: string
}

const data: Ad[] = [
  {
    id: "1",
    name: "Summer Sale Banner",
    type: "banner",
    status: "active",
    impressions: 12500,
    clicks: 450,
    ctr: 3.6,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    imageUrl: "/placeholder.svg?height=200&width=600",
  },
  {
    id: "2",
    name: "New Product Sidebar",
    type: "sidebar",
    status: "active",
    impressions: 8900,
    clicks: 320,
    ctr: 3.6,
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "3",
    name: "Holiday Special",
    type: "popup",
    status: "scheduled",
    impressions: 0,
    clicks: 0,
    ctr: 0,
    startDate: "2023-11-15",
    endDate: "2023-12-31",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Tech Conference Inline",
    type: "inline",
    status: "active",
    impressions: 5600,
    clicks: 210,
    ctr: 3.75,
    startDate: "2023-04-10",
    endDate: "2023-06-10",
    imageUrl: "/placeholder.svg?height=150&width=600",
  },
  {
    id: "5",
    name: "Spring Collection",
    type: "banner",
    status: "inactive",
    impressions: 9800,
    clicks: 380,
    ctr: 3.88,
    startDate: "2023-03-01",
    endDate: "2023-05-31",
    imageUrl: "/placeholder.svg?height=200&width=600",
  },
]

export function AdsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [adToDelete, setAdToDelete] = useState<Ad | null>(null)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [adToPreview, setAdToPreview] = useState<Ad | null>(null)

  const columns: ColumnDef<Ad>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "active" ? "default" : status === "inactive" ? "secondary" : "outline"}>
            {status}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "impressions",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Impressions
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="text-right">{row.getValue("impressions").toLocaleString()}</div>
      },
    },
    {
      accessorKey: "clicks",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Clicks
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="text-right">{row.getValue("clicks").toLocaleString()}</div>
      },
    },
    {
      accessorKey: "ctr",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            CTR (%)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="text-right">{row.getValue("ctr")}%</div>
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const ad = row.original

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setAdToPreview(ad)
                    setPreviewDialogOpen(true)
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Preview</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/ads/${ad.id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setAdToDelete(ad)
                    setDeleteDialogOpen(true)
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleDeleteAd = () => {
    // In a real app, you would call an API to delete the ad
    console.log(`Deleting ad: ${adToDelete?.id}`)
    toast({
      title: "Ad Deleted",
      description: `The ad "${adToDelete?.name}" has been deleted.`,
    })
    setDeleteDialogOpen(false)
    setAdToDelete(null)
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <select
            className="rounded-md border p-2 text-sm"
            value={(table.getColumn("type")?.getFilterValue() as string[])?.join(",") || ""}
            onChange={(event) => {
              const value = event.target.value
              table.getColumn("type")?.setFilterValue(value ? value.split(",") : [])
            }}
          >
            <option value="">All Types</option>
            <option value="banner">Banner</option>
            <option value="sidebar">Sidebar</option>
            <option value="inline">Inline</option>
            <option value="popup">Popup</option>
          </select>
          <select
            className="rounded-md border p-2 text-sm"
            value={(table.getColumn("status")?.getFilterValue() as string[])?.join(",") || ""}
            onChange={(event) => {
              const value = event.target.value
              table.getColumn("status")?.setFilterValue(value ? value.split(",") : [])
            }}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this ad?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the ad &quot;{adToDelete?.name}&quot;.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAd}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Ad Preview: {adToPreview?.name}</DialogTitle>
            <DialogDescription>Preview how the ad will appear on the site.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="relative">
              <Image
                src={adToPreview?.imageUrl || "/placeholder.svg"}
                alt={adToPreview?.name || "Ad preview"}
                width={600}
                height={300}
                className="rounded-md border"
              />
            </div>
            <div className="mt-4 grid w-full grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Type:</strong> {adToPreview?.type}
              </div>
              <div>
                <strong>Status:</strong> {adToPreview?.status}
              </div>
              <div>
                <strong>Start Date:</strong> {adToPreview?.startDate}
              </div>
              <div>
                <strong>End Date:</strong> {adToPreview?.endDate}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

