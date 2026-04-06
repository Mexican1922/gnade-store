import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const EmpathySection = () => {
  return (
    <section className="relative bg-gnade-dark py-24 px-6 overflow-hidden">
      {/* Subtle radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(76,175,80,0.12),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-light/70 mb-6">
          We Understand You
        </span>

        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white leading-[1.15] mb-6">
          Your Skin Struggles{" "}
          <em className="italic text-gnade-pink">Are Real.</em>
        </h2>

        <p className="text-[14px] text-white/55 leading-relaxed mb-4 font-light max-w-xl mx-auto">
          Dealing with dark spots, breakouts, uneven skin tone or persistent
          dryness? You have tried product after product with little to no
          results.
        </p>

        <p className="text-[14px] text-white/55 leading-relaxed mb-10 font-light max-w-xl mx-auto">
          Your skin does not need more products. It needs the{" "}
          <em className="italic text-white/90">right guidance</em> and
          ingredients that are actually formulated to work.
        </p>

        <Link
          to="/shop?concern=all"
          className="inline-flex items-center gap-2 border border-white/30 text-white text-[11px] tracking-[2px] uppercase px-8 py-3.5 rounded-sm hover:bg-white hover:text-gnade-dark transition-all duration-300"
        >
          Get a Skin Recommendation
          <ArrowRight size={12} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
};

export default EmpathySection;
