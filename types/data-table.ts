import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  isFetching?: boolean;
  pageSize?: number;
  isPagination?: boolean;
  isFilter?: boolean;
}
