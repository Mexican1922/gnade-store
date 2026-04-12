import type { Product as APIProduct } from "../services/api";
import { Product } from "../types";

export const FALLBACK_CATEGORIES = [
  "All", "Lipcare", "Face Care", "Body Care", "Natural Oils", "Soaps", "Spa",
];

export function toProduct(p: APIProduct): Product {
  const origPrice = p.original_price ? parseFloat(p.original_price) : undefined;
  const isSale = !!origPrice && origPrice > parseFloat(p.price);

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: parseFloat(p.price),
    originalPrice: origPrice,
    image: p.image || "/placeholder.jpg",
    hoverImage: p.hover_image || undefined,
    category: p.category?.name || "",
    badge: isSale
      ? "Sale"
      : p.is_best_seller
        ? "Best Seller"
        : p.is_new
          ? "New"
          : undefined,
    stockCount: p.stock_count ?? undefined,
    inStock: p.in_stock,
    description: p.description,
    usage: p.usage,
    ingredients: p.ingredients
      ? p.ingredients.split(",").map((s) => s.trim())
      : [],
    images: p.image ? [p.image] : [],
  };
}
