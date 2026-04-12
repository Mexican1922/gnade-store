import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Search,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Package,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const ADMIN_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY as string;

interface Category {
  id: number;
  name: string;
  slug: string;
}
interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  usage: string;
  ingredients: string;
  image: string | null;
  hover_image: string | null;
  is_new: boolean;
  is_best_seller: boolean;
  in_stock: boolean;
  category: Category;
  created_at: string;
}

const EMPTY_FORM = {
  name: "",
  price: "",
  description: "",
  usage: "",
  ingredients: "",
  image: "",
  hover_image: "",
  is_new: false,
  is_best_seller: false,
  in_stock: true,
  category_id: "",
};

type FormState = typeof EMPTY_FORM;

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

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingHover, setUploadingHover] = useState(false);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const hoverImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        adminFetch("/products/admin/"),
        adminFetch("/products/admin/categories/"),
      ]);
      const [p, c] = await Promise.all([pRes.json(), cRes.json()]);
      setProducts(Array.isArray(p) ? p : []);
      setCategories(Array.isArray(c) ? c : []);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  async function uploadToCloudinary(file: File): Promise<string> {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );
    const json = await res.json();
    if (!json.secure_url) throw new Error("Upload failed");
    return json.secure_url;
  }

  async function handleImageUpload(field: "image" | "hover_image", file: File) {
    const setUploading =
      field === "image" ? setUploadingMain : setUploadingHover;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, [field]: url }));
    } catch {
      setError("Image upload failed. Check Cloudinary settings.");
    } finally {
      setUploading(false);
    }
  }

  function openAdd() {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setError("");
    setShowModal(true);
  }

  function openEdit(p: Product) {
    setEditProduct(p);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      usage: p.usage,
      ingredients: p.ingredients,
      image: p.image || "",
      hover_image: p.hover_image || "",
      is_new: p.is_new,
      is_best_seller: p.is_best_seller,
      in_stock: p.in_stock,
      category_id: String(p.category?.id ?? ""),
    });
    setError("");
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.price || !form.category_id) {
      setError("Name, price, and category are required.");
      return;
    }
    setSaving(true);
    setError("");
    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const payload = {
      name: form.name,
      slug,
      price: parseFloat(form.price),
      description: form.description,
      usage: form.usage,
      ingredients: form.ingredients,
      image: form.image || null,
      hover_image: form.hover_image || null,
      is_new: form.is_new,
      is_best_seller: form.is_best_seller,
      in_stock: form.in_stock,
      category_id: parseInt(form.category_id),
    };
    try {
      const res = editProduct
        ? await adminFetch(`/products/admin/${editProduct.id}/`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          })
        : await adminFetch("/products/admin/", {
            method: "POST",
            body: JSON.stringify(payload),
          });
      if (!res.ok) {
        const data = await res.json();
        setError(JSON.stringify(data));
      } else {
        setShowModal(false);
        fetchAll();
      }
    } catch {
      setError("Save failed. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await adminFetch(`/products/admin/${id}/`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Delete failed.");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

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
              Products
            </h1>
            <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
              {products.length} total products
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm transition-colors duration-200"
            style={{
              background: "#1B5E20",
              color: "#fff",
              fontSize: 12,
              letterSpacing: 0.5,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2E7D32")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1B5E20")}
          >
            <Plus size={14} strokeWidth={1.5} />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#bbb" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 border rounded-sm outline-none transition-colors duration-200"
            style={{ fontSize: 13, borderColor: "#E8E8E8", background: "#fff" }}
          />
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
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#bbb" }}>
            <Package size={40} strokeWidth={1} className="mx-auto mb-3" />
            <p style={{ fontSize: 14 }}>No products yet. Add your first one.</p>
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
                    "Product",
                    "Category",
                    "Price",
                    "Status",
                    "Tags",
                    "Actions",
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
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom:
                        i < filtered.length - 1 ? "1px solid #F5F5F5" : "none",
                    }}
                  >
                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-sm"
                            style={{ border: "1px solid #EBEBEB" }}
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-sm flex items-center justify-center"
                            style={{ background: "#F5F5F5" }}
                          >
                            <Package size={14} style={{ color: "#ccc" }} />
                          </div>
                        )}
                        <div>
                          <p
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: "#0F1A10",
                            }}
                          >
                            {p.name}
                          </p>
                          <p style={{ fontSize: 10, color: "#bbb" }}>
                            {p.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3">
                      <span style={{ fontSize: 11, color: "#666" }}>
                        {p.category?.name ?? "—"}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3">
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#0F1A10",
                        }}
                      >
                        ₦{parseFloat(p.price).toLocaleString()}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-1 rounded-sm text-xs"
                        style={{
                          background: p.in_stock ? "#F0FDF4" : "#FEF2F2",
                          color: p.in_stock ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {p.in_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    {/* Tags */}
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {p.is_new && (
                          <span
                            className="px-2 py-0.5 rounded-sm text-xs"
                            style={{ background: "#EFF6FF", color: "#3b82f6" }}
                          >
                            New
                          </span>
                        )}
                        {p.is_best_seller && (
                          <span
                            className="px-2 py-0.5 rounded-sm text-xs"
                            style={{ background: "#FFF7ED", color: "#ea580c" }}
                          >
                            Bestseller
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors duration-200"
                          style={{ border: "1px solid #E8E8E8" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#1B5E20")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "#E8E8E8")
                          }
                        >
                          <Pencil size={12} style={{ color: "#666" }} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors duration-200"
                          style={{ border: "1px solid #E8E8E8" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#dc2626")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "#E8E8E8")
                          }
                        >
                          {deleting === p.id ? (
                            <Loader2
                              size={12}
                              className="animate-spin"
                              style={{ color: "#dc2626" }}
                            />
                          ) : (
                            <Trash2 size={12} style={{ color: "#dc2626" }} />
                          )}
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

      {/* ── Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-sm"
            style={{ border: "1px solid #E8E8E8" }}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: "#EBEBEB" }}
            >
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#0F1A10",
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                {editProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X size={18} style={{ color: "#999" }} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {error && (
                <div
                  className="px-4 py-3 rounded-sm text-sm"
                  style={{ background: "#fef2f2", color: "#dc2626" }}
                >
                  {error}
                </div>
              )}

              {/* Name + Price */}
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Product Name *"
                  value={form.name}
                  onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                />
                <Field
                  label="Price (₦) *"
                  value={form.price}
                  type="number"
                  onChange={(v) => setForm((p) => ({ ...p, price: v }))}
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label
                  style={{
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "#888",
                  }}
                >
                  Category *
                </label>
                <select
                  value={form.category_id}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category_id: e.target.value }))
                  }
                  className="border px-3 py-2.5 rounded-sm outline-none"
                  style={{ fontSize: 13, borderColor: "#E8E8E8" }}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <TextArea
                label="Description"
                value={form.description}
                onChange={(v) => setForm((p) => ({ ...p, description: v }))}
              />
              <TextArea
                label="Usage"
                value={form.usage}
                onChange={(v) => setForm((p) => ({ ...p, usage: v }))}
              />
              <TextArea
                label="Ingredients"
                value={form.ingredients}
                onChange={(v) => setForm((p) => ({ ...p, ingredients: v }))}
              />

              {/* Images */}
              <div className="grid grid-cols-2 gap-4">
                <ImageUploadField
                  label="Main Image"
                  value={form.image}
                  uploading={uploadingMain}
                  inputRef={mainImageRef}
                  onFileSelect={(f) => handleImageUpload("image", f)}
                  onClear={() => setForm((p) => ({ ...p, image: "" }))}
                />
                <ImageUploadField
                  label="Hover Image"
                  value={form.hover_image}
                  uploading={uploadingHover}
                  inputRef={hoverImageRef}
                  onFileSelect={(f) => handleImageUpload("hover_image", f)}
                  onClear={() => setForm((p) => ({ ...p, hover_image: "" }))}
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <Toggle
                  label="In Stock"
                  value={form.in_stock}
                  onChange={(v) => setForm((p) => ({ ...p, in_stock: v }))}
                />
                <Toggle
                  label="New Arrival"
                  value={form.is_new}
                  onChange={(v) => setForm((p) => ({ ...p, is_new: v }))}
                />
                <Toggle
                  label="Best Seller"
                  value={form.is_best_seller}
                  onChange={(v) =>
                    setForm((p) => ({ ...p, is_best_seller: v }))
                  }
                />
              </div>
            </div>

            {/* Modal footer */}
            <div
              className="flex items-center justify-end gap-3 px-6 py-4 border-t"
              style={{ borderColor: "#EBEBEB" }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-sm text-sm transition-colors duration-200"
                style={{ border: "1px solid #E8E8E8", color: "#666" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 rounded-sm text-sm transition-colors duration-200"
                style={{ background: "#1B5E20", color: "#fff" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#2E7D32")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#1B5E20")
                }
              >
                {saving && <Loader2 size={13} className="animate-spin" />}
                {saving
                  ? "Saving..."
                  : editProduct
                    ? "Save Changes"
                    : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// ── Sub-components ──

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "#888",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2.5 rounded-sm outline-none transition-colors duration-200"
        style={{ fontSize: 13, borderColor: "#E8E8E8" }}
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "#888",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="border px-3 py-2.5 rounded-sm outline-none transition-colors duration-200 resize-none"
        style={{ fontSize: 13, borderColor: "#E8E8E8" }}
      />
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center gap-2"
    >
      {value ? (
        <ToggleRight size={22} style={{ color: "#1B5E20" }} />
      ) : (
        <ToggleLeft size={22} style={{ color: "#ccc" }} />
      )}
      <span style={{ fontSize: 12, color: "#555" }}>{label}</span>
    </button>
  );
}

function ImageUploadField({
  label,
  value,
  uploading,
  inputRef,
  onFileSelect,
  onClear,
}: {
  label: string;
  value: string;
  uploading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (f: File) => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "#888",
        }}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) onFileSelect(e.target.files[0]);
        }}
      />
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt={label}
            className="w-full h-24 object-cover rounded-sm"
            style={{ border: "1px solid #E8E8E8" }}
          />
          <button
            onClick={onClear}
            className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <X size={10} style={{ color: "#fff" }} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="h-24 border-2 border-dashed rounded-sm flex flex-col items-center justify-center gap-1 transition-colors duration-200"
          style={{ borderColor: uploading ? "#1B5E20" : "#E8E8E8" }}
        >
          {uploading ? (
            <Loader2
              size={18}
              className="animate-spin"
              style={{ color: "#1B5E20" }}
            />
          ) : (
            <Upload size={18} style={{ color: "#ccc" }} />
          )}
          <span style={{ fontSize: 11, color: "#bbb" }}>
            {uploading ? "Uploading..." : "Click to upload"}
          </span>
        </button>
      )}
    </div>
  );
}
