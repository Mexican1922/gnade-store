import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import { productsAPI } from "../services/api";
import { Product } from "../types";
import { toProduct, FALLBACK_CATEGORIES } from "../utils/adapters";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Sellers", value: "best" },
];


const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("latest");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeCategory = searchParams.get("category") || "all";

  // --- Fetch products + categories from Django ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productData, catRes] = await Promise.all([
          productsAPI.getAll(),
          fetch(`${API_URL}/products/categories/`).then((r) => r.json()),
        ]);
        setProducts(productData.map(toProduct));
        if (Array.isArray(catRes) && catRes.length > 0) {
          setCategories(["All", ...catRes.map((c: { name: string }) => c.name)]);
        }
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const setCategory = (cat: string) => {
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat.toLowerCase());
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory && activeCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best":
        result = result.filter((p) => p.badge === "Best Seller");
        break;
      default:
        break;
    }

    return result;
  }, [products, activeCategory, sort]);

  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-black/5 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] tracking-[2px] uppercase text-gnade-dark/50">
            Browse
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gnade-black mt-1">
            All Products
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => {
              const isActive =
                cat === "All"
                  ? activeCategory === "all" || !activeCategory
                  : activeCategory === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 text-[11px] tracking-[1px] uppercase rounded-full border transition-all duration-200 ${
                    isActive
                      ? "bg-gnade-dark text-white border-gnade-dark"
                      : "bg-white text-gnade-black/60 border-black/10 hover:border-gnade-dark hover:text-gnade-dark"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gnade-black/40 tracking-[0.5px]">
              {loading ? "Loading..." : `${filtered.length} products`}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-[11px] tracking-[0.5px] border border-black/10 rounded-sm px-3 py-1.5 bg-white text-gnade-black outline-none cursor-pointer hover:border-gnade-dark transition-colors duration-200"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden flex items-center gap-2 text-[11px] tracking-[1px] uppercase border border-black/10 px-3 py-1.5 rounded-sm hover:border-gnade-dark transition-colors duration-200"
            >
              {filtersOpen ? (
                <X size={12} strokeWidth={1.5} />
              ) : (
                <SlidersHorizontal size={12} strokeWidth={1.5} />
              )}
              Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white animate-pulse">
                <div className="aspect-[3/4] bg-gnade-pale" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gnade-pale rounded w-3/4" />
                  <div className="h-3 bg-gnade-pale rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-red-400 mb-3">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-gnade-black/30 mb-3">
              No products found
            </p>
            <p className="text-[13px] text-gnade-black/30 font-light">
              Try selecting a different category
            </p>
            <button
              onClick={() => setCategory("All")}
              className="mt-6 text-[11px] tracking-[1.5px] uppercase text-gnade-dark border-b border-gnade-dark pb-0.5 hover:opacity-70 transition-opacity duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
