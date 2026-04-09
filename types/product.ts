import { Brand } from "./brand";
import { ProductCategory } from "./category";

export interface Product {
  id: string;
  id_brand: number;
  name: string;
  description: string;
  type: string;
  price: string; // Berdasarkan JSON: "2500000"
  quantity: number;
  pk: string;
  created_at: string;
  updated_at: string;
  brand: Brand;
  categories: ProductCategory[];
  images: any[]; // Sesuaikan jika nanti ada objek image
  discounts: any[]; // Sesuaikan jika nanti ada objek discount
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product[]; // Array produk
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}
