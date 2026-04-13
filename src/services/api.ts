const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// --- Helpers ---
function getToken(): string | null {
  return null;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || JSON.stringify(data));
  }

  return data;
}

// --- Auth ---
export const authAPI = {
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) =>
    request<{ user: User; tokens: Tokens }>("/auth/register/", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }),
    }),

  login: (email: string, password: string) =>
    request<{ user: User; tokens: Tokens }>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () => request<User>("/auth/profile/"),
};

// --- Products ---
export const productsAPI = {
  getAll: async (params?: { category?: string; tag?: string }) => {
    const query = new URLSearchParams(
      params as Record<string, string>,
    ).toString();
    const data = await request<any[]>(`/products/${query ? `?${query}` : ""}`);
    return data.map((p) => ({
      ...p,
      price: Number(p.price),
      original_price: p.original_price ? Number(p.original_price) : null,
    })) as Product[];
  },

  getBySlug: async (slug: string) => {
    const data = await request<any>(`/products/${slug}/`);
    return {
      ...data,
      price: Number(data.price),
      original_price: data.original_price ? Number(data.original_price) : null,
    } as Product;
  },
};

// --- Orders ---
export const ordersAPI = {
  create: (payload: CreateOrderPayload) =>
    request<Order>("/orders/create/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMyOrders: () => request<Order[]>("/orders/"),

  getById: (id: number) => request<Order>(`/orders/${id}/`),
};

// --- Contact ---
export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const contactAPI = {
  send: (payload: ContactPayload) =>
    request<{ success: boolean; message: string }>("/contact/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

// --- Newsletter ---
export const newsletterAPI = {
  subscribe: (email: string) =>
    request<{ success: boolean; message: string }>("/newsletter/subscribe/", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

// --- Types ---
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  stock_count: number | null;
  description: string;
  usage: string;
  ingredients: string;
  image: string | null;
  hover_image: string | null;
  is_new: boolean;
  is_best_seller: boolean;
  in_stock: boolean;
  category: { id: number; name: string; slug: string };
  created_at: string;
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
}

export interface CreateOrderPayload {
  reference: string;
  email: string;
  total_amount: number;
  shipping_name: string;
  shipping_address: string;
  shipping_phone: string;
  items: OrderItem[];
}

export interface Order {
  id: number;
  email: string;
  status: string;
  total_amount: string;
  paystack_reference: string;
  paid_at: string;
  shipping_name: string;
  shipping_address: string;
  shipping_phone: string;
  items: OrderItem[];
  created_at: string;
}
