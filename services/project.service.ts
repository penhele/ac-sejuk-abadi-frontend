import { api } from "@/lib/api/axios";
import { CreateProjectPayload, Project } from "@/types/project";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get<Project[]>("/projects");

    return response.data;
  } catch (error) {
    // console.error("Failed to fetch projects:", error);

    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);

  return response.data;
};

export const addProject = async (data: CreateProjectPayload) => {
  const response = await api.post("/projects", data);

  return response.data;
};

export const deleteProject = async (id: string | number) => {
  const response = await api.delete(`/projects/${id}`);

  return response.data;
};
