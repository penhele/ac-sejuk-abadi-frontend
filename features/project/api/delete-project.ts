import { api } from "@/lib/api/axios";

export const deleteProject = async (id: string | number) => {
  const response = await api.delete(`/projects/${id}`);

  return response.data;
};
