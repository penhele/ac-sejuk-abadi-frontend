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
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}
