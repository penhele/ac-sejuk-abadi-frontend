import { ColumnDef } from "@tanstack/react-table";
import { Article } from "../types/article";
import { formatDate } from "@/lib/format/date";
import DeleteButton from "@/components/buttons/delete-button";
import { deleteArticle } from "../api/delete-article";
import { articleKeys } from "../queries/article-keys";
import EditButton from "@/components/buttons/edit-button";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import EditButtonHref from "@/components/buttons/edit-button-href";
import ButtonLink from "@/components/buttons/button-link";

export const articleColumns: ColumnDef<Article>[] = [
  {
    accessorKey: "name",
    header: "Judul",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    header: "Konten",
    cell: ({ row }) => {
      return (
        <span className="line-clamp-1 max-w-xs text-ellipsis">
          {row.original.description}
        </span>
      );
    },
  },
  {
    header: "Terakhir Diedit",
    cell: ({ row }) => {
      return <span>{formatDate(row.original.updated_at)}</span>;
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <ButtonLink
            routes={ROUTES.DASHBOARD_UPLOAD_ARTICLE_IMAGE(row.original.id)}
          />

          <EditButtonHref
            routes={ROUTES.DASHBOARD_UPDATE_ARTICLE(row.original.id)}
          />

          <DeleteButton
            id={row.original.id}
            mutationFn={deleteArticle}
            queryKey={articleKeys.all}
          />
        </div>
      );
    },
  },
];
