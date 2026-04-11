import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Package,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

/* ─── Eligible items ─── */
const eligible = [
  "Unopened products in original packaging",
  "Products received damaged or defective",
  "Wrong product delivered",
  "Products within the 7-day return window",
];

/* ─── Non-eligible items ─── */
const nonEligible = [
  "Opened or used products (for hygiene reasons)",
  "Products without original packaging",
  "Items returned after the 7-day window",
  "Spa service bookings (non-refundable once completed)",
  "Sale items marked as final sale",
];

/* ─── Return steps ─── */
const returnSteps = [
  {
    number: "01",
    title: "Contact Us",
    description:
      "Reach out via WhatsApp, email or our contact form within 7 days of receiving your order. Include your order reference and reason for return.",
  },
  {
    number: "02",
    title: "Get Approval",
    description:
      "Our team will review your request and send you return instructions within 24 hours. We may ask for photos of the product.",
  },
  {
    number: "03",
    title: "Ship It Back",
    description:
      "Package the product securely and ship it back using our preferred logistics partner. Return shipping costs are covered for damaged/wrong items.",
  },
  {
    number: "04",
    title: "Refund Processed",
    description:
      "Once we receive and inspect the returned item, your refund will be processed within 3-5 working days to your original payment method.",
  },
];

const Returns = () => {
  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* ═══════ Header ═══════ */}
      <div className="bg-white border-b border-black/5 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] tracking-[2px] uppercase text-gnade-dark/50">
            Policies
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gnade-black mt-1">
            Return <em className="italic text-gnade-light">Policy</em>
          </h1>
        </div>
      </div>

      {/* ═══════ Overview ═══════ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gnade-dark rounded-sm p-8 md:p-10 text-center mb-12">
            <RotateCcw
              size={32}
              strokeWidth={1}
              className="text-white/50 mx-auto mb-4"
            />
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-3">
              7-Day Return Window
            </h2>
            <p className="text-[14px] text-white/60 leading-relaxed font-light max-w-lg mx-auto">
              We want you to love your GNADE products. If you are not satisfied,
              you can return eligible items within 7 days of delivery for a full
              refund.
            </p>
          </div>

          {/* ── Eligible / Non-eligible ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Eligible */}
            <div className="bg-white rounded-sm p-7">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle
                  size={18}
                  strokeWidth={1.5}
                  className="text-gnade-dark"
                />
                <h3 className="font-serif text-lg font-semibold text-gnade-black">
                  Eligible for Return
                </h3>
              </div>
              <div className="space-y-3">
                {eligible.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={13}
                      strokeWidth={1.5}
                      className="text-gnade-light mt-0.5 flex-shrink-0"
                    />
                    <p className="text-[13px] text-gnade-black/60 leading-relaxed font-light">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-eligible */}
            <div className="bg-white rounded-sm p-7">
              <div className="flex items-center gap-2 mb-5">
                <XCircle
                  size={18}
                  strokeWidth={1.5}
                  className="text-red-400"
                />
                <h3 className="font-serif text-lg font-semibold text-gnade-black">
                  Not Eligible
                </h3>
              </div>
              <div className="space-y-3">
                {nonEligible.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <XCircle
                      size={13}
                      strokeWidth={1.5}
                      className="text-red-300 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-[13px] text-gnade-black/60 leading-relaxed font-light">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Return Process ── */}
          <div className="mb-16">
            <div className="mb-10">
              <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-3">
                Step by Step
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gnade-black">
                How to Return an{" "}
                <em className="italic text-gnade-light">Item</em>
              </h2>
            </div>

            <div className="flex flex-col gap-0 bg-white rounded-sm overflow-hidden">
              {returnSteps.map((step, i) => (
                <div
                  key={step.number}
                  className={`flex gap-6 p-6 md:p-7 ${
                    i !== returnSteps.length - 1 ? "border-b border-black/5" : ""
                  }`}
                >
                  <span className="font-serif text-2xl font-semibold text-gnade-pale flex-shrink-0 w-8">
                    {step.number}
                  </span>
                  <div>
                    <h4 className="font-serif text-[16px] font-semibold text-gnade-black mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-[13px] text-gnade-black/50 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Additional Info ── */}
          <div className="bg-white rounded-sm p-7 mb-12">
            <h3 className="font-serif text-lg font-semibold text-gnade-black mb-5">
              Additional <em className="italic text-gnade-light">Details</em>
            </h3>
            <div className="space-y-4 text-[13px] text-gnade-black/60 leading-relaxed font-light">
              <div className="flex items-start gap-3">
                <Package size={14} strokeWidth={1.5} className="text-gnade-dark/40 mt-0.5 flex-shrink-0" />
                <p>
                  <strong className="text-gnade-black font-medium">Damaged Items:</strong>{" "}
                  If you receive a damaged product, please contact us within 48
                  hours with photos. We will arrange a replacement or full refund
                  at no extra cost.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={14} strokeWidth={1.5} className="text-gnade-dark/40 mt-0.5 flex-shrink-0" />
                <p>
                  <strong className="text-gnade-black font-medium">Refund Method:</strong>{" "}
                  Refunds are processed to the original payment method (card or
                  bank transfer via Paystack). Please allow 3-5 working days for
                  the refund to reflect.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle size={14} strokeWidth={1.5} className="text-gnade-dark/40 mt-0.5 flex-shrink-0" />
                <p>
                  <strong className="text-gnade-black font-medium">Need Help?</strong>{" "}
                  Our customer support team is available Monday to Saturday.
                  Contact us via WhatsApp for the fastest response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-gnade-pale py-14 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-xl font-semibold text-gnade-black mb-3">
            Need to make a return?
          </h3>
          <p className="text-[13px] text-gnade-black/50 font-light mb-6">
            Get in touch with us and we will guide you through the process.
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

export default Returns;
