import DeleteButton from "@/components/buttons/delete-button";
import EditButtonHref from "@/components/buttons/edit-button-href";
import { ROUTES } from "@/constants/routes";
import { deleteProject, Project, projectKeys } from "@/features/project";
import { formatDate } from "@/lib/format/date";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import ButtonLink from "@/components/buttons/button-link";

export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "ID Project",
  },
  {
    header: "Images",
    cell: ({ row }) => {
      return <span>{row.original.images.length}</span>;
    },
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
    cell: ({ row }) => {
      const project = row.original;

      return (
        <div className="space-x-2">
          <ButtonLink
            routes={ROUTES.DASHBOARD_UPLOAD_PROJECT_IMAGES(project.id)}
          />
          <EditButtonHref routes={ROUTES.DASHBOARD_EDIT_PROJECT(project.id)} />
          <DeleteButton
            id={project.id}
            mutationFn={deleteProject}
            queryKey={projectKeys.all}
            item={row.original.name}
          />
        </div>
      );
    },
  },
];
