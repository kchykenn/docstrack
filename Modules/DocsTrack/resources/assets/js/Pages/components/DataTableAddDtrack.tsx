"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import {
  ChevronDown,
  MoreHorizontal,
  FilePlus,
  FileText,
  Printer,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AddDocsTrack } from "../modal/AddDocsTrack";
import { PrintDocsTrack } from "../modal/PrintDocsTrack";

export type DTrack = {
  id: number;
  route_no: string;
  docs_con_no: string;
  office_con_no: string;
  docs_subject: string;
  docs_type: string;
  remarks: string;
  seq_no: string;
  docs_destin: string;
};

// 👉 Columns with Print/Edit/Delete
export const getColumns = (
  onPrint: (doc: DTrack) => void,
  onEdit: (doc: DTrack) => void,
  onDelete: (doc: DTrack) => void
): ColumnDef<DTrack>[] => [
  { accessorKey: "route_no", header: "Route No" },
  { accessorKey: "docs_con_no", header: "Docs Con No" },
  { accessorKey: "office_con_no", header: "Office Con No" },
  { accessorKey: "docs_subject", header: "Subject" },
  { accessorKey: "docs_type", header: "Type" },
  { accessorKey: "docs_destin", header: "Destination" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem
            onClick={() => onPrint(row.original)}
            className="focus:bg-blue-100"
          >
            <Printer className="mr-2 h-4 w-4 text-blue-600" />
            <span>Print Form</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onEdit(row.original)}
            className="focus:bg-green-100"
          >
            <Pencil className="mr-2 h-4 w-4 text-green-600" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onDelete(row.original)}
            className="focus:bg-red-100"
          >
            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DataTableAddDtrack({
  docstype,
  autoRouteNo,
  autoDocsConNo,
  autoOfficeConNo,
  dtracks,
  departments,
}: {
  docstype: { id: number; docs_code: string; docs_name: string; docs_stat: string }[];
  autoRouteNo: string;
  autoDocsConNo: string;
  autoOfficeConNo: string;
  dtracks: DTrack[];
  departments: { id: number; depart_name: string }[];
}) {
  const [open, setOpen] = React.useState(false);

  // 👉 Print modal state
  const [printOpen, setPrintOpen] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState<DTrack | null>(null);

  const handlePrint = (doc: DTrack) => {
    setSelectedDoc(doc);
    setPrintOpen(true);
  };

  const handleEdit = (doc: DTrack) => {
    console.log("Edit:", doc);
  };

  const handleDelete = (doc: DTrack) => {
    console.log("Delete:", doc);
  };

  const columns = getColumns(handlePrint, handleEdit, handleDelete);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: dtracks,
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
  });

  return (
    <div className="w-full">
      <span className="text-ml font-medium mb-2 flex items-center gap-2 text-left">
        <FileText className="w-5 h-5 text-primary" />
        List of Added Documents
      </span>

      <AddDocsTrack
        open={open}
        onOpenChange={setOpen}
        docstype={docstype}
        autoRouteNo={autoRouteNo}
        autoDocsConNo={autoDocsConNo}
        autoOfficeConNo={autoOfficeConNo}
        departments={departments}
      />

      <div className="flex items-center py-4 gap-2">
        <Button onClick={() => setOpen(true)}>
          <FilePlus className="w-4 h-4 mr-2" />
          Add New
        </Button>

        <Input
          placeholder="Search here..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm text-xs italic"
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
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
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
                    <TableHead
                      key={header.id}
                      className="bg-black text-white text-xs px-2 py-1"
                    >
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
                    <TableCell key={cell.id} className="text-xs px-2 py-1">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-xs"
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
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

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

      {/* 👉 Print modal here */}
      <PrintDocsTrack
        open={printOpen}
        onClose={() => setPrintOpen(false)}
        doc={selectedDoc}
      />
    </div>
  );
}
