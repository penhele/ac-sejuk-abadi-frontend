import { Brand } from "./brand";

export interface SponsoredBrand {
  id: number;
  id_brand: number;
  priority: number;
  start_date: string;
  end_date: string;
  brand: Brand;
}
