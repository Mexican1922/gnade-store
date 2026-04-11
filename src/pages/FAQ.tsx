import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, MessageCircle, Search } from "lucide-react";

/* ─── FAQ Data ─── */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Orders & Shipping",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery within Lagos takes 24-48 hours. Other states within Nigeria take 3-5 working days. Delivery to the North may take 4-7 working days. All orders placed before 2pm on weekdays are dispatched the same day.",
      },
      {
        question: "How much does delivery cost?",
        answer:
          "Delivery fees range from ₦1,500 to ₦3,500 depending on your location. Orders above ₦20,000 qualify for free delivery within Lagos. See our Delivery Information page for a full breakdown of zones and fees.",
      },
      {
        question: "How do I track my order?",
        answer:
          "Once your order is dispatched, you will receive a tracking update via WhatsApp or SMS. You can also contact us with your order reference number for a status update.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "You can request changes or cancellation within 1 hour of placing your order by contacting us via WhatsApp. Once an order has been dispatched, it cannot be cancelled — but you can return it under our return policy.",
      },
      {
        question: "Do you deliver outside Nigeria?",
        answer:
          "We currently deliver only within Nigeria. International shipping is coming soon. Please subscribe to our newsletter to be notified when we launch international delivery.",
      },
    ],
  },
  {
    title: "Products & Skincare",
    items: [
      {
        question: "Are your products suitable for all skin types?",
        answer:
          "Yes, our products are formulated to work with a range of skin types. Each product page includes detailed information about which skin types it is best suited for. For personalised recommendations, we offer professional skin consultations.",
      },
      {
        question: "Are your products natural?",
        answer:
          "Absolutely. GNADE products are made with 100% natural ingredients. We never use harsh chemicals, parabens, sulphates, or artificial fragrances. Every ingredient is sourced responsibly and tested for safety.",
      },
      {
        question: "How do I know which products are right for me?",
        answer:
          "You can browse our 'Shop by Skin Concern' section to find products targeted at your specific needs. For a more personalised approach, book a skin consultation with one of our expert aestheticians.",
      },
      {
        question: "Are your products tested on animals?",
        answer:
          "No. GNADE is a cruelty-free brand. We do not test any of our products on animals.",
      },
      {
        question: "How should I store my products?",
        answer:
          "Store products in a cool, dry place away from direct sunlight. Natural products are best used within 12 months of opening. Check individual product labels for specific storage instructions.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major debit/credit cards, bank transfers, and USSD payments through Paystack. Paystack is Nigeria's leading payment processor and ensures your transactions are completely secure.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. We do not store any payment card details. All payment processing is handled by Paystack, which is PCI-DSS Level 1 certified — the highest level of security in the payments industry.",
      },
      {
        question: "What currency do you charge in?",
        answer:
          "All prices on our website are in Nigerian Naira (₦). If you are paying with a card from another country, your bank will handle the currency conversion.",
      },
      {
        question: "Will I receive a receipt?",
        answer:
          "Yes. You will receive an order confirmation email immediately after payment, and Paystack will also send you a payment receipt.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 7-day return window from the date of delivery. Unopened products in their original packaging are eligible for a full refund. Opened products cannot be returned for hygiene reasons unless they are damaged or defective.",
      },
      {
        question: "How do I request a return?",
        answer:
          "Contact us via WhatsApp, email, or our contact form within 7 days of delivery. Include your order reference and reason for return. Our team will respond within 24 hours with return instructions.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Once we receive and inspect the returned item, your refund will be processed within 3-5 working days to your original payment method.",
      },
      {
        question: "What if I receive a damaged product?",
        answer:
          "If your product arrives damaged, contact us within 48 hours with photos of the damage. We will arrange a free replacement or full refund at no extra cost to you.",
      },
    ],
  },
  {
    title: "Spa & Consultations",
    items: [
      {
        question: "Where is your spa located?",
        answer:
          "Our spa studio is located in Lagos, Nigeria. For the exact address and directions, please contact us via WhatsApp or visit our Contact page.",
      },
      {
        question: "How do I book a spa appointment?",
        answer:
          "You can book a spa appointment by contacting us via WhatsApp or filling out the booking form on our Spa page. We recommend booking at least 48 hours in advance.",
      },
      {
        question: "Can I cancel a spa appointment?",
        answer:
          "Yes, you can cancel or reschedule a spa appointment up to 24 hours before your scheduled time. Cancellations made less than 24 hours in advance may not be refunded.",
      },
      {
        question: "What should I expect during a skin consultation?",
        answer:
          "A 30-minute one-on-one session with our aesthetician where we analyse your skin type, discuss your concerns and goals, and recommend a personalised skincare routine with specific products.",
      },
    ],
  },
];

/* ─── Accordion Item ─── */
const AccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border-b border-black/5 last:border-none">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span
          className={`text-[14px] pr-4 transition-colors duration-200 ${
            isOpen
              ? "text-gnade-dark font-medium"
              : "text-gnade-black/80 group-hover:text-gnade-dark"
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`flex-shrink-0 transition-transform duration-300 text-gnade-dark/40 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] pb-5" : "max-h-0"
        }`}
      >
        <p className="text-[13px] text-gnade-black/55 leading-relaxed font-light pr-8">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

/* ─── Main FAQ Component ─── */
const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(
    faqData[0]?.title || "",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* ── Filter by search ── */
  const getFilteredItems = (category: FAQCategory) => {
    if (!searchQuery.trim()) return category.items;
    const q = searchQuery.toLowerCase();
    return category.items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  };

  const activeData = faqData.find((c) => c.title === activeCategory);
  const filteredItems = activeData ? getFilteredItems(activeData) : [];

  /* Total results across all categories for search */
  const totalSearchResults = searchQuery.trim()
    ? faqData.reduce((sum, cat) => sum + getFilteredItems(cat).length, 0)
    : 0;

  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* ═══════ Header ═══════ */}
      <div className="bg-white border-b border-black/5 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] tracking-[2px] uppercase text-gnade-dark/50">
            Help Centre
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gnade-black mt-1">
            Frequently Asked{" "}
            <em className="italic text-gnade-light">Questions</em>
          </h1>
        </div>
      </div>

      {/* ═══════ Search ═══════ */}
      <section className="bg-gnade-pale py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search
              size={16}
              strokeWidth={1.5}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gnade-dark/30"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a question..."
              className="w-full bg-white border border-gnade-pale text-[13px] text-gnade-black pl-11 pr-4 py-3.5 outline-none focus:border-gnade-dark transition-colors rounded-sm placeholder:text-gnade-dark/25"
            />
          </div>
          {searchQuery.trim() && (
            <p className="text-[11px] text-gnade-dark/40 mt-2">
              {totalSearchResults} result{totalSearchResults !== 1 ? "s" : ""}{" "}
              found
            </p>
          )}
        </div>
      </section>

      {/* ═══════ FAQ Content ═══════ */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* ── Category sidebar ── */}
          <nav className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <p className="text-[10px] tracking-[2px] uppercase text-gnade-dark/40 mb-4 hidden lg:block">
                Categories
              </p>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {faqData.map((cat) => {
                  const count = getFilteredItems(cat).length;
                  return (
                    <button
                      key={cat.title}
                      onClick={() => setActiveCategory(cat.title)}
                      className={`text-left whitespace-nowrap lg:whitespace-normal px-4 py-2.5 rounded-sm text-[12px] tracking-[0.3px] transition-all duration-200 flex items-center justify-between gap-3 ${
                        activeCategory === cat.title
                          ? "bg-gnade-dark text-white"
                          : "bg-white text-gnade-black/60 hover:text-gnade-dark hover:bg-gnade-pale"
                      }`}
                    >
                      <span>{cat.title}</span>
                      {searchQuery.trim() && (
                        <span
                          className={`text-[10px] ${
                            activeCategory === cat.title
                              ? "text-white/60"
                              : "text-gnade-dark/30"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* ── Questions list ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-sm px-6 md:px-8">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, i) => {
                  const key = `${activeCategory}-${i}`;
                  return (
                    <AccordionItem
                      key={key}
                      item={item}
                      isOpen={!!openItems[key]}
                      onToggle={() => toggleItem(key)}
                    />
                  );
                })
              ) : (
                <div className="py-12 text-center">
                  <p className="font-serif text-xl text-gnade-black/30 mb-2">
                    No matching questions
                  </p>
                  <p className="text-[12px] text-gnade-black/30 font-light">
                    Try a different search term or browse another category
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Still need help CTA ═══════ */}
      <section className="bg-gnade-dark py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(76,175,80,0.08),transparent_60%)]" />

        <div className="relative max-w-2xl mx-auto text-center">
          <MessageCircle
            size={32}
            strokeWidth={1}
            className="text-white/40 mx-auto mb-5"
          />
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-3">
            Still Have Questions?
          </h2>
          <p className="text-[14px] text-white/50 leading-relaxed font-light mb-8 max-w-md mx-auto">
            Can't find the answer you're looking for? Our team is ready to help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-gnade-dark px-8 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-white/90 transition-colors duration-200 inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
            <a
              href="https://wa.me/2348123456789"
              target="_blank"
              rel="noreferrer"
              className="border border-white/30 text-white px-8 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-white/10 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <MessageCircle size={13} strokeWidth={1.5} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
