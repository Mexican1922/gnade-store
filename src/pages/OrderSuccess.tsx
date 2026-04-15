import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const ref = params.get("ref");
  const orderId = params.get("order_id");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-gnade-cream flex flex-col items-center justify-center text-center px-6 gap-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <CheckCircle size={52} strokeWidth={1} className="text-gnade-dark" />
      <h1
        className="text-3xl md:text-4xl text-gnade-black"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Order Confirmed
      </h1>
      <p className="text-sm text-gnade-dark/60 max-w-sm leading-relaxed">
        Thank you for your order. We've received your payment and will begin
        preparing your skincare items shortly.
      </p>

      {/* Order ID — what customer needs to track */}
      {orderId && (
        <div
          className="flex flex-col items-center gap-1 bg-white px-8 py-4 rounded-sm"
          style={{ border: "1px solid #EBEBEB" }}
        >
          <p className="text-[9px] tracking-[2px] uppercase text-gnade-dark/40">
            Your Order ID
          </p>
          <p
            className="text-2xl font-semibold text-gnade-dark"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            #{orderId}
          </p>
          <p className="text-[10px] text-gnade-black/30 mt-1">
            Save this to track your order
          </p>
        </div>
      )}

      {/* Paystack ref — smaller, secondary */}
      {ref && (
        <p className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/40 bg-gnade-pale px-5 py-2.5">
          Payment Ref: {ref}
        </p>
      )}

      <div className="flex items-center gap-4 mt-2">
        <Link
          to="/shop"
          className="bg-gnade-dark text-white text-[10px] tracking-[2px] uppercase px-8 py-3.5 hover:bg-gnade-mid transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to={`/track-order${orderId ? `?id=${orderId}` : ""}`}
          className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/50 hover:text-gnade-dark transition-colors"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
}
