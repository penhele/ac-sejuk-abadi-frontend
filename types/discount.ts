import { Product } from "./product";

export interface Discounts {
  id: number;
  id_product: string;
  price: string;
  start_date: string;
  end_date: string;
  product: Product;
}