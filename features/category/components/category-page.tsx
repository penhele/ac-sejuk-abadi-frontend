"use client";

import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCategories from "../hooks/use-categories";
import { categoryColumns } from "./category-column";
import CreateCategoryForm from "./create-category-form";

export default function CategoryPage() {
  const { data: categories, isFetching } = useCategories();

  return (
    <div className="space-y-between-items">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-semibold text-xl">Category</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Create category</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create Category</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>

            <CreateCategoryForm />
          </SheetContent>
        </Sheet>
      </div>

      <DataTable columns={categoryColumns} data={categories || []} isFetching={isFetching} />
    </div>
  );
}
