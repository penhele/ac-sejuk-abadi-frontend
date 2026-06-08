import { Product } from "./product";

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}
