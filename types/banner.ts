import { Brand } from "./brand";

export interface Banner {
  id: number;
  id_brand: number;
  name: string;
  category: string;
  image_url: string;
  start_date: string;
  end_date: string;
  brand: Brand;
}
