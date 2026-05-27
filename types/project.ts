import { ProjectImages } from "./image";
import { Product } from "./product";

export interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  images: ProjectImages[];
  product: Product;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  id_products: string[];
}
