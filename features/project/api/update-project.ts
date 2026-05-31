import { api } from "@/lib/api/axios";
import { UpdateProjectPayload } from "../types/project-payload";

export const updateProject = async (
  id: string | number,
  data: UpdateProjectPayload,
) => {
  const response = await api.put(`/projects/${id}`, data);

  return response.data;
};
