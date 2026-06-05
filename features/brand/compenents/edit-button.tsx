import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateBrandForm from "./create-brand-form";
import { Pencil } from "lucide-react";
import EditBrandForm from "./edit-brand-form";

export default function EditButton({ id }: { id: string | number }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon-xs"}>
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Brand</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <EditBrandForm id={id} />
      </SheetContent>
    </Sheet>
  );
}
