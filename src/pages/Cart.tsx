import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, increment, decrement } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gnade-cream flex flex-col items-center justify-center gap-6 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-gnade-pale flex items-center justify-center mb-2">
          <ShoppingBag size={28} strokeWidth={1} className="text-gnade-dark" />
        </div>
        <h1
          className="text-3xl md:text-4xl text-gnade-black"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Your cart is empty
        </h1>
        <p
          className="text-sm text-gnade-dark/50 max-w-xs"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Discover skincare crafted to give your skin that irresistible glow.
        </p>
        <Link
          to="/shop"
          className="mt-2 bg-gnade-dark text-white text-[10px] tracking-[2px] uppercase px-10 py-3.5 hover:bg-gnade-mid transition-colors duration-200"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gnade-cream"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Page Header */}
      <div className="border-b border-gnade-pale px-5 md:px-12 lg:px-20 py-10">
        <p className="text-[9px] tracking-[2px] uppercase text-gnade-dark/40 mb-1">
          GNADE Essential
        </p>
        <h1
          className="text-3xl md:text-4xl text-gnade-black"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Your Cart{" "}
          <span className="text-gnade-dark/40 text-2xl">({totalItems})</span>
        </h1>
      </div>

      <div className="px-5 md:px-12 lg:px-20 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col divide-y divide-gnade-pale">
          {items.map((item) => (
            <div key={item.id} className="flex gap-5 py-6">
              {/* Product Image */}
              <Link
                to={`/product/${item.slug}`}
                className="w-24 h-24 md:w-28 md:h-28 shrink-0 bg-gnade-pale overflow-hidden block"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="text-[8px] tracking-[1.5px] uppercase text-gnade-dark/40 mb-0.5">
                      {item.category}
                    </p>
                    <Link to={`/product/${item.slug}`}>
                      <h3
                        className="text-[15px] md:text-[16px] text-gnade-black leading-snug hover:text-gnade-dark transition-colors"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                      >
                        {item.name}
                      </h3>
                    </Link>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="text-gnade-dark/30 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                  >
                    <Trash2 size={15} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-gnade-pale">
                    <button
                      onClick={() => decrement(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-gnade-dark/60 hover:bg-gnade-pale transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-[13px] text-gnade-black border-x border-gnade-pale">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increment(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-gnade-dark/60 hover:bg-gnade-pale transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right">
                    <p className="text-[14px] font-medium text-gnade-dark">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-gnade-dark/40">
                        ₦{item.price.toLocaleString()} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gnade-pale p-7 sticky top-24">
            <h2
              className="text-xl text-gnade-black mb-6"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 text-[13px] text-gnade-dark/70 mb-6">
              <div className="flex justify-between">
                <span>
                  Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""})
                </span>
                <span className="text-gnade-black font-medium">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-gnade-dark/40 italic text-[12px]">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="border-t border-gnade-dark/10 pt-4 flex justify-between text-[14px] font-medium text-gnade-black mb-7">
              <span>Estimated Total</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-gnade-dark text-white text-center text-[10px] tracking-[2px] uppercase py-4 hover:bg-gnade-mid transition-colors duration-200 mb-3"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              className="block w-full text-center text-[10px] tracking-[1.5px] uppercase text-gnade-dark/50 py-2 hover:text-gnade-dark transition-colors duration-200"
            >
              Continue Shopping
            </Link>

            {/* Trust note */}
            <p className="text-[10px] text-gnade-dark/35 text-center mt-6 leading-relaxed">
              Secure checkout powered by Paystack.
              <br />
              Free returns within 7 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
