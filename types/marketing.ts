

export type MarketingType = "diskon" | "news";

export interface PromoItem {
  id?: number | string; 
  id_product: string;    
  price: number;        
  start_date: string | Date; 
  end_date: string | Date;   
  title?: string;
  description?: string;
  image?: string;
  percent?: number;
}