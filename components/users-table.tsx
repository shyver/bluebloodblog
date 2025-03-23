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
import { ArrowUpDown, MoreHorizontal, Shield, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

type UserRole = "admin" | "editor" | "author" | "subscriber"

type UserType = {
  id: string
  name: string
  email: string
  role: UserRole
  status: "active" | "inactive" | "pending"
  joinedDate: string
  lastActive: string
}

const data: UserType[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    joinedDate: "2023-01-15",
    lastActive: "2023-04-23",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "editor",
    status: "active",
    joinedDate: "2023-02-10",
    lastActive: "2023-04-22",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "author",
    status: "inactive",
    joinedDate: "2023-03-05",
    lastActive: "2023-04-10",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "subscriber",
    status: "active",
    joinedDate: "2023-03-15",
    lastActive: "2023-04-21",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "author",
    status: "pending",
    joinedDate: "2023-04-01",
    lastActive: "2023-04-20",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "editor",
    status: "active",
    joinedDate: "2023-02-20",
    lastActive: "2023-04-23",
  },
  {
    id: "7",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "subscriber",
    status: "active",
    joinedDate: "2023-03-10",
    lastActive: "2023-04-19",
  },
  {
    id: "8",
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    role: "author",
    status: "inactive",
    joinedDate: "2023-01-25",
    lastActive: "2023-04-15",
  },
  {
    id: "9",
    name: "George Miller",
    email: "george@example.com",
    role: "subscriber",
    status: "pending",
    joinedDate: "2023-04-05",
    lastActive: "2023-04-18",
  },
  {
    id: "10",
    name: "Hannah Baker",
    email: "hannah@example.com",
    role: "author",
    status: "active",
    joinedDate: "2023-02-15",
    lastActive: "2023-04-22",
  },
]

export function UsersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [newRole, setNewRole] = useState<UserRole | "">("")

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={row.getValue("name")} />
            <AvatarFallback>{row.getValue<string>("name").substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{row.getValue("name")}</div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return (
          <div className="flex items-center gap-2">
            {role === "admin" ? (
              <Shield className="h-4 w-4 text-primary" />
            ) : (
              <User className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="capitalize">{role}</span>
          </div>
        )
      },
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
      accessorKey: "joinedDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Joined Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "lastActive",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Last Active
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

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
                    setSelectedUser(user)
                    setNewRole(user.role)
                    setRoleDialogOpen(true)
                  }}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Change Role</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    toast({
                      title: "User Deactivated",
                      description: `${user.name} has been deactivated.`,
                    })
                  }}
                >
                  <span>Deactivate User</span>
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

  const handleRoleChange = () => {
    if (!selectedUser || !newRole) return

    // In a real app, you would call an API to update the user's role
    console.log(`Changing ${selectedUser.name}'s role from ${selectedUser.role} to ${newRole}`)

    toast({
      title: "Role Updated",
      description: `${selectedUser.name}'s role has been updated to ${newRole}.`,
    })

    setRoleDialogOpen(false)
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name or email..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value)
            table.getColumn("email")?.setFilterValue(event.target.value)
          }}
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <select
            className="rounded-md border p-2 text-sm"
            value={(table.getColumn("role")?.getFilterValue() as string[])?.join(",") || ""}
            onChange={(event) => {
              const value = event.target.value
              table.getColumn("role")?.setFilterValue(value ? value.split(",") : [])
            }}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="author">Author</option>
            <option value="subscriber">Subscriber</option>
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
            <option value="pending">Pending</option>
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

      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>Update the role for {selectedUser?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select value={newRole} onValueChange={(value: UserRole) => setNewRole(value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="subscriber">Subscriber</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRoleChange}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

