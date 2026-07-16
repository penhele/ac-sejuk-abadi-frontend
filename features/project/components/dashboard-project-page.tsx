"use client";

import BreadcrumbComponent from "@/components/breadcrumb-component";
import ButtonLink from "@/components/buttons/button-link";
import { DataTable } from "@/components/tables/data-table";
import { ROUTES } from "@/constants/routes";
import { useProjects } from "@/features/project";
import { projectColumns } from "@/features/project/components/project-column";
import { Plus } from "lucide-react";

export default function DashboardProjectPage() {
  const { data: projects } = useProjects();

  return (
    <div className="space-y-between-items">
      <BreadcrumbComponent />

      <div className="flex flex-row">
        <div>
          <h1 className="text-xl font-bold ">Projects</h1>
        </div>

        <ButtonLink
          href={ROUTES.DASHBOARD_CREATE_PROJECT}
          Icon={Plus}
          label="Add Project"
          className="ml-auto"
          variant="default"
          size="sm"
        />
      </div>

      <DataTable columns={projectColumns} data={projects || []} />
    </div>
  );
}
