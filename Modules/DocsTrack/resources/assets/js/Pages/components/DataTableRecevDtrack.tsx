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
import { ChevronDown, HomeIcon, Inbox, MoreHorizontal, Send, Copy, Eye, CheckCircle, Trash2, ListEnd } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { router } from "@inertiajs/react";
import { RecevDtrack } from '@/types';
import { RouteDocsTrack } from "../modal/RouteDocsTrack";

interface Props {
    data: RecevDtrack[];

    docstype?: string;
    autoRouteNo?: string;
    autoDocsConNo?: string;
    autoOfficeConNo?: string;
    departments?: { id: number; depart_name: string }[];
    acttype?: { id: number; act_name: string }[];
    departName?: string;
    departUser?: string;
}

export function DataTableRecevDtrack({
    data,
    docstype,
    autoRouteNo,
    autoDocsConNo,
    autoOfficeConNo,
    departments,
    acttype,
    departName,
    departUser
}: Props) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [receiveSuccess, setReceiveSuccess] = React.useState(false);
    const [EndRouteSuccess, setEndRouteSuccess] = React.useState(false);
    const [openRouteModal, setOpenRouteModal] = React.useState(false);
    const [selectedDtrack, setSelectedDtrack] = React.useState<RecevDtrack | null>(null);

    const columns = React.useMemo<ColumnDef<RecevDtrack>[]>(() => [
        { accessorKey: "route_no", header: "Route No" },
        { accessorKey: "docs_subject", header: "Subject" },
        { accessorKey: "docs_type", header: "Type" },
        { accessorKey: "act_taken", header: "Action" },
        { accessorKey: "depart_from", header: "From" },
        { accessorKey: "docs_destin", header: "Destination" },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const status = getValue() as number;
                if (status == 0) return <span className="text-red-600 font-semibold">Pending</span>;
                if (status == 1) return <span className="text-green-600 font-semibold">Received</span>;
                return <span className="text-gray-500">Unknown</span>;
            },
        },
        {
            accessorKey: "ts_created_at",
            header: "Date Created/Routed",
            cell: ({ getValue }) => {
                const raw = getValue() as string | null;
                if (!raw) return "—";
                const date = new Date(raw);
                return date.toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                });
            },
        },
        {
            id: "actions",
            enableHiding: false,
            header: () => (
                <div className="bg-black text-white text-center px-2 py-1">Actions</div>
            ),
            cell: ({ row }) => {
                const dtrack = row.original;
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

                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(dtrack.route_no)}>
                                    <Copy className="mr-2 h-4 w-4 text-black-600" />
                                    Copy Route No
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => console.log("View", dtrack.route_no)}>
                                    <Eye className="mr-2 h-4 w-4 text-black-600" />
                                    View Details
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelectedDtrack(dtrack);
                                        setOpenRouteModal(true);
                                    }}
                                >
                                    <Send className="mr-2 h-4 w-4 text-blue-600" />
                                    Route Docs
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="text-green-600"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const id = dtrack.id
                                        router.post(`/dtracks/endroute/${id}`, {}, {
                                            onSuccess: () => {
                                                setEndRouteSuccess(true)
                                            },
                                            onError: () => alert("Failed to mark as received."),
                                        })
                                    }}
                                >
                                    <ListEnd className="mr-2 h-4 w-4 text-green-600" />
                                    End Route
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => console.log("Delete", dtrack.route_no)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ], []);

    const filteredData = React.useMemo(
        () => data.filter((row) => row.status == 1),
        [data]
    )

    const table = useReactTable({
        data: filteredData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
        globalFilterFn: (row, columnId, filterValue) => {
            return Object.values(row.original)
                .join(" ")
                .toLowerCase()
                .includes(filterValue.toLowerCase());
        },
    });

    return (
        <>
            <div className="w-full">
                <span className="text-lg font-medium mb-2 flex items-center gap-2 text-left">
                    <Inbox className="w-8 h-8 text-primary" />
                    Received Documents
                </span>
                <div className="flex items-center py-4 gap-2">
                    <Button onClick={() => router.visit("/dtracks")}>
                        <HomeIcon className="w-4 h-4 mr-2" />
                        Back to Master Page
                    </Button>
                    <Button onClick={() => router.visit("/dtracks/incoming")}>
                        <Inbox className="w-4 h-4 mr-2" />
                        Incoming Documents
                    </Button>
                    <Button onClick={() => router.visit("/dtracks/create")}>
                        <Send className="w-4 h-4 mr-2" />
                        Route New Documents
                    </Button>
                    <Input
                        placeholder="Search all..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
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
                                .map((column) => {
                                    return (
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
                                    )
                                })}
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
                                            <TableHead key={header.id} className="bg-black text-xs text-white">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
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
                                        className="text-xs"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
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

            {selectedDtrack && (
                <RouteDocsTrack
                    open={openRouteModal}
                    onOpenChange={setOpenRouteModal}
                    dtrack={selectedDtrack}
                    docstype={docstype || ""}
                    autoRouteNo={autoRouteNo || ""}
                    autoDocsConNo={autoDocsConNo || ""}
                    autoOfficeConNo={autoOfficeConNo || ""}
                    departments={departments || []}
                    acttype={acttype || []}
                    departName={departName || ""}
                    departUser={departUser || ""}
                />
            )}

            <AlertDialog open={receiveSuccess} onOpenChange={setReceiveSuccess}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Success
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="block text-xl font-bold">
                                Document Received Successfully!
                            </span>
                            <span className="block text-sm text-gray-700">
                                Please check at the Received Document Module.
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                                setReceiveSuccess(false)
                                router.visit("/dtracks/incoming", {
                                    onFinish: () => window.location.reload(),
                                })
                            }}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Okay
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={EndRouteSuccess} onOpenChange={setEndRouteSuccess}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Success
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="block text-xl font-bold">
                                End Document Transaction Successfully!
                            </span>
                            <span className="block text-sm text-gray-700">
                                Please click okay to proceed.
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                                setEndRouteSuccess(false)
                                router.visit("/dtracks/recev", {
                                    onFinish: () => window.location.reload(),
                                })
                            }}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Okay
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
