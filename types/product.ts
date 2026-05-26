import { AcType } from "./ac-type";
import { Brand } from "./brand";
import { Category } from "./category";
import { Discounts } from "./discount";
import { ProductImages } from "./image";

export interface Product {
  id: string;
  id_brand: number;
  id_category: number;
  id_ac_type: number;

  name: string;
  description: string;
  price: string;
  quantity: number;
  pk: string;

  created_at: string;
  updated_at: string;
  is_deleted: boolean;

  brand: Brand;
  category: Category;
  ac_type: AcType;

  images: ProductImages[];
  discounts: Discounts[];
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
  id_ac_type?: number | string;
  min_price?: number | string;
  max_price?: number | string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: string;
  quantity: string;
  pk: string;
  id_brand: string;
  id_category: string;
  id_ac_type: string;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  pk?: string;
  id_brand?: number;
  id_category?: number;
  id_ac_type?: number;
}
