export type UserRole = "Admin" | "Customer";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: "Active" | "Inactive";
  createdAt: string;
}