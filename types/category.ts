import { string } from "zod";

export interface CategoryDetail {
  id: number;
  name: string;
}

export interface ProductCategory {
  id_product: string;
  id_category: number;
  category: CategoryDetail;
}

export interface Category {
  id: number;
  name: string;
  is_deleted: boolean;
  _count: CategoryCount;
}

export interface CategoryCount {
  products: number;
}

export interface CreateCategoryPayload {
  name: string;
}
