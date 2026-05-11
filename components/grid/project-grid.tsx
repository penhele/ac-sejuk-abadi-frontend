"use client";

import getProjectsQueryOptions from "@/hooks/queries/project-queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import ProjectList from "../lists/project-list";

export default function ProjectGrid({ limit }: { limit?: number }) {
  const { data: projects } = useSuspenseQuery(getProjectsQueryOptions());

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  if (projects.length === 0)
    return (
      <div className="flex flex-col items-center space-y-4">
        <SearchX size={80} className="text-gray-200" />
        <span className="font-semibold">No projects found</span>
      </div>
    );

  return <ProjectList projects={displayedProjects} />;
}
