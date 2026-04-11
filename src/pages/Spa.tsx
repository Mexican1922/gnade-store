import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Clock,
  Star,
  MessageCircle,
  CheckCircle,
  Leaf,
  Heart,
} from "lucide-react";

/* ─── Services ─── */
const services = [
  {
    title: "Deep Cleanse Facial",
    description:
      "A thorough deep-cleansing treatment that purifies pores, removes impurities and leaves your skin refreshed, balanced and luminous.",
    duration: "60 min",
    price: "₦15,000",
    image: "/images/content-pixie.jpg",
    popular: true,
  },
  {
    title: "Brightening Treatment",
    description:
      "An advanced treatment targeting dark spots, hyperpigmentation and uneven skin tone using Vitamin C and natural brightening agents.",
    duration: "75 min",
    price: "₦20,000",
    image: "/images/concern-glow.jpg",
    popular: false,
  },
  {
    title: "Hydration Therapy",
    description:
      "Intense moisture restoration for dry, dehydrated skin. Uses hyaluronic acid and natural oils to lock in lasting hydration and comfort.",
    duration: "60 min",
    price: "₦18,000",
    image: "/images/concern-dry.jpg",
    popular: false,
  },
  {
    title: "Acne Control Facial",
    description:
      "A targeted treatment for acne-prone skin. Deep cleans, calms inflammation and controls sebum using tea tree, salicylic acid and clay.",
    duration: "60 min",
    price: "₦17,000",
    image: "/images/concern-acne.jpg",
    popular: false,
  },
  {
    title: "Skin Consultation",
    description:
      "A one-on-one session with our aesthetician to analyse your skin, identify concerns and recommend a personalised skincare routine.",
    duration: "30 min",
    price: "₦5,000",
    image: "/images/pexels-gustavo-fring-7446658.jpg",
    popular: true,
  },
  {
    title: "Bridal Glow Package",
    description:
      "A premium multi-step treatment designed for brides-to-be. Includes deep cleanse, exfoliation, mask, massage and glow-boosting finish.",
    duration: "120 min",
    price: "₦35,000",
    image: "/images/rosa-rafael.jpg",
    popular: false,
  },
];

/* ─── What to expect steps ─── */
const steps = [
  {
    number: "01",
    title: "Book Your Appointment",
    description:
      "Contact us via WhatsApp or our booking form to schedule a time that works for you.",
  },
  {
    number: "02",
    title: "Skin Analysis",
    description:
      "Your aesthetician will assess your skin type, concerns and goals before starting any treatment.",
  },
  {
    number: "03",
    title: "Personalised Treatment",
    description:
      "Receive a customised treatment using premium products selected specifically for your skin.",
  },
  {
    number: "04",
    title: "Aftercare Routine",
    description:
      "Leave with a tailored skincare routine and product recommendations to maintain your results at home.",
  },
];

const Spa = () => {
  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* ═══════ Hero ═══════ */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src="/images/pexels-ron-lach-9253766.jpg"
          alt="GNADE Spa experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block text-[10px] tracking-[2.5px] uppercase text-white/60 mb-4 animate-fade-up">
            Spa & Wellness
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] animate-fade-up stagger-2">
            The GNADE <em className="italic text-gnade-pink">Spa</em>{" "}
            Experience
          </h1>
          <p className="text-[14px] text-white/65 mt-4 max-w-lg leading-relaxed font-light animate-fade-up stagger-3">
            Professional skincare treatments and expert consultations. Your skin
            deserves specialist care.
          </p>
          <div className="flex gap-3 mt-8 animate-fade-up stagger-4">
            <a
              href="https://wa.me/2348123456789?text=Hi%2C%20I'd%20like%20to%20book%20a%20spa%20appointment"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-gnade-dark px-7 py-3 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-white/90 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <MessageCircle size={13} strokeWidth={1.5} />
              Book Now
            </a>
            <a
              href="#services"
              className="border border-white/40 text-white px-7 py-3 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-white/10 transition-colors duration-200"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ Intro Strip ═══════ */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {[
              { icon: Sparkles, label: "Expert Aestheticians" },
              { icon: Leaf, label: "Natural Products Only" },
              { icon: Heart, label: "Personalised Care" },
              { icon: Star, label: "5-Star Rated" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5">
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="text-gnade-dark"
                  />
                  <span className="text-[12px] tracking-[0.5px] text-gnade-black/60 font-light">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ Services Grid ═══════ */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-4">
              Our Treatments
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gnade-black">
              Spa <em className="italic text-gnade-light">Services</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`group bg-white rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up stagger-${i + 1}`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {s.popular && (
                    <span className="absolute top-3 left-3 bg-gnade-dark text-white text-[8px] tracking-[1.5px] uppercase font-semibold px-2.5 py-1 rounded-sm">
                      Popular
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-lg font-semibold text-gnade-black group-hover:text-gnade-dark transition-colors duration-200">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-[13px] text-gnade-black/50 leading-relaxed font-light mb-4">
                    {s.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[11px] text-gnade-black/40">
                        <Clock size={11} strokeWidth={1.5} />
                        {s.duration}
                      </span>
                    </div>
                    <span className="text-[15px] font-medium text-gnade-dark">
                      {s.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ What to Expect ═══════ */}
      <section className="bg-gnade-black py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(76,175,80,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="md:sticky md:top-24">
              <span className="inline-block text-[10px] tracking-[2px] uppercase text-white/30 mb-6">
                What to Expect
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white leading-[1.15] mb-6">
                Your Journey to{" "}
                <em className="italic text-gnade-light">Glowing Skin</em>
              </h2>
              <p className="text-[14px] text-white/40 leading-relaxed font-light max-w-sm mb-8">
                From the moment you walk in, every step is designed to give your
                skin the expert attention it deserves.
              </p>
              <a
                href="https://wa.me/2348123456789?text=Hi%2C%20I'd%20like%20to%20book%20a%20spa%20appointment"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase text-white/50 border-b border-white/20 pb-0.5 hover:text-white/80 hover:border-white/40 transition-all duration-200"
              >
                Book Your Appointment
                <ArrowRight size={11} strokeWidth={1.5} />
              </a>
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
                  <span className="font-serif text-[13px] text-white/15 group-hover:text-gnade-light/60 mt-1 w-6 flex-shrink-0 transition-colors duration-300">
                    {step.number}
                  </span>
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

      {/* ═══════ Gallery ═══════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-4">
              Our Space
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gnade-black">
              The GNADE <em className="italic text-gnade-light">Studio</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/images/spa.jpg", span: "col-span-2 row-span-2" },
              { src: "/images/content-pixie.jpg", span: "" },
              { src: "/images/pexels-shotpot-6338383.jpg", span: "" },
              { src: "/images/pexels-shotpot-6338374.jpg", span: "" },
              { src: "/images/ekaterina-bolovtsova.jpg", span: "" },
            ].map((img, i) => (
              <div
                key={i}
                className={`${img.span} overflow-hidden rounded-sm group`}
              >
                <img
                  src={img.src}
                  alt="GNADE spa environment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[160px]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Booking CTA ═══════ */}
      <section className="bg-gnade-dark py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(76,175,80,0.12),transparent_60%)]" />

        <div className="relative max-w-2xl mx-auto text-center">
          <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-light/70 mb-6">
            Ready to Glow?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white leading-[1.15] mb-6">
            Book Your{" "}
            <em className="italic text-gnade-pink">Spa Session</em>
          </h2>
          <p className="text-[14px] text-white/55 leading-relaxed font-light mb-10 max-w-md mx-auto">
            Transform your skin with a professional treatment tailored to your
            specific needs. Walk in tired, leave glowing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/2348123456789?text=Hi%2C%20I'd%20like%20to%20book%20a%20spa%20appointment"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-gnade-dark px-8 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-white/90 transition-colors duration-200 inline-flex items-center gap-2 hover:shadow-md"
            >
              <MessageCircle size={13} strokeWidth={1.5} />
              Book via WhatsApp
            </a>
            <Link
              to="/contact"
              className="border border-white/30 text-white px-8 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-white/10 transition-colors duration-200 inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              "Certified Aestheticians",
              "Premium Products",
              "By Appointment Only",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-[10px] tracking-[1px] uppercase text-white/35"
              >
                <CheckCircle size={10} strokeWidth={1.5} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Spa;
