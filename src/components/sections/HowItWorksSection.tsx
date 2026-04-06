import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Book Your Skin Consultation",
    description:
      "Start with a professional assessment. Know exactly what your skin needs before buying anything.",
  },
  {
    number: "02",
    title: "Understand Your Skin",
    description:
      "Get matched with products designed for your specific skin concern — not generic one-size-fits-all solutions.",
  },
  {
    number: "03",
    title: "Treat with the Right Products",
    description:
      "Use targeted GNADE formulas that deliver visible results without damaging your skin barrier.",
  },
  {
    number: "04",
    title: "Maintain Your Glow",
    description:
      "Build a sustainable routine that keeps your skin healthy, radiant and protected every single day.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-gnade-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="md:sticky md:top-24">
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-white/30 mb-6">
              How It Works
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white leading-[1.15] mb-6">
              A Simple Path to{" "}
              <em className="italic text-gnade-light">Glowing Skin</em>
            </h2>
            <p className="text-[14px] text-white/40 leading-relaxed font-light max-w-sm mb-8">
              We take the guesswork out of skincare. Follow these four steps and
              let your skin transformation begin.
            </p>
            <Link
              to="/spa"
              className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase text-white/50 border-b border-white/20 pb-0.5 hover:text-white/80 hover:border-white/40 transition-all duration-200"
            >
              Book a Consultation
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Right — Steps */}
          <div className="flex flex-col gap-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`group flex gap-6 py-8 ${
                  index !== steps.length - 1 ? "border-b border-white/8" : ""
                }`}
              >
                {/* Number */}
                <span className="font-serif text-[13px] text-white/15 group-hover:text-gnade-light/60 mt-1 w-6 flex-shrink-0 transition-colors duration-300">
                  {step.number}
                </span>

                {/* Content */}
                <div>
                  <h4 className="font-serif text-[18px] font-semibold text-white/90 mb-2 leading-snug group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-[13px] text-white/40 leading-relaxed font-light group-hover:text-white/55 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
