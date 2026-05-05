import { Product } from "./product";

export interface Discount {
  id: number;
  id_product: string;
  price: string;
  start_date: string;
  end_date: string;
}
