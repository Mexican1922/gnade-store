import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { newsletterAPI } from "../../services/api";
import { useToast } from "../../context/ToastContext";

const NewsletterSection = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email address is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");

    setLoading(true);
    try {
      await newsletterAPI.subscribe(email);
      setSubmitted(true);
      setEmail("");
      showToast("You're subscribed!", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to subscribe";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
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
          <div className="flex flex-col max-w-md mx-auto items-start">
            <form
              onSubmit={handleSubmit}
              className={`flex flex-col sm:flex-row gap-0 w-full border rounded-sm overflow-hidden ${error ? "border-red-400" : "border-gnade-dark"}`}
            >
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email address"
                disabled={loading}
                className="flex-1 px-5 py-3.5 text-[13px] font-light text-gnade-black placeholder:text-gnade-black/30 bg-white outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gnade-dark text-white px-6 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium flex items-center justify-center gap-2 hover:bg-gnade-mid transition-colors duration-200 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Subscribing..." : "Subscribe"}
                {!loading && <ArrowRight size={12} strokeWidth={1.5} />}
              </button>
            </form>
            {error && <p className="text-[10px] text-red-400 mt-2 ml-1 tracking-[0.5px]">{error}</p>}
          </div>
        )}

        <p className="text-[10px] text-gnade-black/30 tracking-[0.5px] mt-5">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;

