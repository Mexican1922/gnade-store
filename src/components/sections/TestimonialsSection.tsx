import { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  review: string;
  rating: number;
  source: "Google" | "Instagram" | "WhatsApp";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adaeze N.",
    location: "Lagos",
    review:
      "I have been using the lip butter for 3 weeks and my lips have never felt this soft. The rose scent is absolutely perfect. I will definitely be ordering again.",
    rating: 5,
    source: "Google",
  },
  {
    id: 2,
    name: "Tope F.",
    location: "Abuja",
    review:
      "The Vitamin C serum cleared my dark spots in less than a month. My skin is literally glowing. I have tried so many products before this — GNADE is the real deal.",
    rating: 5,
    source: "Google",
  },
  {
    id: 3,
    name: "Chisom B.",
    location: "Enugu",
    review:
      "Fast delivery and the packaging is so beautiful. The body scrub left my skin incredibly smooth. I ordered for my sister too and she absolutely loves it.",
    rating: 5,
    source: "Google",
  },
  {
    id: 4,
    name: "Funmi A.",
    location: "Port Harcourt",
    review:
      "The spa experience was incredible. The aesthetician was so knowledgeable and my skin felt completely transformed after just one session. Worth every naira.",
    rating: 5,
    source: "Google",
  },
  {
    id: 5,
    name: "Blessing O.",
    location: "Lagos",
    review:
      "I was skeptical at first but the results speak for themselves. My acne has cleared up significantly and my skin tone is so much more even now.",
    rating: 5,
    source: "Instagram",
  },
  {
    id: 6,
    name: "Ngozi E.",
    location: "Ibadan",
    review:
      "Customer service is top notch. They helped me pick the right products for my skin type and followed up to make sure I was happy. Will always come back.",
    rating: 5,
    source: "WhatsApp",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i} className="text-gnade-light text-[13px]">
          ★
        </span>
      ))}
    </div>
  );
};

const sourceStyles = {
  Google: "bg-blue-50 text-blue-600",
  Instagram: "bg-pink-50 text-pink-500",
  WhatsApp: "bg-green-50 text-green-600",
};

const CARDS_PER_PAGE = 3;

const TestimonialsSection = () => {
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);

  const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);
  const visible = testimonials.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  const changePage = useCallback(
    (newPage: number) => {
      if (fading || newPage < 0 || newPage >= totalPages) return;
      setFading(true);
      setTimeout(() => {
        setPage(newPage);
        setFading(false);
      }, 250);
    },
    [fading, totalPages],
  );

  return (
    <section className="bg-gnade-pink py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-4">
              Customer Reviews
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-gnade-black leading-[1.15]">
              What Our Clients{" "}
              <em className="italic text-gnade-dark">Are Saying</em>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 0}
              aria-label="Previous reviews"
              className="w-10 h-10 rounded-full border border-gnade-dark/20 flex items-center justify-center hover:bg-gnade-dark hover:text-white hover:border-gnade-dark transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-gnade-dark/20"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
            </button>
            <span className="text-[12px] text-gnade-dark/40 tracking-[1px] tabular-nums min-w-[40px] text-center">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages - 1}
              aria-label="Next reviews"
              className="w-10 h-10 rounded-full border border-gnade-dark/20 flex items-center justify-center hover:bg-gnade-dark hover:text-white hover:border-gnade-dark transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-gnade-dark/20"
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 transition-opacity duration-250 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {visible.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-sm p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <StarRating rating={t.rating} />
                <span
                  className={`${sourceStyles[t.source]} text-[9px] tracking-[1px] uppercase font-semibold px-2.5 py-1 rounded-full`}
                >
                  {t.source}
                </span>
              </div>

              {/* Review */}
              <p className="text-[13px] text-gnade-black/70 leading-relaxed font-light flex-1 italic font-serif">
                "{t.review}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-3 border-t border-black/5">
                <div className="w-8 h-8 rounded-full bg-gnade-pale flex items-center justify-center font-serif font-semibold text-[13px] text-gnade-dark flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gnade-black">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-gnade-black/40">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
