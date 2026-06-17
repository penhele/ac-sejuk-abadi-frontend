"use client";

import { useProjects } from "@/features/project";
import { SearchX } from "lucide-react";
import ProjectCard from "./project-card";
import EmptyState from "../../../components/empty-state";

export default function ProjectGrid({ limit }: { limit?: number }) {
  const { data } = useProjects();
  const projects = data || [];

  if (!projects.length) {
    return <EmptyState Icon={SearchX} label="No projects found" />;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-between-card">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
