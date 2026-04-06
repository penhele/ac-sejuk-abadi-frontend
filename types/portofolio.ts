export interface Portfolio {
  id?: number; 
  id_product: string; 
  name: string;        
  description?: string;
  location?: string;
  category?: string;

  date?: string | Date;

  images: (string | File)[]; 
}