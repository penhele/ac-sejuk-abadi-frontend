export type SortOrder = "asc" | "desc";
export type SortBy = "price" | "date";

export interface GetProductOptions {
  search?: string;
  id_category?: number | string;
  id_brand?: number | string;
  id_ac_type?: number | string;
  min_price?: number | string;
  max_price?: number | string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}
