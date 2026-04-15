import api from "./api"; 
import { Order, OrderStatus } from "@/types/order";

const mapToUIStatus = (backendStatus: string): OrderStatus => {
  const map: Record<string, OrderStatus> = {
    pending: "Pending",
    processing: "Diproses",
    shipped: "Dikirim",
    delivered: "Selesai",
    cancelled: "Dibatalkan",
  };
  return map[backendStatus] || "Pending";
};

const mapToBackendStatus = (uiStatus: string): string => {
  const map: Record<string, string> = {
    "Pending": "pending",
    "Diproses": "processing",
    "Dikirim": "shipped",
    "Selesai": "delivered",
    "Dibatalkan": "cancelled",
  };
  return map[uiStatus] || uiStatus.toLowerCase();
};

const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get("/orders");
    return response.data.map((order: any) => ({
      ...order,
      status: mapToUIStatus(order.status)
    }));
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return {
      ...response.data,
      status: mapToUIStatus(response.data.status)
    };
  },

  updateOrderStatus: async (id: string, status: string): Promise<Order> => {
    const payload = { status: mapToBackendStatus(status) };
    const response = await api.put(`/orders/${id}/status`, payload);
    return response.data;
  }
};

export default orderService;