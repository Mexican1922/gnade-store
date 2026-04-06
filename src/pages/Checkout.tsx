import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ordersAPI } from "../services/api";

// --- Types ---
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// --- Paystack loader ---

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => { openIframe: () => void };
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number; // in kobo
  currency: string;
  ref: string;
  metadata?: Record<string, unknown>;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

// --- Helpers ---
const DELIVERY_FEE = 2500;
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

function generateRef(): string {
  return `GNADE-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.firstName.trim()) errors.firstName = "Required";
  if (!form.lastName.trim()) errors.lastName = "Required";
  if (!form.email.trim()) errors.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Invalid email";
  if (!form.phone.trim()) errors.phone = "Required";
  else if (!/^[0-9]{10,11}$/.test(form.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid Nigerian number";
  if (!form.address.trim()) errors.address = "Required";
  if (!form.city.trim()) errors.city = "Required";
  if (!form.state.trim()) errors.state = "Required";
  return errors;
}

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

// --- Component ---
export default function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const grandTotal = totalPrice + DELIVERY_FEE;

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gnade-cream flex flex-col items-center justify-center gap-5 text-center px-6">
        <p
          className="text-3xl text-gnade-black"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Nothing to checkout
        </p>
        <Link
          to="/shop"
          className="bg-gnade-dark text-white text-[10px] tracking-[2px] uppercase px-10 py-3.5 hover:bg-gnade-mid transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePayment = () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!window.PaystackPop) {
      alert("Payment gateway not loaded. Please refresh and try again.");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: grandTotal * 100, // convert to kobo
      currency: "NGN",
      ref: generateRef(),
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            value: `${form.firstName} ${form.lastName}`,
          },
          { display_name: "Phone", value: form.phone },
          {
            display_name: "Delivery Address",
            value: `${form.address}, ${form.city}, ${form.state}`,
          },
          { display_name: "Order Notes", value: form.notes || "None" },
          {
            display_name: "Items",
            value: items.map((i) => `${i.name} x${i.quantity}`).join(", "),
          },
        ],
      },
      callback: (response) => {
        // Don't make this async — Paystack doesn't support it
        // Fire and forget the order save, then navigate
        setLoading(false);
        clearCart();
        navigate(`/order-success?ref=${response.reference}`);

        // Save order in background
        ordersAPI
          .create({
            reference: response.reference,
            email: form.email,
            total_amount: grandTotal,
            shipping_name: `${form.firstName} ${form.lastName}`,
            shipping_address: `${form.address}, ${form.city}, ${form.state}`,
            shipping_phone: form.phone,
            items: items.map((item) => ({
              product_id: item.id,
              product_name: item.name,
              product_price: item.price,
              quantity: item.quantity,
            })),
          })
          .catch((err) => {
            console.error("Order save failed:", err);
          });
      },
      onClose: () => {
        setLoading(false);
      },
    });

    handler.openIframe();
  };

  return (
    <div
      className="min-h-screen bg-gnade-cream"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Header */}
      <div className="border-b border-gnade-pale px-5 md:px-12 lg:px-20 py-8">
        <nav className="flex items-center gap-2 text-[10px] tracking-[1.5px] uppercase text-gnade-dark/40 mb-3">
          <Link to="/cart" className="hover:text-gnade-dark transition-colors">
            Cart
          </Link>
          <ChevronRight size={10} />
          <span className="text-gnade-dark">Checkout</span>
        </nav>
        <h1
          className="text-3xl md:text-4xl text-gnade-black"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Checkout
        </h1>
      </div>

      <div className="px-5 md:px-12 lg:px-20 py-10 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* ── LEFT: Delivery Form ── */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Contact */}
          <section>
            <h2
              className="text-lg text-gnade-black mb-5"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="First Name"
                name="firstName"
                value={form.firstName}
                error={errors.firstName}
                onChange={handleChange}
              />
              <Field
                label="Last Name"
                name="lastName"
                value={form.lastName}
                error={errors.lastName}
                onChange={handleChange}
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                className="sm:col-span-2"
              />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="08012345678"
                value={form.phone}
                error={errors.phone}
                onChange={handleChange}
                className="sm:col-span-2"
              />
            </div>
          </section>

          {/* Delivery */}
          <section>
            <h2
              className="text-lg text-gnade-black mb-5"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Delivery Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Street Address"
                name="address"
                placeholder="House number, street name"
                value={form.address}
                error={errors.address}
                onChange={handleChange}
                className="sm:col-span-2"
              />
              <Field
                label="City"
                name="city"
                value={form.city}
                error={errors.city}
                onChange={handleChange}
              />
              {/* State dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
                  State
                </label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={`bg-white border text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors appearance-none cursor-pointer ${
                    errors.state ? "border-red-400" : "border-gnade-pale"
                  }`}
                >
                  <option value="">Select state</option>
                  {nigerianStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-[10px] text-red-400">{errors.state}</p>
                )}
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
                  Order Notes{" "}
                  <span className="normal-case tracking-normal text-gnade-dark/30">
                    (optional)
                  </span>
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions for your order..."
                  rows={3}
                  className="bg-white border border-gnade-pale text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors resize-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="lg:col-span-2">
          <div className="bg-gnade-pale p-7 sticky top-24">
            <h2
              className="text-xl text-gnade-black mb-6"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Order Summary
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover bg-white"
                    />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gnade-dark text-white text-[8px] font-semibold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-gnade-black font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gnade-dark/40 uppercase tracking-[1px]">
                      {item.category}
                    </p>
                  </div>
                  <p className="text-[13px] text-gnade-dark shrink-0">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gnade-dark/10 pt-4 flex flex-col gap-2.5 text-[13px] text-gnade-dark/70 mb-4">
              <div className="flex justify-between">
                <span>
                  Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""})
                </span>
                <span className="text-gnade-black">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-gnade-black">
                  ₦{DELIVERY_FEE.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-gnade-dark/10 pt-4 flex justify-between text-[15px] font-semibold text-gnade-black mb-7">
              <span>Total</span>
              <span>₦{grandTotal.toLocaleString()}</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-gnade-dark text-white text-[10px] tracking-[2px] uppercase py-4 flex items-center justify-center gap-2 hover:bg-gnade-mid transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Lock size={11} strokeWidth={1.5} />
              {loading
                ? "Processing..."
                : `Pay ₦${grandTotal.toLocaleString()}`}
            </button>

            <p className="text-[10px] text-gnade-dark/35 text-center mt-4 leading-relaxed">
              Secured by Paystack · SSL encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Field Component ---
interface FieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  className = "",
}: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-white border text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors placeholder:text-gnade-dark/20 ${
          error ? "border-red-400" : "border-gnade-pale"
        }`}
      />
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}
