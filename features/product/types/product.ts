import { AcType } from "@/features/acType/types/ac-type";
import { Category } from "@/features/category/types/category";
import { Brand } from "@/features/brand/types/brand";
import { ProductImages } from "./product-images";
import { Discounts } from "@/features/discount/types/discount";

export interface Product {
  id: string;
  id_brand: number;
  id_category: number;
  id_ac_type: number;

  name: string;
  description: string;
  price: string;
  quantity: number;
  pk: string;

  created_at: string;
  updated_at: string;
  is_deleted: boolean;

  brand: Brand;
  category: Category;
  ac_type: AcType;

  images: ProductImages[];
  discounts: Discounts[];
}
