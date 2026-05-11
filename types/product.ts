import { Brand } from "./brand";
import { ProductCategory } from "./category";
import { Discounts } from "./discount";
import { Images } from "./image";

export interface Product {
  id: string;
  id_brand: number;
  name: string;
  description: string;
  type: string;
  price: string;
  quantity: number;
  pk: string;
  created_at: string;
  updated_at: string;
  brand: Brand;
  categories: ProductCategory[];
  images: Images[];
  discounts: Discounts[];
  reviews: any[];
  featuredProducts: any[];
}

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

export type SortOrder = "asc" | "desc";
export type SortBy = "price" | "date";

export interface GetProductOptions {
  search?: string;
  id_category?: number | string;
  id_brand?: number | string;
  min_price?: number | string;
  max_price?: number | string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}
