import { useEffect, useState } from "react";
import { Package, ShoppingBag, TrendingUp, AlertCircle, Star, Sparkles } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const ADMIN_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY as string;

function adminFetch(endpoint: string) {
  return fetch(`${API}${endpoint}`, {
    headers: { "Content-Type": "application/json", "X-Admin-Key": ADMIN_KEY },
  });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    outOfStock: 0,
    newArrivals: 0,
    bestSellers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [pRes, oRes] = await Promise.all([
          adminFetch("/products/admin/"),
          fetch(`${API}/orders/`, { headers: { "X-Admin-Key": ADMIN_KEY } }),
        ]);
        const products = await pRes.json();
        const orders = oRes.ok ? await oRes.json() : [];
        const revenue = Array.isArray(orders)
          ? orders.reduce(
              (sum: number, o: { total_amount: string }) =>
                sum + parseFloat(o.total_amount || "0"),
              0,
            )
          : 0;
        const outOfStock = Array.isArray(products)
          ? products.filter((p: { in_stock: boolean }) => !p.in_stock).length
          : 0;
        const newArrivals = Array.isArray(products)
          ? products.filter((p: { is_new: boolean }) => p.is_new).length
          : 0;
        const bestSellers = Array.isArray(products)
          ? products.filter((p: { is_best_seller: boolean }) => p.is_best_seller).length
          : 0;
        setStats({
          products: Array.isArray(products) ? products.length : 0,
          orders: Array.isArray(orders) ? orders.length : 0,
          revenue,
          outOfStock,
          newArrivals,
          bestSellers,
        });
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats.products,
      icon: Package,
      color: "#1B5E20",
      bg: "#F0FDF4",
      link: "/admin/products",
    },
    {
      label: "Total Orders",
      value: stats.orders,
      icon: ShoppingBag,
      color: "#1e40af",
      bg: "#EFF6FF",
      link: "/admin/orders",
    },
    {
      label: "Total Revenue",
      value: `₦${stats.revenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "#b45309",
      bg: "#FFFBEB",
      link: "/admin/orders",
    },
    {
      label: "Out of Stock",
      value: stats.outOfStock,
      icon: AlertCircle,
      color: "#dc2626",
      bg: "#FEF2F2",
      link: "/admin/products",
    },
    {
      label: "New Arrivals",
      value: stats.newArrivals,
      icon: Sparkles,
      color: "#3b82f6",
      bg: "#EFF6FF",
      link: "/admin/products",
    },
    {
      label: "Best Sellers",
      value: stats.bestSellers,
      icon: Star,
      color: "#f59e0b",
      bg: "#FEF3C7",
      link: "/admin/products",
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#0F1A10",
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Dashboard
          </h1>
          <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
            Welcome back. Here's what's happening with GNADE.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.link}
                className="bg-white rounded-sm p-5 border transition-shadow duration-200 hover:shadow-md"
                style={{ borderColor: "#EBEBEB" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center"
                    style={{ background: card.bg }}
                  >
                    <Icon
                      size={16}
                      style={{ color: card.color }}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <p
                  style={{
                    fontSize: loading ? 14 : 22,
                    fontWeight: 700,
                    color: "#0F1A10",
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  {loading ? "—" : card.value}
                </p>
                <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                  {card.label}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Quick actions */}
        <div
          className="bg-white rounded-sm border p-6"
          style={{ borderColor: "#EBEBEB" }}
        >
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#0F1A10",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "Add New Product",
                path: "/admin/products",
                color: "#1B5E20",
              },
              {
                label: "View All Orders",
                path: "/admin/orders",
                color: "#1e40af",
              },
              { label: "View Store", path: "/", color: "#555" },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="px-4 py-2 rounded-sm text-xs transition-opacity duration-200 hover:opacity-80"
                style={{
                  background: action.color,
                  color: "#fff",
                  letterSpacing: 0.5,
                }}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
