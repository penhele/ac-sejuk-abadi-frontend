import { Product } from "./product";

export interface Cart {
  id: string;
  id_user: string;
  created_at: string;
  updated_at: string;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  id_cart: string;
  id_product: string;
  quantity: number;
  product: Product;
}
