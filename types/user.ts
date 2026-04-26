export interface User {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  rt: string;
  rw: string;
  zip_code: string;
  email: string;
  role: string;
}

export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  rt?: string;
  rw?: string;
  zip_code?: string;
}
