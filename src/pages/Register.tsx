import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.password) e.password = "Required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Required";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords don't match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setLoading(true);
    try {
      await register(form.firstName, form.lastName, form.email, form.password);
      showToast(`Welcome, ${form.firstName}!`);
      navigate("/", { replace: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gnade-cream flex items-center justify-center px-5 py-16"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <span
              className="text-2xl tracking-[4px] text-gnade-dark"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              GNADE
            </span>
          </Link>
          <h1
            className="text-3xl text-gnade-black mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Create your account
          </h1>
          <p className="text-[13px] text-gnade-dark/50">
            Join GNADE and start your skincare journey
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 flex flex-col gap-5">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <AuthField
              label="First Name"
              name="firstName"
              value={form.firstName}
              error={errors.firstName}
              onChange={handleChange}
            />
            <AuthField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              error={errors.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <AuthField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className={`w-full bg-gnade-cream border text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors placeholder:text-gnade-dark/20 pr-10 ${
                  errors.password ? "border-red-400" : "border-gnade-pale"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gnade-dark/30 hover:text-gnade-dark transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={14} strokeWidth={1.5} />
                ) : (
                  <Eye size={14} strokeWidth={1.5} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <AuthField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
          />

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gnade-dark text-white text-[10px] tracking-[2px] uppercase py-4 hover:bg-gnade-mid transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* Login link */}
          <p className="text-center text-[12px] text-gnade-dark/50">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gnade-dark underline underline-offset-2 hover:text-gnade-mid transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Reusable field ---
interface AuthFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

function AuthField({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
}: AuthFieldProps) {
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
        className={`bg-gnade-cream border text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors placeholder:text-gnade-dark/20 ${
          error ? "border-red-400" : "border-gnade-pale"
        }`}
      />
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}
