import { useState, useEffect } from "react";
import { ShoppingBag, Loader2, ChevronDown } from "lucide-react";
import AdminLayout from "./AdminLayout";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const ADMIN_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY as string;

interface OrderItem {
  id: number;
  product_name: string;
  product_price: string;
  quantity: number;
  subtotal: number;
}

interface Order {
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

const STATUS_OPTIONS = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending: { bg: "#FFF7ED", color: "#ea580c" },
  paid: { bg: "#EFF6FF", color: "#3b82f6" },
  processing: { bg: "#FEFCE8", color: "#ca8a04" },
  shipped: { bg: "#F5F3FF", color: "#7c3aed" },
  delivered: { bg: "#F0FDF4", color: "#16a34a" },
  cancelled: { bg: "#FEF2F2", color: "#dc2626" },
};

function adminFetch(endpoint: string, options: RequestInit = {}) {
  return fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": ADMIN_KEY,
      ...options.headers,
    },
  });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await adminFetch("/orders/admin/orders/");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(orderId: number, newStatus: string) {
    setUpdatingId(orderId);
    try {
      const res = await adminFetch(`/orders/admin/orders/${orderId}/status/`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch {
      setError("Failed to update status. Try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#0F1A10",
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Orders
            </h1>
            <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
              {orders.length} total orders
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-4 px-4 py-3 rounded-sm text-sm"
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2
              size={24}
              className="animate-spin"
              style={{ color: "#1B5E20" }}
            />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#bbb" }}>
            <ShoppingBag size={40} strokeWidth={1} className="mx-auto mb-3" />
            <p style={{ fontSize: 14 }}>No orders yet.</p>
          </div>
        ) : (
          <div
            className="bg-white rounded-sm border overflow-hidden"
            style={{ borderColor: "#EBEBEB" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #EBEBEB" }}>
                  {[
                    "Order",
                    "Customer",
                    "Items",
                    "Total",
                    "Date",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3"
                      style={{
                        fontSize: 10,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        color: "#999",
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => {
                  const style =
                    STATUS_STYLES[order.status] ?? STATUS_STYLES.pending;
                  const isExpanded = expandedId === order.id;

                  return (
                    <>
                      <tr
                        key={order.id}
                        style={{
                          borderBottom: "1px solid #F5F5F5",
                          background: isExpanded ? "#FAFAFA" : "#fff",
                        }}
                      >
                        {/* Order ID */}
                        <td className="px-4 py-3">
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#1B5E20",
                              fontFamily: "monospace",
                            }}
                          >
                            #{order.id}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-3">
                          <p
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: "#0F1A10",
                            }}
                          >
                            {order.shipping_name}
                          </p>
                          <p style={{ fontSize: 11, color: "#aaa" }}>
                            {order.email}
                          </p>
                        </td>

                        {/* Items count */}
                        <td className="px-4 py-3">
                          <span style={{ fontSize: 13, color: "#555" }}>
                            {order.items.length} item
                            {order.items.length !== 1 ? "s" : ""}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-4 py-3">
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: "#0F1A10",
                            }}
                          >
                            ₦{parseFloat(order.total_amount).toLocaleString()}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3">
                          <span style={{ fontSize: 12, color: "#888" }}>
                            {formatDate(order.created_at)}
                          </span>
                        </td>

                        {/* Status dropdown */}
                        <td className="px-4 py-3">
                          <div className="relative flex items-center gap-1.5">
                            <span
                              className="px-2 py-1 rounded-sm text-xs"
                              style={{
                                background: style.bg,
                                color: style.color,
                              }}
                            >
                              {order.status}
                            </span>
                            {updatingId === order.id ? (
                              <Loader2
                                size={12}
                                className="animate-spin"
                                style={{ color: "#1B5E20" }}
                              />
                            ) : (
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusChange(order.id, e.target.value)
                                }
                                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                title="Update status"
                              >
                                {STATUS_OPTIONS.map((s) => (
                                  <option key={s} value={s}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </td>

                        {/* Expand toggle */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : order.id)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors duration-200"
                            style={{ border: "1px solid #E8E8E8" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.borderColor = "#1B5E20")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.borderColor = "#E8E8E8")
                            }
                          >
                            <ChevronDown
                              size={13}
                              style={{
                                color: "#888",
                                transform: isExpanded
                                  ? "rotate(180deg)"
                                  : "none",
                                transition: "transform 0.2s",
                              }}
                            />
                          </button>
                        </td>
                      </tr>

                      {/* Expanded row — order details */}
                      {isExpanded && (
                        <tr
                          key={`${order.id}-detail`}
                          style={{ borderBottom: "1px solid #EBEBEB" }}
                        >
                          <td
                            colSpan={7}
                            className="px-6 py-4"
                            style={{ background: "#FAFAFA" }}
                          >
                            <div className="grid grid-cols-2 gap-6">
                              {/* Shipping info */}
                              <div>
                                <p
                                  style={{
                                    fontSize: 10,
                                    letterSpacing: 1.5,
                                    textTransform: "uppercase",
                                    color: "#999",
                                    marginBottom: 8,
                                  }}
                                >
                                  Shipping Details
                                </p>
                                <p
                                  style={{
                                    fontSize: 13,
                                    color: "#333",
                                    marginBottom: 2,
                                  }}
                                >
                                  {order.shipping_name}
                                </p>
                                <p
                                  style={{
                                    fontSize: 12,
                                    color: "#666",
                                    marginBottom: 2,
                                  }}
                                >
                                  {order.shipping_address}
                                </p>
                                <p
                                  style={{
                                    fontSize: 12,
                                    color: "#666",
                                    marginBottom: 2,
                                  }}
                                >
                                  {order.shipping_phone}
                                </p>
                                <p
                                  style={{
                                    fontSize: 11,
                                    color: "#aaa",
                                    marginTop: 6,
                                  }}
                                >
                                  Ref: {order.paystack_reference}
                                </p>
                              </div>

                              {/* Items list */}
                              <div>
                                <p
                                  style={{
                                    fontSize: 10,
                                    letterSpacing: 1.5,
                                    textTransform: "uppercase",
                                    color: "#999",
                                    marginBottom: 8,
                                  }}
                                >
                                  Items Ordered
                                </p>
                                <div className="flex flex-col gap-2">
                                  {order.items.map((item) => (
                                    <div
                                      key={item.id}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span
                                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                                          style={{
                                            background: "#1B5E20",
                                            color: "#fff",
                                            fontSize: 9,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {item.quantity}
                                        </span>
                                        <span
                                          style={{
                                            fontSize: 13,
                                            color: "#333",
                                          }}
                                        >
                                          {item.product_name}
                                        </span>
                                      </div>
                                      <span
                                        style={{ fontSize: 12, color: "#888" }}
                                      >
                                        ₦
                                        {Number(item.subtotal).toLocaleString()}
                                      </span>
                                    </div>
                                  ))}
                                  <div
                                    className="flex justify-between pt-2 mt-1"
                                    style={{ borderTop: "1px solid #EBEBEB" }}
                                  >
                                    <span
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: "#555",
                                      }}
                                    >
                                      Total
                                    </span>
                                    <span
                                      style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#0F1A10",
                                      }}
                                    >
                                      ₦
                                      {parseFloat(
                                        order.total_amount,
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
