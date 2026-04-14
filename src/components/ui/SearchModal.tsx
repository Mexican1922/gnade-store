import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ShoppingBag } from "lucide-react";
import { productsAPI } from "../../services/api";
import { toProduct } from "../../utils/adapters";
import { Product } from "../../types";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fetch all products once on first open
  useEffect(() => {
    if (!open || products.length > 0) return;
    setLoading(true);
    productsAPI
      .getAll()
      .then((data) => setProducts(data.map(toProduct)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results =
    query.trim().length < 2
      ? []
      : products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()),
        );

  const handleSelect = (product: Product) => {
    navigate(`/product/${product.slug}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      style={{ background: "rgba(15,26,16,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-sm overflow-hidden"
        style={{
          border: "1px solid #EBEBEB",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 border-b"
          style={{ borderColor: "#F0F0F0" }}
        >
          <Search
            size={16}
            strokeWidth={1.5}
            className="text-gnade-dark/40 shrink-0"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 outline-none text-[14px] text-gnade-black placeholder:text-gnade-black/30"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="shrink-0">
              <X
                size={14}
                className="text-gnade-black/30 hover:text-gnade-black transition-colors duration-150"
              />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {/* Loading */}
          {loading && (
            <div className="px-4 py-8 text-center">
              <p className="text-[12px] text-gnade-black/30 tracking-wide">
                Loading...
              </p>
            </div>
          )}

          {/* Prompt */}
          {!loading && query.trim().length < 2 && (
            <div className="px-4 py-8 text-center">
              <p className="text-[12px] text-gnade-black/30 tracking-wide">
                Type at least 2 characters to search
              </p>
            </div>
          )}

          {/* No results */}
          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-[12px] text-gnade-black/40 tracking-wide">
                No products found for "{query}"
              </p>
            </div>
          )}

          {/* Results list */}
          {results.map((product, i) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product)}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gnade-pale transition-colors duration-150 text-left"
              style={{
                borderBottom:
                  i < results.length - 1 ? "1px solid #F5F5F5" : "none",
              }}
            >
              {/* Image */}
              <div
                className="w-12 h-12 rounded-sm overflow-hidden shrink-0"
                style={{ background: "#F1F8F1" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[9px] tracking-[1.5px] uppercase text-gnade-dark/40 mb-0.5">
                  {product.category}
                </p>
                <p className="text-[13px] font-medium text-gnade-black truncate">
                  {product.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[12px] text-gnade-dark font-medium">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[11px] text-black/30 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <ShoppingBag
                size={13}
                strokeWidth={1.5}
                className="text-gnade-dark/20 shrink-0"
              />
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div
          className="px-4 py-2.5 border-t flex items-center justify-between"
          style={{ borderColor: "#F0F0F0", background: "#FAFAF8" }}
        >
          <p className="text-[10px] text-gnade-black/25 tracking-wide">
            Press ESC to close
          </p>
          {results.length > 0 && (
            <p className="text-[10px] text-gnade-black/25 tracking-wide">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
