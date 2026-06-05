import { api } from "@/lib/api/axios";
import { UpdateUserPayload } from "../types/update-user-payload";

export const updateUser = async (
  id: string | number,
  data: UpdateUserPayload,
) => {
  const response = await api.put(`/users/${id}`, data);

  return response.data;
};
