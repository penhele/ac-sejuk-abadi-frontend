import { ROUTES } from "@/constants/routes";
import { projectKeys } from "@/features/project";
import { deleteProject } from "@/features/project";
import { formatDate } from "@/lib/format/date";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
    accessorKey: "category",
    header: "Category",
  },
  {
    header: "Total Products",
    cell: ({ row }) => {
      const products = row.original.products ?? [];

      return (
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger className="w-full" asChild>
                <Button
                  size={"xs"}
                  className="w-full flex justify-start"
                  variant={"ghost"}
                >
                  {products.length}
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>View products</TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="start" className="w-full">
            <DropdownMenuGroup>
              {products.map((item) => (
                <DropdownMenuItem
                  key={item.product.id}
                  className="cursor-pointer"
                >
                  {item.product.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
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
            <EditButton href={ROUTES.DASHBOARD_EDIT_PROJECT(row.original.id)} />
            <DeleteButton
              mutationFn={deleteProject}
              queryKey={projectKeys.all}
              id={row.original.id}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
