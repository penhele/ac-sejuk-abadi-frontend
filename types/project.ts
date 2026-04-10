import { Product } from "./product";

export interface Project {
  id: number;
  id_product: string;
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  images: string[];
  product: Product;
}
