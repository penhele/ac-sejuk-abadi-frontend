import { deleteBrand } from "@/services/brand.service";
import { Brand } from "@/types/brand";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import DeleteButton from "../buttons/delete-button";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { brandKeys } from "@/features/brand/queries/brand-keys";

export const brandColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: "id",
    header: "ID Brand",
  },
  {
    accessorKey: "image_url",
    header: "Logo",
    cell: ({ row }) => {
      return (
        <div className="relative aspect-video h-12">
          {row.original.image_url ? (
            <Image
              src={row.original.image_url ?? ""}
              alt={row.original.name}
              fill
              className="object-contain"
            />
          ) : (
            <span>No image</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Total Produk",
    cell: ({ row }) => {
      return <span>{row.original._count.products}</span>;
    },
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
            <DeleteButton
              mutationFn={deleteBrand}
              queryKey={brandKeys.all}
              id={row.original.id}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
