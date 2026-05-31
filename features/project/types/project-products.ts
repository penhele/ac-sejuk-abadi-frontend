import { Product } from "@/features/product";

export interface ProjectProduct {
  id: number;
  id_project: number;
  id_product: string;
  product: Product;
}
