import { Brand } from "./brand";
import { ProductCategory } from "./category";
import { Discounts } from "./discount";

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
  images: any[];
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

export interface GetProductOptions {
  search?: string;
  id_category?: number | string;
  min_price?: number | string;
  max_price?: number | string;
  sortBy?: "price" | "name" | "created_at" | "quantity";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
