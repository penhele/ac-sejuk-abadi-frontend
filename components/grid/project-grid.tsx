"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getProjects } from "@/services/project.service";
import { SearchX } from "lucide-react";
import ProjectList from "../lists/project-list";
import { Project } from "@/types/project";

export default function ProjectGrid() {
  const { data: projects } = useSuspenseQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });

  if (!projects || projects.length === 0)
    return (
      <div className="flex flex-col items-center space-y-4">
        <SearchX size={80} className="text-gray-200" />
        <span className="font-semibold">No projects found</span>
      </div>
    );

  return <ProjectList projects={projects} />;
}
