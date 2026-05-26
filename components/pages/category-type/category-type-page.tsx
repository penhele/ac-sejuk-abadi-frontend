"use client";

import CreateAcTypeForm from "@/components/forms/create-ac-type-form";
import CreateCategoryForm from "@/components/forms/create-category-form";
import { acTypeColumns } from "@/components/tables/ac_type_column";
import { categoryColumns } from "@/components/tables/category-column";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getAcTypesQueryOptions } from "@/hooks/queries/ac-type-queries";
import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export default function CategoryTypePage() {
  const { data: categories } = useQuery(getCategoriesQueryOptions());
  const { data: acTypes } = useQuery(getAcTypesQueryOptions());

  return (
    <div className="space-y-between-items-lg">
      <div className="space-y-between-items">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Category</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Add New Category
              </Button>
            </DialogTrigger>

            <DialogContent>
              <CreateCategoryForm />
            </DialogContent>
          </Dialog>
        </div>

        <DataTable columns={categoryColumns} data={categories || []} />
      </div>

      <div className="space-y-between-items">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">AC Type</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Add New AC Type
              </Button>
            </DialogTrigger>

            <DialogContent>
              <CreateAcTypeForm />
            </DialogContent>
          </Dialog>
        </div>

        <DataTable columns={acTypeColumns} data={acTypes || []} />
      </div>
    </div>
  );
}
