import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Already logged in — redirect
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const validate = () => {
    const e: typeof errors = {};
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.password) e.password = "Required";
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
      await login(form.email, form.password);
      showToast("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
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
            Welcome back
          </h1>
          <p className="text-[13px] text-gnade-dark/50">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm((p) => ({ ...p, email: e.target.value }));
                setErrors((p) => ({ ...p, email: undefined }));
              }}
              placeholder="you@example.com"
              className={`bg-gnade-cream border text-[13px] text-gnade-black px-4 py-3 outline-none focus:border-gnade-dark transition-colors placeholder:text-gnade-dark/20 ${
                errors.email ? "border-red-400" : "border-gnade-pale"
              }`}
            />
            {errors.email && (
              <p className="text-[10px] text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] tracking-[1.5px] uppercase text-gnade-dark/60">
                Password
              </label>
              <button
                type="button"
                className="text-[10px] text-gnade-dark/40 hover:text-gnade-dark transition-colors underline underline-offset-2"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => {
                  setForm((p) => ({ ...p, password: e.target.value }));
                  setErrors((p) => ({ ...p, password: undefined }));
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="••••••••"
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

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gnade-dark text-white text-[10px] tracking-[2px] uppercase py-4 hover:bg-gnade-mid transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gnade-pale" />
            <span className="text-[10px] text-gnade-dark/30 tracking-[1px]">
              OR
            </span>
            <div className="flex-1 h-px bg-gnade-pale" />
          </div>

          {/* Register link */}
          <p className="text-center text-[12px] text-gnade-dark/50">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gnade-dark underline underline-offset-2 hover:text-gnade-mid transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
