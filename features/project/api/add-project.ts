import { api } from "@/lib/api/axios";
import { CreateProjectPayload } from "..";

export const addProject = async (data: CreateProjectPayload) => {
  const response = await api.post("/projects", data);

  return response.data;
};
