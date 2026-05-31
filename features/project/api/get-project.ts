import { api } from "@/lib/api/axios";
import { Project } from "..";

export const getProjectById = async (id: string | number): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);

  return response.data;
};
