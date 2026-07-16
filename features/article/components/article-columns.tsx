import ButtonLink from "@/components/buttons/button-link";
import DeleteButton from "@/components/buttons/delete-button";
import EditButtonHref from "@/components/buttons/edit-button-href";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format/date";
import { ColumnDef } from "@tanstack/react-table";
import { deleteArticle } from "../api/delete-article";
import { articleKeys } from "../queries/article-keys";
import { Article } from "../types/article";
import { ImagePlus } from "lucide-react";

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
            href={ROUTES.DASHBOARD_UPLOAD_ARTICLE_IMAGE(row.original.id)}
            Icon={ImagePlus}
          />

          <EditButtonHref
            routes={ROUTES.DASHBOARD_UPDATE_ARTICLE(row.original.id)}
          />

          <DeleteButton
            id={row.original.id}
            mutationFn={deleteArticle}
            queryKey={articleKeys.all}
            item={row.original.name}
          />
        </div>
      );
    },
  },
];
