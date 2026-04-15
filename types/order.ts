export type OrderStatus = "Pending" | "Diproses" | "Dikirim" | "Selesai" | "Dibatalkan";
export type PaymentStatus = "Lunas" | "Belum Bayar";

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface PaymentInfo {
  method: string;
  status: PaymentStatus;
  subtotal: number;
  discount: number;
  total: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  date: string; 
  customer: Customer;
  items: OrderItem[];
  amount: number; 
  payment?: PaymentInfo;
  notes?: string;
  trackingHistory?: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
}


export interface OrderSummary {
  id: string;
  date: string;
  customerName: string;
  amount: number;
  status: OrderStatus;
}