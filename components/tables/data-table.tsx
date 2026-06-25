"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Skeleton } from "../ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  isFetching?: boolean;
  pageSize?: number;
  pageIndex?: number;
  isPagination?: boolean;
  isFilter?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  rowCount?: number;

  searchValue?: string;
  onSearchChange?: (value: string) => void;

  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  isFetching,
  isPagination,
  isFilter,
  pagination,
  onPaginationChange,
  pageCount,
  rowCount,

  searchValue,
  onSearchChange,

  title,
  description,
  action,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onPaginationChange,
    manualPagination: true,
    pageCount,
    rowCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className={cn(className)}>
      {isFilter && (
        <div className="flex items-center py-4">
          <InputGroup className="max-w-xs">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>

            <InputGroupInput
              placeholder="Filter name..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              disabled={isFetching}
            />
          </InputGroup>
        </div>
      )}

      <Card>
        {(title || description || action) && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>

            {action && <CardAction>{action}</CardAction>}
          </CardHeader>
        )}
        <CardContent className="overflow-x-auto max-w-full space-y-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {!isFetching ? (
                          <>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </>
                        ) : (
                          <div className="">
                            <Skeleton className="h-4 w-24" />
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {!isFetching ? (
                table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
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
                )
              ) : (
                Array(10)
                  .fill(null)
                  .map((_, rowIndex) => (
                    <TableRow key={`skeleton-row-${rowIndex}`}>
                      {columns.map((_, colIndex) => (
                        <TableCell
                          key={`skeleton-cell-${rowIndex}-${colIndex}`}
                        >
                          <Skeleton className="h-6 w-1/2" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>

          {isPagination && (
            <div className="flex flex-row items-center space-x-4 justify-end">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                  defaultValue={`30`}
                >
                  <SelectTrigger className="h-8 w-17.5">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>

              <div className="space-x-1">
                <Button
                  variant="outline"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft />
                </Button>

                <Button
                  variant={"outline"}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight />
                </Button>

                <Button
                  variant={"outline"}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight />
                </Button>
              </div>
            </div>

            // <div className="flex flex-row justify-between items-center">
            //   <div className="text-sm text-muted-foreground">
            //     {table.getPageCount() > 0 ? (
            //       <>
            //         {table.getState().pagination.pageIndex + 1} dari{" "}
            //         {table.getPageCount()} halaman
            //       </>
            //     ) : (
            //       "0 halaman"
            //     )}
            //   </div>

            //   <div className="flex items-center justify-end space-x-2 py-4">
            //     <Button
            //       variant="outline"
            //       size="sm"
            //       onClick={() => table.previousPage()}
            //       disabled={!table.getCanPreviousPage() || isFetching}
            //     >
            //       Previous
            //     </Button>
            //     <Button
            //       variant="outline"
            //       size="sm"
            //       onClick={() => table.nextPage()}
            //       disabled={!table.getCanNextPage() || isFetching}
            //     >
            //       Next
            //     </Button>
            //   </div>
            // </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
