import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, FolderRoot } from "lucide-react";
import AdminLayout from "./AdminLayout";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const ADMIN_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY as string;

interface Category {
  id: number;
  name: string;
  slug: string;
}

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

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await adminFetch("/products/admin/categories/");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditCategory(null);
    setName("");
    setError("");
    setShowModal(true);
  }

  function openEdit(c: Category) {
    setEditCategory(c);
    setName(c.name);
    setError("");
    setShowModal(true);
  }

  async function handleSave() {
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    setSaving(true);
    setError("");
    
    const slug = name.toLowerCase().trim().replace(/\\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    try {
      const res = editCategory
        ? await adminFetch(`/products/admin/categories/${editCategory.id}/`, {
            method: "PATCH",
            body: JSON.stringify({ name, slug }),
          })
        : await adminFetch("/products/admin/categories/", {
            method: "POST",
            body: JSON.stringify({ name, slug }),
          });
      if (!res.ok) throw new Error();
      setShowModal(false);
      fetchCategories();
    } catch {
      setError("Save failed. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this category? Products in this category may be affected.")) return;
    setDeleting(id);
    try {
      await adminFetch(`/products/admin/categories/${id}/`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Delete failed. Make sure no products are attached.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: "#0F1A10", fontFamily: "Cormorant Garamond, serif" }}>
              Categories
            </h1>
            <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{categories.length} total categories</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm transition-colors duration-200"
            style={{ background: "#1B5E20", color: "#fff", fontSize: 12, letterSpacing: 0.5 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2E7D32")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1B5E20")}
          >
            <Plus size={14} strokeWidth={1.5} />
            Add Category
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-sm text-sm" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>
            {error}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin" style={{ color: "#1B5E20" }} />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#bbb" }}>
            <FolderRoot size={40} strokeWidth={1} className="mx-auto mb-3" />
            <p style={{ fontSize: 14 }}>No categories found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-sm border overflow-hidden" style={{ borderColor: "#EBEBEB" }}>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #EBEBEB" }}>
                  {["Name", "Slug", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3" style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 500 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i < categories.length - 1 ? "1px solid #F5F5F5" : "none" }}>
                    <td className="px-4 py-3">
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#0F1A10" }}>{c.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: 11, color: "#666" }}>{c.slug}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors duration-200"
                          style={{ border: "1px solid #E8E8E8" }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1B5E20")}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E8E8")}
                        >
                          <Pencil size={12} style={{ color: "#666" }} />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={deleting === c.id}
                          className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors duration-200"
                          style={{ border: "1px solid #E8E8E8" }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#dc2626")}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E8E8")}
                        >
                          {deleting === c.id ? <Loader2 size={12} className="animate-spin" style={{ color: "#dc2626" }} /> : <Trash2 size={12} style={{ color: "#dc2626" }} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-md bg-white rounded-sm" style={{ border: "1px solid #E8E8E8" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#EBEBEB" }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#0F1A10", fontFamily: "Cormorant Garamond, serif" }}>
                {editCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X size={18} style={{ color: "#999" }} />
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {error && <div className="px-4 py-3 rounded-sm text-sm" style={{ background: "#fef2f2", color: "#dc2626" }}>{error}</div>}
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#888" }}>Category Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border px-3 py-2.5 rounded-sm outline-none transition-colors duration-200"
                  style={{ fontSize: 13, borderColor: "#E8E8E8" }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: "#EBEBEB" }}>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-sm text-sm transition-colors duration-200" style={{ border: "1px solid #E8E8E8", color: "#666" }}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 rounded-sm text-sm transition-colors duration-200"
                style={{ background: "#1B5E20", color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2E7D32")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1B5E20")}
              >
                {saving && <Loader2 size={13} className="animate-spin" />}
                {saving ? "Saving..." : editCategory ? "Save Changes" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
