import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (product: any) => {
    addItem(product);
    removeItem(product.id);
    showToast(`${product.name} moved to cart`);
  };

  return (
    <div className="min-h-screen bg-gnade-cream">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-semibold text-gnade-black tracking-wide mb-1">
            My Wishlist
          </h1>
          <p className="text-sm text-gnade-black/40">
            {items.length === 0
              ? "Your wishlist is empty"
              : `${items.length} saved item${items.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <Heart size={48} strokeWidth={1} className="text-gnade-dark/20" />
            <p className="text-sm text-gnade-black/40 tracking-wide">
              Nothing saved yet
            </p>
            <Link
              to="/shop"
              className="text-[11px] tracking-[2px] uppercase text-white bg-gnade-dark px-6 py-3 rounded-sm hover:bg-gnade-mid transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-sm overflow-hidden border border-black/5 group"
              >
                {/* Image */}
                <Link
                  to={`/product/${product.slug}`}
                  className="block relative h-56 bg-gnade-pale overflow-hidden"
                >
                  <img
                    src={product.image ?? ""}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                  >
                    <X size={12} className="text-red-400" />
                  </button>
                </Link>

                {/* Info */}
                <div className="p-4">
                  <p className="text-[9px] tracking-[1.5px] uppercase text-gnade-dark/50 mb-1">
                    {typeof product.category === "object"
                      ? (product.category as any).name
                      : product.category}
                  </p>
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-serif text-[15px] font-semibold text-gnade-black mb-2 hover:text-gnade-dark transition-colors duration-200">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[14px] font-medium text-gnade-dark">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[12px] text-black/30 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-gnade-dark text-white text-[10px] tracking-[1.5px] uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 hover:bg-gnade-mid transition-colors duration-200"
                  >
                    <ShoppingBag size={12} strokeWidth={1.5} />
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
