import { ColumnDef } from "@tanstack/react-table";
import { Article } from "../types/article";

export const articleColumns: ColumnDef<Article>[] = [
  {
    accessorKey: "name",
    header: "Judul",
  },
];
