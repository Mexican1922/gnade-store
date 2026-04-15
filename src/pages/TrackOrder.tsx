import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Package, ChevronRight, Loader2, Search } from "lucide-react";
import { ordersAPI } from "../services/api";
import { Order } from "../services/api";

const STATUS_STEPS = ["paid", "processing", "shipped", "delivered"];

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  paid: "Order Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_DESCRIPTIONS: Record<string, string> = {
  pending: "Your order is awaiting confirmation.",
  paid: "Payment confirmed. Your order has been received.",
  processing: "We are preparing your items for shipment.",
  shipped: "Your order is on its way to you.",
  delivered: "Your order has been delivered. Enjoy!",
  cancelled: "This order has been cancelled.",
};

function StatusTimeline({ status }: { status: string }) {
  if (status === "cancelled") {
    return (
      <div
        className="px-4 py-3 rounded-sm text-sm"
        style={{
          background: "#FEF2F2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        }}
      >
        This order was cancelled.
      </div>
    );
  }

  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="flex items-center gap-0">
      {STATUS_STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            {/* Step */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: done ? "#1B5E20" : "#F0F0F0",
                  border: active ? "2px solid #4CAF50" : "none",
                }}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                )}
              </div>
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: done ? "#1B5E20" : "#bbb",
                  fontWeight: done ? 600 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {STATUS_LABELS[step]}
              </span>
            </div>

            {/* Connector */}
            {i < STATUS_STEPS.length - 1 && (
              <div
                className="flex-1 h-px mx-2 mb-5"
                style={{ background: i < currentIndex ? "#1B5E20" : "#E8E8E8" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("id") || "");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTrack() {
    if (!orderId.trim() || !email.trim()) {
      setError("Please enter both your order ID and email.");
      return;
    }
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const BASE_URL =
        import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
      const res = await fetch(
        `${BASE_URL}/orders/track/?id=${orderId.trim()}&email=${encodeURIComponent(email.trim())}`,
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Order not found.");
        return;
      }
      setOrder(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gnade-cream">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[10px] tracking-[2px] uppercase text-gnade-dark/50">
            Orders
          </span>
          <h1 className="font-serif text-3xl font-semibold text-gnade-black mt-1 mb-2">
            Track My Order
          </h1>
          <p className="text-[13px] text-gnade-black/40 leading-relaxed">
            Enter your order ID and the email used at checkout to see your order
            status.
          </p>
        </div>

        {/* Form */}
        <div
          className="bg-white rounded-sm p-6 mb-6"
          style={{ border: "1px solid #EBEBEB" }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                style={{
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#888",
                }}
              >
                Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. 1042"
                className="border px-3 py-2.5 rounded-sm outline-none text-[13px] text-gnade-black"
                style={{ borderColor: "#E8E8E8" }}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                style={{
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#888",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email used at checkout"
                className="border px-3 py-2.5 rounded-sm outline-none text-[13px] text-gnade-black"
                style={{ borderColor: "#E8E8E8" }}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>

            {error && (
              <p
                className="text-sm px-3 py-2.5 rounded-sm"
                style={{ background: "#FEF2F2", color: "#dc2626" }}
              >
                {error}
              </p>
            )}

            <button
              onClick={handleTrack}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 rounded-sm text-[11px] tracking-[1.5px] uppercase text-white transition-colors duration-200"
              style={{ background: loading ? "#4CAF50" : "#1B5E20" }}
              onMouseEnter={(e) =>
                !loading && (e.currentTarget.style.background = "#2E7D32")
              }
              onMouseLeave={(e) =>
                !loading && (e.currentTarget.style.background = "#1B5E20")
              }
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Search size={14} strokeWidth={1.5} />
              )}
              {loading ? "Searching..." : "Track Order"}
            </button>
          </div>
        </div>

        {/* Result */}
        {order && (
          <div
            className="bg-white rounded-sm overflow-hidden"
            style={{ border: "1px solid #EBEBEB" }}
          >
            {/* Order header */}
            <div
              className="px-6 py-4 border-b flex items-center justify-between"
              style={{ borderColor: "#F0F0F0", background: "#FAFAF8" }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "#999",
                    marginBottom: 2,
                  }}
                >
                  Order
                </p>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#0F1A10",
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  #{order.id}
                </p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>
                  {formatDate(order.created_at)}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1B5E20",
                  }}
                >
                  ₦{parseFloat(order.total_amount).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Status description */}
            <div
              className="px-6 py-4 border-b"
              style={{ borderColor: "#F0F0F0" }}
            >
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: 12,
                }}
              >
                Status
              </p>
              <StatusTimeline status={order.status} />
              <p
                className="mt-4"
                style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}
              >
                {STATUS_DESCRIPTIONS[order.status]}
              </p>
            </div>

            {/* Items */}
            <div
              className="px-6 py-4 border-b"
              style={{ borderColor: "#F0F0F0" }}
            >
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: 12,
                }}
              >
                Items Ordered
              </p>
              <div className="flex flex-col gap-3">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
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
                      <span style={{ fontSize: 13, color: "#333" }}>
                        {item.product_name}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: "#888" }}>
                      ₦{Number(item.subtotal).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div
                  className="flex justify-between pt-2 mt-1"
                  style={{ borderTop: "1px solid #EBEBEB" }}
                >
                  <span
                    style={{ fontSize: 12, fontWeight: 500, color: "#555" }}
                  >
                    Total
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: "#0F1A10" }}
                  >
                    ₦{parseFloat(order.total_amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="px-6 py-4">
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: 12,
                }}
              >
                Shipping To
              </p>
              <p style={{ fontSize: 13, color: "#333", marginBottom: 3 }}>
                {order.shipping_name}
              </p>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 3 }}>
                {order.shipping_address}
              </p>
              <p style={{ fontSize: 12, color: "#888" }}>
                {order.shipping_phone}
              </p>
            </div>
          </div>
        )}

        {/* Empty state — no search yet */}
        {!order && !loading && !error && (
          <div className="text-center py-10">
            <Package
              size={36}
              strokeWidth={1}
              className="mx-auto mb-3 text-gnade-dark/20"
            />
            <p style={{ fontSize: 13, color: "#bbb" }}>
              Your order details will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
