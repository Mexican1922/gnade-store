import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-gnade-cream flex flex-col items-center justify-center text-center px-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* 404 number */}
      <p
        className="text-[120px] md:text-[180px] font-serif leading-none text-gnade-pale select-none"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        404
      </p>

      {/* Message */}
      <h1
        className="text-2xl md:text-3xl text-gnade-black -mt-4 mb-3"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Page not found
      </h1>
      <p className="text-[13px] text-gnade-dark/50 max-w-xs leading-relaxed mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="bg-gnade-dark text-white text-[10px] tracking-[2px] uppercase px-8 py-3.5 hover:bg-gnade-mid transition-colors duration-200"
        >
          Back to Home
        </Link>
        <Link
          to="/shop"
          className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/50 hover:text-gnade-dark transition-colors duration-200"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
