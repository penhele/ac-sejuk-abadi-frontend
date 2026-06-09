import { api } from "@/lib/api/axios";

export const deleteProjectImage = async (
  id: string | number,
  imageId: string | number,
) => {
  const response = await api.delete(`/projects/${id}/images/${imageId}`);

  return response.data;
};
