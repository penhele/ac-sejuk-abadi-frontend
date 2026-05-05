import { api } from "@/lib/api/axios";
import { Project } from "@/types/project";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>("/projects");

  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);

  return response.data;
};
