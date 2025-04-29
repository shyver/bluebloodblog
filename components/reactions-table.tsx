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
import { ArrowUpDown,  MoreHorizontal, ThumbsDown, ThumbsUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

type ReactionType = "like" | "dislike" | "love" | "laugh" | "angry" | "sad"

type Reaction = {
  id: string
  user: {
    id: string
    name: string
    email: string
  }
  article: {
    id: string
    title: string
  }
  type: ReactionType
  date: string
}

const data: Reaction[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    },
    article: {
      id: "1",
      title: "10 Tips for Better Writing",
    },
    type: "like",
    date: "2023-04-23",
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    article: {
      id: "2",
      title: "The Future of Web Development",
    },
    type: "love",
    date: "2023-04-22",
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
    },
    article: {
      id: "3",
      title: "Understanding JavaScript Promises",
    },
    type: "dislike",
    date: "2023-04-21",
  },
  {
    id: "4",
    user: {
      id: "4",
      name: "Alice Williams",
      email: "alice@example.com",
    },
    article: {
      id: "4",
      title: "CSS Grid Layout: A Complete Guide",
    },
    type: "laugh",
    date: "2023-04-20",
  },
  {
    id: "5",
    user: {
      id: "5",
      name: "Charlie Brown",
      email: "charlie@example.com",
    },
    article: {
      id: "5",
      title: "Getting Started with React Hooks",
    },
    type: "angry",
    date: "2023-04-19",
  },
  {
    id: "6",
    user: {
      id: "6",
      name: "Diana Prince",
      email: "diana@example.com",
    },
    article: {
      id: "1",
      title: "10 Tips for Better Writing",
    },
    type: "sad",
    date: "2023-04-18",
  },
  {
    id: "7",
    user: {
      id: "7",
      name: "Ethan Hunt",
      email: "ethan@example.com",
    },
    article: {
      id: "2",
      title: "The Future of Web Development",
    },
    type: "like",
    date: "2023-04-17",
  },
  {
    id: "8",
    user: {
      id: "8",
      name: "Fiona Gallagher",
      email: "fiona@example.com",
    },
    article: {
      id: "3",
      title: "Understanding JavaScript Promises",
    },
    type: "like",
    date: "2023-04-16",
  },
  {
    id: "9",
    user: {
      id: "9",
      name: "George Miller",
      email: "george@example.com",
    },
    article: {
      id: "4",
      title: "CSS Grid Layout: A Complete Guide",
    },
    type: "love",
    date: "2023-04-15",
  },
  {
    id: "10",
    user: {
      id: "10",
      name: "Hannah Baker",
      email: "hannah@example.com",
    },
    article: {
      id: "5",
      title: "Getting Started with React Hooks",
    },
    type: "like",
    date: "2023-04-14",
  },
]

export function ReactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Reaction>[] = [
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => {
        const user = row.getValue("user") as Reaction["user"]
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "article",
      header: "Article",
      cell: ({ row }) => {
        const article = row.getValue("article") as Reaction["article"]
        return <div className="font-medium">{article.title}</div>
      },
    },
    {
      accessorKey: "type",
      header: "Reaction",
      cell: ({ row }) => {
        const type = row.getValue("type") as ReactionType
        return (
          <div className="flex items-center gap-2">
            {type === "like" && <ThumbsUp className="h-4 w-4 text-blue-500" />}
            {type === "dislike" && <ThumbsDown className="h-4 w-4 text-red-500" />}
            {type === "love" && <span className="text-lg">❤️</span>}
            {type === "laugh" && <span className="text-lg">😂</span>}
            {type === "angry" && <span className="text-lg">😡</span>}
            {type === "sad" && <span className="text-lg">😢</span>}
            <span className="capitalize">{type}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
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
      id: "actions",
      cell: ({ row }) => {
        const reaction = row.original

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
                    toast({
                      title: "Reaction Rejected",
                      description: `The ${reaction.type} reaction has been rejected.`,
                      variant: "destructive",
                    })
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <X className="mr-2 h-4 w-4" />
                  <span>Reject</span>
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

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by article title..."
          value={(table.getColumn("article")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("article")?.setFilterValue(event.target.value)}
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
            <option value="">All Reactions</option>
            <option value="like">Like</option>
            <option value="dislike">Dislike</option>
            <option value="love">Love</option>
            <option value="laugh">Laugh</option>
            <option value="angry">Angry</option>
            <option value="sad">Sad</option>
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
    </div>
  )
}

