import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { contactAPI } from "../services/api";

/* ─── Contact channels ─── */
const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+234 812 345 6789",
    description: "Mon – Sat, 9am – 6pm",
    href: "https://wa.me/2348123456789",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@gnade.ng",
    description: "We reply within 24hrs",
    href: "mailto:hello@gnade.ng",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 812 345 6789",
    description: "Mon – Fri, 10am – 5pm",
    href: "tel:+2348123456789",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Lagos, Nigeria",
    description: "By appointment only",
    href: "#",
    color: "bg-orange-50 text-orange-600",
  },
];

/* ─── Subject options ─── */
const subjects = [
  "General Enquiry",
  "Product Question",
  "Order Issue",
  "Spa Booking",
  "Wholesale / Partnership",
  "Feedback",
];

/* ─── Component ─── */
const Contact = () => {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address";
    if (form.phone.trim() && !/^[0-9]{10,11}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid Nigerian number";
    if (!form.subject) errs.subject = "Please select a subject";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 10)
      errs.message = "Message is too short";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);

    try {
      await contactAPI.send(form);
      setSubmitted(true);
      showToast("Message sent successfully!", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gnade-cream min-h-screen">
      {/* ═══════ Page Header ═══════ */}
      <div className="bg-white border-b border-black/5 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] tracking-[2px] uppercase text-gnade-dark/50">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gnade-black mt-1">
            Contact <em className="italic text-gnade-light">Us</em>
          </h1>
        </div>
      </div>

      {/* ═══════ Contact Channels ═══════ */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    ch.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className={`group bg-white rounded-sm p-6 hover:shadow-md transition-all duration-300 animate-fade-up stagger-${i + 1}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${ch.color} flex items-center justify-center mb-4`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/40 mb-1">
                    {ch.label}
                  </p>
                  <p className="text-[14px] font-medium text-gnade-black group-hover:text-gnade-dark transition-colors duration-200">
                    {ch.value}
                  </p>
                  <p className="text-[11px] text-gnade-black/40 mt-1 font-light flex items-center gap-1.5">
                    <Clock size={10} strokeWidth={1.5} />
                    {ch.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ Form + Info ═══════ */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-sm p-8 md:p-10">
              <h2 className="font-serif text-2xl font-semibold text-gnade-black mb-2">
                Send Us a <em className="italic text-gnade-light">Message</em>
              </h2>
              <p className="text-[13px] text-gnade-black/40 font-light mb-8">
                Fill in the form below and we will get back to you as soon as
                possible.
              </p>

              {submitted ? (
                /* ── Success State ── */
                <div className="text-center py-12">
                  <CheckCircle
                    size={48}
                    strokeWidth={1}
                    className="text-gnade-dark mx-auto mb-5"
                  />
                  <h3 className="font-serif text-2xl font-semibold text-gnade-black mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[13px] text-gnade-black/50 font-light mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. We will respond within 24 hours.
                    You can also reach us directly on WhatsApp for faster
                    replies.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="text-[11px] tracking-[1.5px] uppercase text-gnade-dark border-b border-gnade-dark pb-0.5 hover:opacity-70 transition-opacity duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* ── Form Fields ── */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      name="name"
                      value={form.name}
                      error={errors.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      error={errors.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Phone (optional)"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="08012345678"
                    />

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`bg-gnade-cream border text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors cursor-pointer appearance-none rounded-sm ${
                          errors.subject
                            ? "border-red-400"
                            : "border-gnade-pale"
                        }`}
                      >
                        <option value="">Select subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="text-[10px] text-red-400">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className={`bg-gnade-cream border text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors resize-none rounded-sm ${
                        errors.message
                          ? "border-red-400"
                          : "border-gnade-pale"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[10px] text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-gnade-dark text-white px-10 py-3.5 text-[11px] tracking-[1.5px] uppercase font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-gnade-mid transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={12} strokeWidth={1.5} />
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Business hours */}
            <div className="bg-white rounded-sm p-7">
              <h3 className="font-serif text-lg font-semibold text-gnade-black mb-4">
                Business Hours
              </h3>
              <div className="space-y-3 text-[13px] font-light">
                <div className="flex justify-between text-gnade-black/60">
                  <span>Monday – Friday</span>
                  <span className="text-gnade-black font-medium">
                    9am – 6pm
                  </span>
                </div>
                <div className="flex justify-between text-gnade-black/60">
                  <span>Saturday</span>
                  <span className="text-gnade-black font-medium">
                    10am – 4pm
                  </span>
                </div>
                <div className="flex justify-between text-gnade-black/60">
                  <span>Sunday</span>
                  <span className="text-gnade-black/40 italic">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-sm p-7">
              <h3 className="font-serif text-lg font-semibold text-gnade-black mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Frequently Asked Questions", path: "/faq" },
                  { label: "Delivery Information", path: "/delivery" },
                  { label: "Return Policy", path: "/returns" },
                  { label: "Track Your Order", path: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="flex items-center justify-between text-[13px] text-gnade-black/60 hover:text-gnade-dark transition-colors duration-200 group"
                  >
                    <span className="font-light">{link.label}</span>
                    <ArrowRight
                      size={11}
                      strokeWidth={1.5}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gnade-dark rounded-sm p-7 text-center">
              <MessageCircle
                size={28}
                strokeWidth={1}
                className="text-white/50 mx-auto mb-4"
              />
              <h3 className="font-serif text-lg font-semibold text-white mb-2">
                Need Faster Help?
              </h3>
              <p className="text-[12px] text-white/50 font-light mb-5">
                Chat with us directly on WhatsApp for instant support.
              </p>
              <a
                href="https://wa.me/2348123456789"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-gnade-dark px-6 py-2.5 text-[10px] tracking-[1.5px] uppercase font-medium rounded-sm hover:bg-white/90 transition-colors duration-200"
              >
                <MessageCircle size={12} strokeWidth={1.5} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Reusable Input Field ─── */
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

function InputField({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-gnade-cream border text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors placeholder:text-gnade-dark/20 rounded-sm ${
          error ? "border-red-400" : "border-gnade-pale"
        }`}
      />
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

export default Contact;
