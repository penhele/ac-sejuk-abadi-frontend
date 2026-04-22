import { api } from "@/lib/axios";
import { Staff } from "@/types/staff";

export const getStaff = async (): Promise<Staff[]> => {
  const response = await api.get<Staff[]>("/staff");

  return response.data;
};
