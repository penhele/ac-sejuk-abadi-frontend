"use client";

import SheetButton from "@/components/buttons/sheet-button";
import { DataTable } from "@/components/tables/data-table";
import { Plus } from "lucide-react";
import useCategories from "../hooks/use-categories";
import { categoryColumns } from "./category-column";
import CreateCategoryForm from "./create-category-form";

export default function CategoryPage() {
  const { data: categories, isFetching } = useCategories();

  return (
    <div className="space-y-between-items">
      <DataTable
        columns={categoryColumns}
        data={categories || []}
        isFetching={isFetching}
        title="Category"
        action={
          <SheetButton
            label="Add New Category"
            Icon={Plus}
            title="Create Category"
          >
            <CreateCategoryForm />
          </SheetButton>
        }
      />
    </div>
  );
}
