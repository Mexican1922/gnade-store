import { Link } from "react-router-dom";
import {
  Truck,
  Clock,
  MapPin,
  Package,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

/* ─── Delivery zones ─── */
const zones = [
  {
    zone: "Lagos Mainland & Island",
    time: "24 – 48 hours",
    fee: "₦1,500",
    freeAbove: "₦20,000",
  },
  {
    zone: "Lagos outskirts (Ikorodu, Epe, etc.)",
    time: "2 – 3 working days",
    fee: "₦2,000",
    freeAbove: "₦20,000",
  },
  {
    zone: "South-West (Ogun, Oyo, Osun, etc.)",
    time: "3 – 5 working days",
    fee: "₦2,500",
    freeAbove: "₦25,000",
  },
  {
    zone: "South-East & South-South",
    time: "3 – 5 working days",
    fee: "₦3,000",
    freeAbove: "₦25,000",
  },
  {
    zone: "North (all states)",
    time: "4 – 7 working days",
    fee: "₦3,500",
    freeAbove: "₦30,000",
  },
];

/* ─── Process steps ─── */
const processSteps = [
  {
    icon: CheckCircle,
    title: "Order Confirmed",
    description:
      "You will receive an order confirmation email with your reference number immediately after payment.",
  },
  {
    icon: Package,
    title: "Packed & Dispatched",
    description:
      "Your order is carefully packaged within 24 hours and handed to our trusted logistics partner.",
  },
  {
    icon: Truck,
    title: "On Its Way",
    description:
      "Track your order with the reference number. We will send you updates via WhatsApp or SMS.",
  },
  {
    icon: MapPin,
    title: "Delivered",
    description:
      "Your skincare arrives at your doorstep. Inspect the package and enjoy your new products!",
  },
];

const Delivery = () => {
  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* ═══════ Header ═══════ */}
      <div className="bg-white border-b border-black/5 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] tracking-[2px] uppercase text-gnade-dark/50">
            Shipping
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gnade-black mt-1">
            Delivery <em className="italic text-gnade-light">Information</em>
          </h1>
        </div>
      </div>

      {/* ═══════ Free delivery banner ═══════ */}
      <section className="bg-gnade-dark py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <Truck size={18} strokeWidth={1.5} className="text-white/60" />
          <p className="text-[12px] tracking-[1px] uppercase text-white/80">
            Free delivery on orders above ₦20,000 within Lagos
          </p>
        </div>
      </section>

      {/* ═══════ Delivery Zones Table ═══════ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-3">
              Shipping Rates
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gnade-black">
              Delivery Zones & <em className="italic text-gnade-light">Fees</em>
            </h2>
          </div>

          <div className="bg-white rounded-sm overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 bg-gnade-pale text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
              <span>Zone</span>
              <span>Delivery Time</span>
              <span>Fee</span>
              <span>Free Delivery Above</span>
            </div>

            {/* Table rows */}
            {zones.map((z, i) => (
              <div
                key={z.zone}
                className={`grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 px-6 py-5 ${
                  i !== zones.length - 1 ? "border-b border-black/5" : ""
                }`}
              >
                <div>
                  <span className="md:hidden text-[9px] tracking-[1px] uppercase text-gnade-dark/40 block mb-0.5">
                    Zone
                  </span>
                  <p className="text-[13px] font-medium text-gnade-black">
                    {z.zone}
                  </p>
                </div>
                <div>
                  <span className="md:hidden text-[9px] tracking-[1px] uppercase text-gnade-dark/40 block mb-0.5">
                    Delivery Time
                  </span>
                  <p className="text-[13px] text-gnade-black/60 flex items-center gap-1.5">
                    <Clock size={11} strokeWidth={1.5} className="text-gnade-dark/30" />
                    {z.time}
                  </p>
                </div>
                <div>
                  <span className="md:hidden text-[9px] tracking-[1px] uppercase text-gnade-dark/40 block mb-0.5">
                    Fee
                  </span>
                  <p className="text-[13px] font-medium text-gnade-dark">
                    {z.fee}
                  </p>
                </div>
                <div>
                  <span className="md:hidden text-[9px] tracking-[1px] uppercase text-gnade-dark/40 block mb-0.5">
                    Free Above
                  </span>
                  <p className="text-[13px] text-gnade-light font-medium">
                    {z.freeAbove}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gnade-black/40 mt-4 font-light">
            * Delivery times are estimates and may vary during peak periods or
            holidays. All deliveries are handled by our trusted logistics
            partners.
          </p>
        </div>
      </section>

      {/* ═══════ Process ═══════ */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-4">
              Order Journey
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gnade-black">
              From Us to <em className="italic text-gnade-light">Your Door</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`text-center animate-fade-up stagger-${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-full bg-gnade-pale flex items-center justify-center mx-auto mb-4">
                    <Icon size={20} strokeWidth={1.5} className="text-gnade-dark" />
                  </div>
                  <h3 className="font-serif text-[15px] font-semibold text-gnade-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[12px] text-gnade-black/50 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ Important Notes ═══════ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-gnade-black mb-8">
            Important <em className="italic text-gnade-light">Notes</em>
          </h2>

          <div className="space-y-4">
            {[
              "All orders placed before 2pm (WAT) on weekdays are dispatched same day.",
              "Weekend orders are processed on the next working day (Monday).",
              "We currently deliver only within Nigeria. International shipping is coming soon.",
              "Orders are carefully packaged to prevent damage during transit.",
              "You will receive a tracking update via WhatsApp or SMS once your order is dispatched.",
              "If no one is available to receive your order, the rider will contact you to reschedule.",
            ].map((note, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle
                  size={14}
                  strokeWidth={1.5}
                  className="text-gnade-dark mt-0.5 flex-shrink-0"
                />
                <p className="text-[13px] text-gnade-black/60 leading-relaxed font-light">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-gnade-pale py-14 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <ShieldCheck
            size={28}
            strokeWidth={1}
            className="text-gnade-dark mx-auto mb-4"
          />
          <h3 className="font-serif text-xl font-semibold text-gnade-black mb-3">
            Have a delivery question?
          </h3>
          <p className="text-[13px] text-gnade-black/50 font-light mb-6">
            Our support team is happy to help with any shipping enquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-gnade-dark text-white px-7 py-3 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-gnade-mid transition-colors duration-200 inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
            <Link
              to="/faq"
              className="border border-gnade-dark text-gnade-dark px-7 py-3 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-gnade-dark hover:text-white transition-all duration-200"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Delivery;
