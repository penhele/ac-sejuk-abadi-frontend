import { api } from "@/lib/axios";
import { Discounts } from "@/types/discount";

export const getActiveDiscount = async (): Promise<Discounts[]> => {
  const response = await api.get<Discounts[]>("/discounts/active");

  return response.data;
};

export const getDiscountById = async (id: number): Promise<Discounts> => {
  const response = await api.get<Discounts>(`/discounts/${id}`);

  return response.data;
};
