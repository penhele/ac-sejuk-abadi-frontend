export interface Company {
  id: number;
  logo_url: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  location_url: string;
}

export interface UpdateCompanyPayload {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  location_url?: string;
}

export interface UpdateCompanyImagePayload {
  image_url?: string;
}
