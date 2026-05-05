import { Brand } from "./brand";
import { ProductCategory } from "./category";
import { Discount } from "./discount";

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
  is_deleted: boolean;

  brand: Brand;
  categories: ProductCategory[];
  images: any[];
  discounts: Discount[];
}

export interface ProductResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}
