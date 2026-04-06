export interface Slide {
  id: number;
  badge: string;
  heading: string;
  headingItalic: string;
  subheading: string;
  primaryBtn: { label: string; path: string };
  secondaryBtn: { label: string; path: string };
  stats: { value: string; label: string }[];
  theme: "light" | "dark" | "darker";
  image: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: "Best Seller" | "New" | "Sale" | "Out of Stock";
  stockCount?: number;
  inStock: boolean;
  description?: string;
  usage?: string;
  ingredients?: string[];
  images?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
