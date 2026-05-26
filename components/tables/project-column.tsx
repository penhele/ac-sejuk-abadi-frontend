import { getProjectsQueryOptions } from "@/hooks/queries/project-queries";
import { formatDate } from "@/lib/format/date";
import { deleteProject } from "@/services/project.service";
import { Project } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import DeleteButton from "../buttons/delete-button";
import EditButton from "../buttons/edit-button";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";

export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "ID Project",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "id_product",
    header: "ID Product",
    cell: ({ row }) => <span>{row.original.product.name}</span>,
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon-xs"} variant={"ghost"}>
            <EllipsisIcon size={12} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <EditButton
              href={ROUTES.DASHBOARD_EDIT_PORTOFOLIO(row.original.id)}
            />
            <DeleteButton
              mutationFn={deleteProject}
              queryKey={getProjectsQueryOptions().queryKey}
              id={row.original.id}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
