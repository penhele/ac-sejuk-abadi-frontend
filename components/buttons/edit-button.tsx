import { Pencil } from "lucide-react";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function EditButton({ href }: { href: string }) {
  return (
    <DropdownMenuItem>
      <Link href={href} className="flex items-center w-full justify-between">
        Edit
        <DropdownMenuShortcut>
          <Pencil size={12} />
        </DropdownMenuShortcut>
      </Link>
    </DropdownMenuItem> 
  );
}
