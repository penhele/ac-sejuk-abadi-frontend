export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address?: string;
  rt?: string;
  rw?: string;
  zip_code?: string;
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
