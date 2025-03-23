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
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"

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
import Link from "next/link"

type Article = {
  id: string
  title: string
  status: "published" | "draft" | "archived"
  category: string
  date: string
  views: number
}

const data: Article[] = [
  {
    id: "1",
    title: "10 Tips for Better Writing",
    status: "published",
    category: "Writing",
    date: "2023-04-23",
    views: 1234,
  },
  {
    id: "2",
    title: "The Future of Web Development",
    status: "published",
    category: "Technology",
    date: "2023-04-22",
    views: 2345,
  },
  {
    id: "3",
    title: "Understanding JavaScript Promises",
    status: "draft",
    category: "Programming",
    date: "2023-04-21",
    views: 0,
  },
  {
    id: "4",
    title: "CSS Grid Layout: A Complete Guide",
    status: "published",
    category: "Design",
    date: "2023-04-20",
    views: 3456,
  },
  {
    id: "5",
    title: "Getting Started with React Hooks",
    status: "published",
    category: "Programming",
    date: "2023-04-19",
    views: 4567,
  },
  {
    id: "6",
    title: "The Art of Storytelling",
    status: "draft",
    category: "Writing",
    date: "2023-04-18",
    views: 0,
  },
  {
    id: "7",
    title: "Responsive Design Best Practices",
    status: "published",
    category: "Design",
    date: "2023-04-17",
    views: 5678,
  },
  {
    id: "8",
    title: "Introduction to TypeScript",
    status: "archived",
    category: "Programming",
    date: "2023-04-16",
    views: 6789,
  },
  {
    id: "9",
    title: "The Psychology of Color in Design",
    status: "published",
    category: "Design",
    date: "2023-04-15",
    views: 7890,
  },
  {
    id: "10",
    title: "Building a RESTful API with Node.js",
    status: "published",
    category: "Programming",
    date: "2023-04-14",
    views: 8901,
  },
]

export function ArticlesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null)

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "published" ? "default" : status === "draft" ? "secondary" : "outline"}>
            {status}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "views",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-right"
          >
            Views
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="text-right">{row.getValue("views")}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const article = row.original

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
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/articles/${article.id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setArticleToDelete(article)
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

  const handleDeleteArticle = () => {
    // In a real app, you would call an API to delete the article
    console.log(`Deleting article: ${articleToDelete?.id}`)
    setDeleteDialogOpen(false)
    setArticleToDelete(null)
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <select
            className="rounded-md border p-2 text-sm"
            value={(table.getColumn("status")?.getFilterValue() as string[])?.join(",") || ""}
            onChange={(event) => {
              const value = event.target.value
              table.getColumn("status")?.setFilterValue(value ? value.split(",") : [])
            }}
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select
            className="rounded-md border p-2 text-sm"
            value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("category")?.setFilterValue(event.target.value)
            }}
          >
            <option value="">All Categories</option>
            <option value="Writing">Writing</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
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
            <DialogTitle>Are you sure you want to delete this article?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the article &quot;{articleToDelete?.title}
              &quot;.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteArticle}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

