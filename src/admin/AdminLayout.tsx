import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { label: "Categories", path: "/admin/categories", icon: Tag },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "DM Sans, sans-serif", background: "#F8F8F6" }}
    >
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "#0F1A10",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div
          className="px-6 py-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <Link to="/admin" className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 18,
                color: "#fff",
                letterSpacing: 3,
              }}
            >
              GNADE
            </span>
            <span
              style={{
                fontSize: 9,
                letterSpacing: 2,
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
              }}
            >
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              location.pathname === item.path ||
              (item.path !== "/admin" &&
                location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 group"
                style={{
                  background: active ? "rgba(76,175,80,0.15)" : "transparent",
                  color: active ? "#4CAF50" : "rgba(255,255,255,0.45)",
                }}
              >
                <Icon size={15} strokeWidth={1.5} />
                <span style={{ fontSize: 13, letterSpacing: 0.3 }}>
                  {item.label}
                </span>
                {active && (
                  <ChevronRight
                    size={12}
                    className="ml-auto"
                    style={{ color: "#4CAF50" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User + Sign out */}
        <div
          className="px-4 py-5 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ background: "#2E7D32", color: "#fff" }}
            >
              {user?.firstName?.[0] ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p
                style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}
                className="truncate"
              >
                {user?.firstName} {user?.lastName}
              </p>
              <p
                style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}
                className="truncate"
              >
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-sm transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            <LogOut size={13} strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col md:ml-60">
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 h-14 border-b"
          style={{ background: "#fff", borderColor: "#EBEBEB" }}
        >
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div
            className="hidden md:flex items-center gap-2 text-xs"
            style={{ color: "#888" }}
          >
            {navItems.find(
              (n) =>
                location.pathname === n.path ||
                (n.path !== "/admin" && location.pathname.startsWith(n.path)),
            )?.label ?? "Dashboard"}
          </div>
          <Link
            to="/"
            className="text-xs transition-colors duration-200"
            style={{ color: "#888" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1B5E20")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            ← View Store
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
