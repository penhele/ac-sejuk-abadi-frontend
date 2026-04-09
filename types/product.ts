import { Brand } from "./brand";
import { ProductCategory } from "./category";

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
  discounts: any[];
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
