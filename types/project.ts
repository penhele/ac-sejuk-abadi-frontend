import { ProductImages, ProjectImages } from "./image";

export interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  images: ProjectImages[];
  products: ProjectProduct[];
}

export interface ProjectProduct {
  id: number;
  id_project: number;
  id_product: string;
  product: ProjectProductData;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  id_products: string[];
}

export interface ProjectProductData {
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
  images: ProductImages[];
}
