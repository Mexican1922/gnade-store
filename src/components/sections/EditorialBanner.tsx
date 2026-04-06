import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const EditorialBanner = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left — Large Feature */}
          <Link
            to="/shop?category=skincare"
            className="group relative overflow-hidden rounded-sm aspect-[4/5] md:aspect-auto"
          >
            <img
              src="/images/nora-topicals.jpg"
              alt="Skincare collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block text-[10px] tracking-[2px] uppercase text-white/60 mb-2">
                Skincare
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white leading-snug mb-3">
                Reveal Your <em className="italic">Natural Glow</em>
              </h3>
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase text-white/80 border-b border-white/30 pb-0.5 group-hover:border-white/60 transition-all duration-300">
                Shop Skincare
                <ArrowRight size={11} strokeWidth={1.5} />
              </span>
            </div>
          </Link>

          {/* Right — Two Stacked */}
          <div className="flex flex-col gap-4 md:gap-6">
            <Link
              to="/shop?category=lipcare"
              className="group relative overflow-hidden rounded-sm flex-1 min-h-[220px]"
            >
              <img
                src="/images/model-lip.jpg"
                alt="Lipcare collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block text-[10px] tracking-[2px] uppercase text-white/60 mb-1.5">
                  Lipcare
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-white leading-snug mb-2">
                  Bold Lips, <em className="italic">Soft Finish</em>
                </h3>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase text-white/80 border-b border-white/30 pb-0.5 group-hover:border-white/60 transition-all duration-300">
                  Shop Lipcare <ArrowRight size={11} strokeWidth={1.5} />
                </span>
              </div>
            </Link>

            <Link
              to="/spa"
              className="group relative overflow-hidden rounded-sm flex-1 min-h-[220px]"
            >
              <img
                src="/images/content-pixie.jpg"
                alt="Spa experience"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block text-[10px] tracking-[2px] uppercase text-white/60 mb-1.5">
                  Spa & Wellness
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-white leading-snug mb-2">
                  The <em className="italic">GNADE Spa</em> Experience
                </h3>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase text-white/80 border-b border-white/30 pb-0.5 group-hover:border-white/60 transition-all duration-300">
                  Book Now <ArrowRight size={11} strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBanner;
