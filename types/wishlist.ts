import { Product } from "./product";

export interface WishlistItem {
  id: number;
  id_wishlist: string;
  id_product: string;
  product: Product;
}

export interface WishlistResponse {
  id: string;
  id_user: string;
  created_at: string;
  items: WishlistItem[];
}
