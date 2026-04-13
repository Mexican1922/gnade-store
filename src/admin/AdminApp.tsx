import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth, ClerkProvider } from "@clerk/clerk-react";
import { AdminSignIn } from "./AdminSignIn";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminOrdersPage from "./AdminOrders";
import AdminLayout from "./AdminLayout";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

function AdminCategories() {
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <h1
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#0F1A10",
            fontFamily: "Cormorant Garamond, serif",
            marginBottom: 8,
          }}
        >
          Categories
        </h1>
        <p style={{ fontSize: 13, color: "#888" }}>
          Categories management coming soon.
        </p>
      </div>
    </AdminLayout>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0F1A10" }}
      >
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  if (!isSignedIn) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminSignIn />} />
      <Route
        path=""
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="products"
        element={
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute>
            <AdminOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="categories"
        element={
          <ProtectedRoute>
            <AdminCategories />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function AdminApp() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
      <AdminRoutes />
    </ClerkProvider>
  );
}
