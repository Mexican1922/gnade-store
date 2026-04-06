import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, Heart, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { productsAPI } from "../services/api";
import type { Product as APIProduct } from "../services/api";
import { Product } from "../types";

// --- Adapter ---
function toProduct(p: APIProduct): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: parseFloat(p.price),
    image: p.image || "/placeholder.jpg",
    hoverImage: p.hover_image || undefined,
    category: p.category?.name || "",
    badge: p.is_best_seller ? "Best Seller" : p.is_new ? "New" : undefined,
    inStock: p.in_stock,
    description: p.description,
    usage: p.usage,
    // Django stores ingredients as comma-separated string
    ingredients: p.ingredients
      ? p.ingredients.split(",").map((s) => s.trim())
      : [],
    images: p.image ? [p.image] : [],
  };
}

const ProductDetail = () => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "usage" | "ingredients"
  >("description");

  // --- Fetch product ---
  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        setActiveImage(0);
        setQuantity(1);
        const data = await productsAPI.getBySlug(slug);
        const converted = toProduct(data);
        setProduct(converted);

        // Fetch related by category
        const all = await productsAPI.getAll({
          category: data.category?.slug,
        });
        setRelated(
          all
            .filter((p) => p.id !== data.id)
            .slice(0, 4)
            .map(toProduct),
        );
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  // --- Loading ---
  if (loading) {
    return (
      <div className="bg-gnade-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div className="aspect-square bg-gnade-pale animate-pulse rounded-sm" />
            <div className="space-y-4">
              <div className="h-3 bg-gnade-pale animate-pulse rounded w-1/4" />
              <div className="h-8 bg-gnade-pale animate-pulse rounded w-3/4" />
              <div className="h-6 bg-gnade-pale animate-pulse rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Not found ---
  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-gnade-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-3xl text-gnade-black/30 mb-4">
            Product not found
          </p>
          <Link
            to="/shop"
            className="text-[11px] tracking-[1.5px] uppercase text-gnade-dark border-b border-gnade-dark pb-0.5"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] text-gnade-black/40 tracking-[0.5px]">
          <Link
            to="/"
            className="hover:text-gnade-dark transition-colors duration-200"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            className="hover:text-gnade-dark transition-colors duration-200"
          >
            Shop
          </Link>
          <span>/</span>
          <span className="text-gnade-black">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-[11px] tracking-[1px] uppercase text-gnade-black/40 hover:text-gnade-dark transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          Back to Shop
        </Link>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-gnade-pale rounded-sm overflow-hidden">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                      i === activeImage
                        ? "border-gnade-dark"
                        : "border-transparent hover:border-gnade-dark/30"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] tracking-[2px] uppercase text-gnade-dark/50">
                {product.category}
              </span>
              {product.badge && product.badge !== "Out of Stock" && (
                <span className="bg-gnade-dark text-white text-[9px] tracking-[1px] uppercase px-2.5 py-1 rounded-sm">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gnade-black leading-snug mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-medium text-gnade-dark">
                ₦{product.price.toLocaleString()}
              </span>
            </div>

            {product.inStock ? (
              <p className="text-[11px] tracking-[0.5px] text-gnade-light mb-6">
                ● In Stock
              </p>
            ) : (
              <p className="text-[11px] tracking-[0.5px] text-black/30 mb-6 uppercase">
                ● Out of Stock
              </p>
            )}

            <div className="border-t border-black/5 mb-6" />

            {product.inStock && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[11px] tracking-[1px] uppercase text-gnade-black/50">
                  Quantity
                </span>
                <div className="flex items-center border border-black/10 rounded-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gnade-pale transition-colors duration-200"
                  >
                    <Minus size={12} strokeWidth={1.5} />
                  </button>
                  <span className="w-10 text-center text-[13px] font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gnade-pale transition-colors duration-200"
                  >
                    <Plus size={12} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mb-8">
              {product.inStock ? (
                <>
                  <button
                    onClick={() => {
                      addItem(product, quantity);
                      showToast(`${product.name} added to cart`);
                    }}
                    className="flex-1 bg-gnade-dark text-white py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium flex items-center justify-center gap-2 hover:bg-gnade-mid transition-colors duration-200 rounded-sm"
                  >
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    Add to Cart
                  </button>
                  <button className="w-12 border border-black/10 rounded-sm flex items-center justify-center hover:bg-gnade-pale transition-colors duration-200">
                    <Heart size={15} strokeWidth={1.5} />
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-black/5 text-black/30 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="border-t border-black/5">
              <div className="flex gap-0 border-b border-black/5">
                {(["description", "usage", "ingredients"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-[10px] tracking-[1.5px] uppercase transition-colors duration-200 ${
                        activeTab === tab
                          ? "text-gnade-dark border-b-2 border-gnade-dark -mb-px"
                          : "text-gnade-black/40 hover:text-gnade-black/60"
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>
              <div className="py-5">
                {activeTab === "description" && (
                  <p className="text-[13px] text-gnade-black/60 leading-relaxed font-light">
                    {product.description}
                  </p>
                )}
                {activeTab === "usage" && (
                  <p className="text-[13px] text-gnade-black/60 leading-relaxed font-light">
                    {product.usage}
                  </p>
                )}
                {activeTab === "ingredients" && (
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients?.map((ing) => (
                      <span
                        key={ing}
                        className="text-[11px] bg-gnade-pale text-gnade-dark px-3 py-1 rounded-full tracking-[0.3px]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="border-t border-black/5 pt-12">
              <h2 className="font-serif text-3xl font-semibold text-gnade-black mb-8">
                You May Also <em className="italic text-gnade-light">Like</em>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="group">
                    <div className="aspect-square bg-gnade-pale rounded-sm overflow-hidden mb-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-[9px] tracking-[1.5px] uppercase text-gnade-dark/50 mb-1">
                      {p.category}
                    </p>
                    <p className="font-serif text-[15px] font-semibold text-gnade-black group-hover:text-gnade-dark transition-colors duration-200">
                      {p.name}
                    </p>
                    <p className="text-[13px] text-gnade-dark mt-1">
                      ₦{p.price.toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
