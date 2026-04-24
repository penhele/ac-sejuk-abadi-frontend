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

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address?: string;
  rt?: string;
  rw?: string;
  zip_code?: string;
}
