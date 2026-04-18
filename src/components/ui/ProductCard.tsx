import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useWishlist } from "../../context/WishlistContext";
import { optimizeImage } from "../../utils/cloudinary";

interface ProductCardProps {
  product: Product;
}

const badgeStyles = {
  "Best Seller": "bg-gnade-dark text-white",
  New: "bg-gnade-black text-white",
  Sale: "bg-gnade-pink text-gnade-dark",
  "Out of Stock": "bg-black/10 text-black/50",
};
const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const { showToast } = useToast();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const preventNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="group bg-gnade-cream rounded-sm overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-lg">
      {/* Image */}
      <Link to={`/product/${product.slug}`}>
        <div className="relative h-48 sm:h-56 md:h-64 bg-gnade-pale overflow-hidden">
          <img
            src={optimizeImage(product.image, 600)}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            } ${
              product.hoverImage
                ? "group-hover:opacity-0"
                : imgLoaded
                  ? "group-hover:scale-105"
                  : ""
            }`}
          />

          {/* Hover Image */}
          {product.hoverImage && (
            <img
              src={optimizeImage(product.hoverImage, 600)}
              alt={`${product.name} — alternate view`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105 ease-out"
            />
          )}

          {/* Badge */}
          {product.badge && (
            <span
              className={`${badgeStyles[product.badge]} absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[8px] sm:text-[9px] tracking-[1.5px] uppercase font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm z-10`}
            >
              {product.badge}
            </span>
          )}

          {/* Desktop-only (lg+): hover slide-up actions */}
          {product.inStock && (
            <div className="hidden lg:flex absolute bottom-0 left-0 right-0 gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gnade-dark text-white text-[10px] tracking-[1.5px] uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 hover:bg-gnade-mid transition-colors duration-200"
              >
                <ShoppingBag size={12} strokeWidth={1.5} />
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                aria-label="Add to wishlist"
                className="w-10 bg-white text-gnade-dark rounded-sm flex items-center justify-center hover:bg-gnade-pale transition-colors duration-200"
              >
                <Heart
                  size={13}
                  strokeWidth={1.5}
                  fill={wishlisted ? "currentColor" : "none"}
                  className={wishlisted ? "text-gnade-pink" : "text-gnade-dark"}
                />
              </button>
            </div>
          )}

          {/* Mobile + Tablet: wishlist button in top-right corner */}
          {product.inStock && (
            <button
              onClick={handleToggleWishlist}
              aria-label="Add to wishlist"
              className="lg:hidden absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10 active:scale-95 transition-transform duration-150"
            >
              <Heart
                size={13}
                strokeWidth={1.5}
                fill={wishlisted ? "currentColor" : "none"}
                className={wishlisted ? "text-gnade-pink" : "text-gnade-dark"}
              />
            </button>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <p className="text-[8px] sm:text-[9px] tracking-[1.5px] uppercase text-gnade-dark/50 mb-1 sm:mb-1.5">
          {product.category}
        </p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-[14px] sm:text-[16px] font-semibold text-gnade-black leading-snug mb-1.5 sm:mb-2 group-hover:text-gnade-dark transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[13px] sm:text-[14px] font-medium text-gnade-dark">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] sm:text-[12px] text-black/30 line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {product.stockCount && product.stockCount <= 10 && product.inStock && (
          <p className="text-[9px] sm:text-[10px] text-red-500/80 mt-1 sm:mt-1.5 tracking-[0.3px]">
            Only {product.stockCount} left in stock
          </p>
        )}
        {!product.inStock && (
          <p className="text-[9px] sm:text-[10px] text-black/40 mt-1 sm:mt-1.5 tracking-[0.3px] uppercase">
            Out of stock
          </p>
        )}
      </div>

      {/* Mobile + Tablet: always-visible Add to Cart */}
      {product.inStock && (
        <div className="lg:hidden px-3 pb-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gnade-dark text-white text-[10px] tracking-[1.5px] uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 active:bg-gnade-mid transition-colors duration-200"
          >
            <ShoppingBag size={12} strokeWidth={1.5} />
            Add to Cart
          </button>
        </div>
      )}
      {!product.inStock && (
        <div className="lg:hidden px-3 pb-3">
          <button
            disabled
            className="w-full bg-black/5 text-black/35 text-[10px] tracking-[1.5px] uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 cursor-not-allowed"
          >
            Sold Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
