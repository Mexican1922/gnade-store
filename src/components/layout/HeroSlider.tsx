import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Slide } from "../../types";

const slides: Slide[] = [
  {
    id: 1,
    badge: "Nigeria's Glow Brand",
    heading: "Give Your Skin That",
    headingItalic: "Irresistible Glow",
    subheading:
      "Premium skincare crafted with natural ingredients. Nourish, protect and transform your skin from the inside out.",
    primaryBtn: { label: "Shop Now", path: "/shop" },
    secondaryBtn: { label: "Explore Products", path: "/shop" },
    stats: [
      { value: "5K+", label: "Happy Clients" },
      { value: "80+", label: "Products" },
      { value: "100%", label: "Natural" },
    ],
    theme: "light",
    image: "/images/serum-bottle.png",
  },
  {
    id: 2,
    badge: "New Collection",
    heading: "Lipcare That",
    headingItalic: "Lasts All Day",
    subheading:
      "From glossy lip butters to bold matte colours our lipcare line keeps your lips soft, vibrant and perfectly kissable.",
    primaryBtn: { label: "Shop Lipcare", path: "/shop?category=lipcare" },
    secondaryBtn: { label: "View Shades", path: "/shop?category=lipcare" },
    stats: [
      { value: "20+", label: "Lip Shades" },
      { value: "0%", label: "Harmful Chemicals" },
    ],
    theme: "dark",
    image: "/images/lipstick.png",
  },
  {
    id: 3,
    badge: "Spa & Wellness",
    heading: "Treat Yourself To",
    headingItalic: "A Spa Experience",
    subheading:
      "Book a professional skin consultation or spa session with our expert aestheticians. Your skin deserves expert care.",
    primaryBtn: { label: "Book Now", path: "/spa" },
    secondaryBtn: { label: "Learn More", path: "/about" },
    stats: [
      { value: "Expert", label: "Aestheticians" },
      { value: "Lagos", label: "Location" },
    ],
    theme: "darker",
    image: "/images/moisturizer.png",
  },
];

const themeStyles = {
  light: {
    wrapper: "bg-gnade-pale",
    badge: "bg-gnade-dark text-white",
    heading: "text-gnade-dark",
    italic: "text-gnade-light",
    body: "text-gnade-dark/60",
    primaryBtn: "bg-gnade-dark text-white hover:bg-gnade-mid",
    secondaryBtn:
      "border border-gnade-dark text-gnade-dark hover:bg-gnade-dark hover:text-white",
    stat: "text-gnade-dark",
    statLabel: "text-gnade-dark/50",
    divider: "border-gnade-dark/10",
    controlBg: "bg-gnade-dark/15 hover:bg-gnade-dark/30",
    controlIcon: "text-gnade-dark",
    dotActive: "bg-gnade-dark",
    dotInactive: "bg-gnade-dark/20 hover:bg-gnade-dark/40",
  },
  dark: {
    wrapper: "bg-gnade-dark",
    badge: "bg-white/15 text-white",
    heading: "text-white",
    italic: "text-gnade-pink",
    body: "text-white/65",
    primaryBtn: "bg-white text-gnade-dark hover:bg-white/90",
    secondaryBtn: "border border-white/40 text-white hover:bg-white/10",
    stat: "text-white",
    statLabel: "text-white/45",
    divider: "border-white/10",
    controlBg: "bg-white/15 hover:bg-white/30",
    controlIcon: "text-white",
    dotActive: "bg-white",
    dotInactive: "bg-white/25 hover:bg-white/45",
  },
  darker: {
    wrapper: "bg-gnade-black",
    badge: "bg-white/10 text-white",
    heading: "text-white",
    italic: "text-gnade-light",
    body: "text-white/55",
    primaryBtn: "bg-white text-gnade-black hover:bg-white/90",
    secondaryBtn: "border border-white/30 text-white hover:bg-white/10",
    stat: "text-white",
    statLabel: "text-white/40",
    divider: "border-white/10",
    controlBg: "bg-white/15 hover:bg-white/30",
    controlIcon: "text-white",
    dotActive: "bg-white",
    dotInactive: "bg-white/25 hover:bg-white/45",
  },
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((index + slides.length) % slides.length);
        setAnimating(false);
      }, 300);
    },
    [animating],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const t = themeStyles[slide.theme];

  return (
    <section
      className={`${t.wrapper} transition-colors duration-700 relative overflow-hidden`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 transition-all duration-300 ${
          animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Content */}
        <div className="flex-1 max-w-xl">
          {/* Badge */}
          <span
            className={`${t.badge} inline-block text-[10px] tracking-[2px] uppercase px-3 py-1.5 rounded-full mb-6`}
          >
            {slide.badge}
          </span>

          {/* Heading */}
          <h1
            className={`${t.heading} font-serif text-5xl md:text-6xl font-semibold leading-[1.1] mb-4`}
          >
            {slide.heading}{" "}
            <em className={`${t.italic} italic`}>{slide.headingItalic}</em>
          </h1>

          {/* Body */}
          <p
            className={`${t.body} text-[14px] leading-relaxed mb-8 max-w-md font-light`}
          >
            {slide.subheading}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Link
              to={slide.primaryBtn.path}
              className={`${t.primaryBtn} px-7 py-3 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm transition-all duration-200 hover:shadow-md`}
            >
              {slide.primaryBtn.label}
            </Link>
            <Link
              to={slide.secondaryBtn.path}
              className={`${t.secondaryBtn} px-7 py-3 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm transition-all duration-200`}
            >
              {slide.secondaryBtn.label}
            </Link>
          </div>

          {/* Stats */}
          <div className={`flex gap-8 mt-10 pt-8 border-t ${t.divider}`}>
            {slide.stats.map((stat) => (
              <div key={stat.label}>
                <div className={`${t.stat} font-serif text-3xl font-semibold`}>
                  {stat.value}
                </div>
                <div
                  className={`${t.statLabel} text-[10px] tracking-[1.5px] uppercase mt-0.5`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center md:justify-end items-center">
          <div className="relative w-64 md:w-80 h-80 md:h-96 flex items-center justify-center">
            <img
              src={slide.image}
              alt={slide.headingItalic}
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                slide.theme === "light" ? "mix-blend-multiply" : ""
              }`}
              style={
                slide.theme === "darker"
                  ? {
                      filter:
                        "drop-shadow(0 0 1px #0F1A10) drop-shadow(0 0 2px #0F1A10) drop-shadow(0 0 3px #0F1A10)",
                    }
                  : slide.theme === "dark"
                    ? {
                        filter:
                          "drop-shadow(0 0 1px #1B5E20) drop-shadow(0 0 2px #1B5E20)",
                      }
                    : undefined
              }
            />
          </div>
        </div>
      </div>

      {/* Controls — now theme-aware */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className={`w-9 h-9 rounded-full ${t.controlBg} flex items-center justify-center transition-colors duration-200`}
        >
          <ArrowLeft size={14} strokeWidth={2} className={t.controlIcon} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? `w-6 h-2 ${t.dotActive}`
                  : `w-2 h-2 ${t.dotInactive}`
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className={`w-9 h-9 rounded-full ${t.controlBg} flex items-center justify-center transition-colors duration-200`}
        >
          <ArrowRight size={14} strokeWidth={2} className={t.controlIcon} />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
