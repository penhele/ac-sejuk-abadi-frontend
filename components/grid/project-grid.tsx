"use client";

import { getProjectsQueryOptions } from "@/hooks/queries/project-queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import ProjectCard from "../cards/project-card";
import EmptyState from "../empty-state/empty-state";

export default function ProjectGrid() {
  const { data: projects } = useSuspenseQuery(getProjectsQueryOptions());

  if (!projects.length) {
    return <EmptyState Icon={SearchX} label="No projects found" />;
  }

  return (
    <div className="grid grid-cols-3 gap-between-card">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
