import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { CartItem, Product } from "../types";

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "INCREMENT"; payload: number }
  | { type: "DECREMENT"; payload: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.id === action.payload.product.id,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.product.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...action.payload.product, quantity: action.payload.quantity },
        ],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };
    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i,
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [] },
    (initial) => {
      try {
        const localData = localStorage.getItem("gnade_cart");
        return localData ? { items: JSON.parse(localData) } : initial;
      } catch {
        return initial;
      }
    },
  );

  useEffect(() => {
    localStorage.setItem("gnade_cart", JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce(
    (sum: number, i: CartItem) => sum + i.quantity,
    0,
  );
  const totalPrice = state.items.reduce(
    (sum: number, i: CartItem) => sum + i.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addItem: (product: Product, quantity = 1) =>
          dispatch({ type: "ADD_ITEM", payload: { product, quantity } }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
        increment: (id) => dispatch({ type: "INCREMENT", payload: id }),
        decrement: (id) => dispatch({ type: "DECREMENT", payload: id }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
