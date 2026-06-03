import { ColumnDef, OnChangeFn, PaginationState } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
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
}
