import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const ref = params.get("ref");

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
      {ref && (
        <p className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/40 bg-gnade-pale px-5 py-2.5">
          Reference: {ref}
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
          to="/"
          className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/50 hover:text-gnade-dark transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
