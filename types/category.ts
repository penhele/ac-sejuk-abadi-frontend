export interface CategoryDetail {
  id: number;
  name: string;
}

export interface ProductCategory {
  id_product: string;
  id_category: number;
  category: CategoryDetail;
}
