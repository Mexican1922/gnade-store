import { useState } from "react";
import { ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-gnade-cream py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block text-[10px] tracking-[2px] uppercase text-gnade-dark/50 mb-5">
          Stay Connected
        </span>

        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-gnade-black leading-[1.15] mb-4">
          Stay in Touch with <em className="italic text-gnade-light">Gnade</em>
        </h2>

        <p className="text-[14px] text-gnade-black/50 leading-relaxed font-light mb-10 max-w-md mx-auto">
          Subscribe for exclusive offers, new arrivals and skincare tips
          delivered straight to your inbox.
        </p>

        {submitted ? (
          <div className="border border-gnade-dark/20 rounded-sm px-8 py-5 inline-block">
            <p className="text-[13px] text-gnade-dark tracking-[0.3px]">
              Thank you for subscribing. We will be in touch soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-gnade-dark rounded-sm overflow-hidden"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 text-[13px] font-light text-gnade-black placeholder:text-gnade-black/30 bg-white outline-none"
            />
            <button
              type="submit"
              className="bg-gnade-dark text-white px-6 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium flex items-center justify-center gap-2 hover:bg-gnade-mid transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe
              <ArrowRight size={12} strokeWidth={1.5} />
            </button>
          </form>
        )}

        <p className="text-[10px] text-gnade-black/30 tracking-[0.5px] mt-5">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
