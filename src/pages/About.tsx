import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Heart,
  Shield,
  Sparkles,
  MapPin,
  Users,
  Package,
  Star,
} from "lucide-react";

/* ─── Values ─── */
const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "Every ingredient is sourced from nature. No harsh chemicals, no parabens, no sulphates — just pure, effective skincare.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Formulated in Lagos by skincare experts who understand African skin. Every product is crafted with care and intention.",
  },
  {
    icon: Shield,
    title: "Dermatologist Tested",
    description:
      "Rigorously tested for safety and efficacy. Gentle enough for sensitive skin, powerful enough to deliver real results.",
  },
  {
    icon: Sparkles,
    title: "Visible Results",
    description:
      "Our customers see real transformation within weeks. We believe in products that actually work, not just promises.",
  },
];

/* ─── Stats ─── */
const stats = [
  { value: "5,000+", label: "Happy Clients", icon: Users },
  { value: "80+", label: "Products", icon: Package },
  { value: "100%", label: "Natural", icon: Leaf },
  { value: "Lagos", label: "Location", icon: MapPin },
  { value: "4.9★", label: "Average Rating", icon: Star },
];

/* ─── Milestones ─── */
const milestones = [
  {
    year: "2019",
    title: "The Spark",
    description:
      "GNADE started as a passion project — handmade lip butters sold to friends and family who couldn't stop coming back for more.",
  },
  {
    year: "2020",
    title: "Going Online",
    description:
      "We launched our first online store and expanded our range to include face care, body care and natural oils.",
  },
  {
    year: "2022",
    title: "The Spa",
    description:
      "We opened our Lagos spa studio, offering professional skin consultations and treatments alongside our product line.",
  },
  {
    year: "2024",
    title: "5,000 Clients",
    description:
      "Reached 5,000 happy customers across Nigeria with over 80 products trusted for their quality and effectiveness.",
  },
];

const About = () => {
  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* ═══════ Hero Banner ═══════ */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="/images/neauthy-skincare (2).jpg"
          alt="GNADE skincare products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block text-[10px] tracking-[2.5px] uppercase text-white/60 mb-4 animate-fade-up">
            About GNADE
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] animate-fade-up stagger-2">
            Our <em className="italic text-gnade-pink">Story</em>
          </h1>
          <p className="text-[14px] text-white/65 mt-4 max-w-lg leading-relaxed font-light animate-fade-up stagger-3">
            Born from a passion for natural beauty, GNADE creates skincare that
            celebrates and nourishes African skin.
          </p>
        </div>
      </section>

      {/* ═══════ Brand Story ═══════ */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="/images/pexels-gustavo-fring-7446658.jpg"
                alt="GNADE founder"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent card */}
            <div className="absolute -bottom-6 -right-6 bg-gnade-dark text-white p-6 rounded-sm shadow-xl hidden md:block">
              <p className="font-serif text-lg italic leading-snug max-w-[200px]">
                "Give your skin that irresistible glow..."
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-5">
              Who We Are
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gnade-black leading-[1.2] mb-6">
              Skincare That Understands{" "}
              <em className="italic text-gnade-light">Your Skin</em>
            </h2>
            <div className="space-y-4 text-[14px] text-gnade-black/60 leading-relaxed font-light">
              <p>
                GNADE was born out of frustration with a market flooded with
                products that never delivered on their promises — especially for
                melanin-rich skin. We knew there had to be a better way.
              </p>
              <p>
                Starting from a small studio in Lagos, we began formulating
                skincare products using natural ingredients sourced from across
                Africa: shea butter from Ghana, marula oil from South Africa,
                turmeric from local farms, and black soap from traditional
                artisans.
              </p>
              <p>
                Today, GNADE is trusted by thousands of customers who have
                experienced real, visible transformation. From our lip butters
                to our facial serums, every product is crafted to nourish,
                protect, and celebrate your natural beauty.
              </p>
              <p>
                We do not believe in one-size-fits-all skincare. That is why we
                also offer professional skin consultations and spa treatments —
                because your skin deserves expert care and products that are
                actually formulated for{" "}
                <em className="italic text-gnade-dark font-medium">you</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Values ═══════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-4">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gnade-black">
              Our <em className="italic text-gnade-light">Values</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className={`group bg-gnade-cream rounded-sm p-7 hover:bg-gnade-dark hover:text-white transition-all duration-500 animate-fade-up stagger-${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gnade-pale group-hover:bg-white/15 flex items-center justify-center mb-5 transition-colors duration-500">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-gnade-dark group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2 text-gnade-black group-hover:text-white transition-colors duration-500">
                    {v.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed font-light text-gnade-black/50 group-hover:text-white/70 transition-colors duration-500">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ Timeline ═══════ */}
      <section className="bg-gnade-black py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(76,175,80,0.08),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-white/30 mb-4">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
              Growing with <em className="italic text-gnade-light">Purpose</em>
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`group flex gap-6 md:gap-8 py-8 ${
                  i !== milestones.length - 1 ? "border-b border-white/8" : ""
                }`}
              >
                <span className="font-serif text-2xl font-semibold text-white/15 group-hover:text-gnade-light/50 transition-colors duration-300 w-16 flex-shrink-0 pt-0.5">
                  {m.year}
                </span>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                    {m.title}
                  </h4>
                  <p className="text-[13px] text-white/40 leading-relaxed font-light group-hover:text-white/55 transition-colors duration-300">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Stats Strip ═══════ */}
      <section className="bg-gnade-dark py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="text-white/30 mx-auto mb-2"
                  />
                  <div className="font-serif text-2xl md:text-3xl font-semibold text-white">
                    {s.value}
                  </div>
                  <div className="text-[10px] tracking-[1.5px] uppercase text-white/40 mt-1">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-gnade-cream py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-5">
            Start Your Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gnade-black leading-[1.15] mb-4">
            Ready to Transform{" "}
            <em className="italic text-gnade-light">Your Skin?</em>
          </h2>
          <p className="text-[14px] text-gnade-black/50 leading-relaxed font-light mb-10 max-w-md mx-auto">
            Whether you are ready to shop or want expert guidance first, we are
            here to help you achieve your best skin ever.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="bg-gnade-dark text-white px-8 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-gnade-mid transition-colors duration-200 hover:shadow-md"
            >
              Shop Now
            </Link>
            <Link
              to="/spa"
              className="border border-gnade-dark text-gnade-dark px-8 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-gnade-dark hover:text-white transition-all duration-200 inline-flex items-center gap-2"
            >
              Book a Consultation
              <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
