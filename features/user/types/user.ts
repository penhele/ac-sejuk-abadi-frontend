export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  rt: string;
  rw: string;
  zip_code: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserAdmin {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  rt: string;
  rw: string;
  zip_code: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
