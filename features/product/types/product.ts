import { AcType } from "@/types/ac-type";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";
import { Discounts } from "@/types/discount";
import { ProductImages } from "@/types/image";

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
