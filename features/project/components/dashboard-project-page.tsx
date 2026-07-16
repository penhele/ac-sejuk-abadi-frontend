"use client";

import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useProjects } from "@/features/project";
import { projectColumns } from "@/features/project/components/project-column";
import { Images, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardProjectPage() {
  const router = useRouter();

  const { data: projects } = useProjects();

  return (
    <div className="space-y-between-items">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Projects</h1>

        <div className="flex flex-row space-x-2">
          <Button onClick={() => router.push(ROUTES.DASHBOARD_CREATE_PROJECT)}>
            <Plus /> Add New Project
          </Button>
        </div>
      </div>

      <DataTable columns={projectColumns} data={projects || []} />
    </div>
  );
}
