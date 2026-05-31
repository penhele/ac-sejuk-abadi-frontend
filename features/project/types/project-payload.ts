export interface CreateProjectPayload {
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  id_products: string[];
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  date?: string;
  location?: string;
  category?: string;
  id_products?: string[];
}
