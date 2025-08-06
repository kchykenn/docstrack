"use client";

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, FilePlus, FileText, ClipboardCopy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { AddDocsTrack } from "../modal/Department/AddDepartment"

// Update your data and type to match the new columns
const data: Department[] = [
    {
        id: "m5gr84i9",
        departmentCode: "FIN-001",
        departmentName: "Finance Department",
        division: "Finance",
    },
    {
        id: "3u1reuv4",
        departmentCode: "HR-002",
        departmentName: "Human Resources",
        division: "HR",
    },
    {
        id: "derv1ws0",
        departmentCode: "IT-003",
        departmentName: "Information Technology",
        division: "IT",
    },
    {
        id: "5kma53ae",
        departmentCode: "ADM-004",
        departmentName: "Administration",
        division: "Admin",
    },
    {
        id: "bhqecj4p",
        departmentCode: "LEG-005",
        departmentName: "Legal Affairs",
        division: "Legal",
    },
]

export type Department = {
    id: string
    departmentCode: string
    departmentName: string
    division: string
}

export const columns: ColumnDef<Department>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="bg-black text-white px-2 py-1">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "departmentCode",
        header: () => (
            <div className="bg-black text-white px-2 py-1">Department Code</div>
        ),
        cell: ({ row }) => (
            <div>{row.getValue("departmentCode")}</div>
        ),
    },
    {
        accessorKey: "departmentName",
        header: ({ column }) => (
            <div className="bg-black text-white px-2 py-1">
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="text-white hover:text-gray-200"
                >
                    Department Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: ({ row }) => (
            <div>{row.getValue("departmentName")}</div>
        ),
    },
    {
        accessorKey: "division",
        header: () => (
            <div className="bg-black text-white text-right px-2 py-1">
                Division
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-right font-medium">{row.getValue("division")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => (
            <div className="bg-black text-white text-center px-2 py-1">Actions</div>
        ),
        cell: ({ row }) => {
            const department = row.original

            return (
                <div className="w-full flex justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(department.id)}>
                                <ClipboardCopy className="w-4 h-4 mr-2" />
                                Copy Department Name
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                View Department
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <FilePlus className="w-4 h-4 mr-2" />
                                Edit Department
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]

export function DataTableAddDepartment() {
    const [open, setOpen] = React.useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <span className="text-ml font-medium mb-2 flex items-center gap-2 text-left">
                <FileText className="w-5 h-5 text-primary" />
                List of All Departments
            </span>
            <AddDocsTrack open={open} onOpenChange={setOpen} />

            <div className="flex items-center py-4 gap-2">
                <Button
                    onClick={() => setOpen(true)}
                >
                    <FilePlus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
                <Input
                    placeholder="Filter department name..."
                    value={(table.getColumn("departmentName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("departmentName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Filters <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="bg-black text-white">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}