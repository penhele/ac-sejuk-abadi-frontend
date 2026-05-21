import { Pencil } from "lucide-react";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function EditButton({ id }: { id: string | number }) {
  return (
    <DropdownMenuItem>
      <Link
        href={`${ROUTES.EDIT_PRODUCTS(id)}`}
        className="flex items-center w-full justify-between"
      >
        Edit
        <DropdownMenuShortcut>
          <Pencil size={12} />
        </DropdownMenuShortcut>
      </Link>
    </DropdownMenuItem>
  );
}
