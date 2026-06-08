"use client";

import { useProjects } from "@/features/project";
import { SearchX } from "lucide-react";
import ProjectCard from "../cards/project-card";
import EmptyState from "../empty-state/empty-state";

export default function ProjectGrid({ limit }: { limit?: number }) {
  const { data } = useProjects();
  const projects = data || [];

  if (!projects.length) {
    return <EmptyState Icon={SearchX} label="No projects found" />;
  }

  return (
    <div className="grid grid-cols-4 gap-between-card">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
