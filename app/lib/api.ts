export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://steveobizzstore.onrender.com";

// Types
export interface OrderData {
  customer: { name: string; email: string; phone: string; address: string; state: string };
  cart: Array<{ id: string; name: string; price: number; qty: number; image: string }>;
  totalAmount: number;
}

export interface OrderResponse {
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: number;
  address: string;
  state: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';
  created_at: string;
  items: unknown[];
}

// API Calls
export const initPayment = async (orderData: OrderData) => {
  const res = await fetch(`${API_URL}/payment/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const fetchTrackingInfo = async (id: string) => {
  const res = await fetch(`${API_URL}/orders/${id}`);
  if (!res.ok) return null;
  return res.json();
};

export const subscribeNewsletter = async (email: string) => {
  const res = await fetch(`${API_URL}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
};

// Admin API
export const adminLogin = async (password: string) => {
  if (password === "admin123") return { success: true, token: "mock-jwt-token" };
  return { success: false };
};

export const fetchAdminOrders = async () => {
  const res = await fetch(`${API_URL}/admin/orders`);
  return res.json();
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  await fetch(`${API_URL}/admin/update-status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, status }),
  });
};