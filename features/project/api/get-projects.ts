import { api } from "@/lib/api/axios";
import { Project } from "..";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get<Project[]>("/projects");

    return response.data;
  } catch (error) {
    return [];
  }
};
