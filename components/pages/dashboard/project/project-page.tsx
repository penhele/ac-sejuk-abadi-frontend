"use client";

import { DataTable } from "@/components/tables/data-table";
import { projectColumns } from "@/components/tables/project-column";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useProjects } from "@/features/project";
import { Images, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectPage() {
  const router = useRouter();

  const { data: projects } = useProjects();

  return (
    <div className="space-y-between-items">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Projects</h1>

        <div className="flex flex-row space-x-2">
          <Button
            variant={"outline"}
            onClick={() => router.push(ROUTES.DASHBOARD_CREATE_PROJECT_IMAGES)}
          >
            <Images />
            Add Images
          </Button>
          <Button onClick={() => router.push(ROUTES.DASHBOARD_CREATE_PROJECT)}>
            <Plus /> Add New Project
          </Button>
        </div>
      </div>

      <DataTable columns={projectColumns} data={projects || []} />
    </div>
  );
}
