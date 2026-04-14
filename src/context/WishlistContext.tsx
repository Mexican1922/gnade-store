import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../types";

type WishlistContextType = {
  items: Product[];
  totalItems: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem("gnade_wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("gnade_wishlist", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) =>
      prev.find((i) => i.id === product.id) ? prev : [...prev, product],
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleItem = (product: Product) => {
    setItems((prev) =>
      prev.find((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product],
    );
  };

  const isWishlisted = (id: number) => items.some((i) => i.id === id);

  return (
    <WishlistContext.Provider
      value={{
        items,
        totalItems: items.length,
        addItem,
        removeItem,
        toggleItem,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
