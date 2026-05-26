'use client'

import { DataTable } from "@/components/tables/data-table";
import { projectColumns } from "@/components/tables/project-column";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { getProjectsQueryOptions } from "@/hooks/queries/project-queries";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function PortofolioPage() {
  const { data: projects } = useQuery(getProjectsQueryOptions());

  return (
    <div className="space-y-between-items">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Products</h1>

        <Link href={ROUTES.CREATE_PRODUCT}>
          <Button>
            <Plus /> Add New Product
          </Button>
        </Link>
      </div>

      <DataTable columns={projectColumns} data={projects || []} />
    </div>
  );
}
