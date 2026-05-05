export interface CategoryDetail {
  id: number;
  name: string;
  is_deleted: boolean;
}

export interface ProductCategory {
  id_product: string;
  id_category: number;
  category: CategoryDetail;
}
