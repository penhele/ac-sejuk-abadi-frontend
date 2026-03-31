
export interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  detail: string;
  productType: string;
  amount: number;
  status: OrderStatus;
}
export type OrderStatus = "Pending" | "Diproses" | "Dikirim" | "Selesai" | "Dibatalkan";

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

export interface OrderDetail {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  payment: {
    method: string;
    status: "Lunas" | "Belum Bayar";
    subtotal: number;
    discount: number;
  };
  notes?: string;
}