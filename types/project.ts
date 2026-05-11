import { Images } from "./image";
import { Product } from "./product";

export interface Project {
  id: number;
  id_product: string;
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  images: Images[];
  product: Product;
}
